// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import '@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol';
import '@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol';

import '@openzeppelin/contracts-upgradeable/token/ERC721/IERC721Upgradeable.sol';
import '@openzeppelin/contracts-upgradeable/token/ERC721/utils/ERC721HolderUpgradeable.sol';

import '@openzeppelin/contracts-upgradeable/token/ERC1155/IERC1155Upgradeable.sol';
import '@openzeppelin/contracts-upgradeable/token/ERC1155/utils/ERC1155HolderUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol';

/**
 * @dev Basic auction structures used through auction contracts.
 *
 */
library AuctionLib {
    enum TokenType {
        erc721,
        erc1155
    }

    struct Asset {
        TokenType token;
        address contractAddr;
        uint256 tokenId;
    }
}

/**
 * @dev This contract is a standard English Auction smart contract that allows
 * bidders to keep bidding until the highest bidder wins the asset. In an
 * English Auction, the owner defines the starting price and bidders can make
 * bids that are higher than the current price.* The auction duration is defined
 * by the bids being made and if they are made within the resetTime.
 * Theoretically, the auction can go on forever if higher bids continue to be
 * made within the resetTime period.* Once the ending time is passed, the
 * auction finishes and the NFT is transferred to the highest bidder.
 */
contract Auction is ERC721HolderUpgradeable, ERC1155HolderUpgradeable, AccessControlUpgradeable {
    // Specification + ERC165
    bytes4 private constant ERC165TAG = bytes4(keccak256(abi.encodePacked('Auction/', '1.0')));

    /**********************
             Types
    **********************/
    event Start(uint256 startTime);
    event Bid(address indexed sender, uint256 amount);
    event Withdraw(address indexed bidder, uint256 amount);

    AuctionLib.Asset public asset;
    address public acceptableToken;

    address payable public seller;
    bool public ownerClaimed;
    bool public winnerClaimed;

    uint256 public endAt;
    uint256 public auctionDuration;
    uint256 public startPrice;
    uint256 public resetTime; //number of seconds the auction is reset to after a bid within this time
    uint256 public returnRate; // integer percentage representing the percentage a user receives if outbid (either x% of bid value or x% of difference of bids, if it is smaller)
    uint256 public lostRevenue; // the amount less than the final bid which the seller receives
    address payable public prevBidder; 

    address public highestBidder;
    mapping(address => uint256) public bids;
    mapping(address => uint256) public currBids;

    /**********************
        Initialization
    **********************/

    constructor(address payable _seller,
        AuctionLib.Asset memory _asset,
        address _ERC20contractAddress,
        uint256 _startPrice,
        uint256 _auctionDuration,
        uint256 _resetTime,
        uint256 _returnRate
    )  {
        asset = _asset;

        acceptableToken = _ERC20contractAddress;

        seller = _seller;
        auctionDuration = _auctionDuration;
        startPrice = _startPrice;
        resetTime = _resetTime;
        returnRate = _returnRate;

        // Transferring ERC721
        if (asset.token == AuctionLib.TokenType.erc721)
            IERC721Upgradeable(asset.contractAddr).transferFrom(seller, address(this), asset.tokenId);
        else {
            // Solidity enforces TokenType will be 721 or 1155
            IERC1155Upgradeable(asset.contractAddr).safeTransferFrom(
                seller,
                address(this),
                asset.tokenId,
                1,
                new bytes(0)
            );
        }

        endAt = block.timestamp + _auctionDuration * 1 seconds;
    }

    /**********************
         Interaction
    **********************/
    /**
     * @dev Allow a user to place a bid that must be higher than the highest bid
     * @param amount to bid by the bidder
     */
    function bid(uint256 amount) external {
        require(block.timestamp < endAt, 'Auction: ended');
        require(amount > bids[highestBidder], 'Auction: value <= highest');
        require(msg.sender != prevBidder, 'Auction: you cannot outbid yourself!'); 

        highestBidder = msg.sender;
        uint256 currBid = bids[msg.sender];
        uint256 additionalBid = amount - currBid;
        bids[msg.sender] += additionalBid;
        currBids[msg.sender] = additionalBid; // the most recent "additional bid"

        if (prevBidder != address(0)) {
            uint256 outbidGain;
            if (amount - currBids[prevBidder] > currBids[prevBidder]) { // case where difference is larger than x% of prev bid
                outbidGain = returnRate * currBids[prevBidder] / 100;
                bids[prevBidder] += outbidGain;
                lostRevenue += outbidGain;
            } else {
                outbidGain = returnRate * (amount - currBids[prevBidder]) / 100; 
                bids[prevBidder] += outbidGain;
                lostRevenue += outbidGain;
            }
            
        } 

        prevBidder = payable(msg.sender);

        SafeERC20Upgradeable.safeTransferFrom(
            IERC20Upgradeable(acceptableToken),
            msg.sender,
            address(this),
            additionalBid
        );


        // if bid is made with < reset time remaining on the auction , then add to endAt
        if (endAt - block.timestamp < resetTime) endAt = (block.timestamp + resetTime) * 1 seconds;

        emit Bid(msg.sender, amount);
    }

    /**
     * @notice Highest bidder cannot withdraw
     * @dev Allows a user to withdraw their bid.
     */
    function withdraw() external {
        // Added from parameter as above
        require(msg.sender != highestBidder, 'Auction: the highest bidder cannot withdraw!');

        uint256 bal = bids[msg.sender];
        bids[msg.sender] = 0;

        IERC20Upgradeable(acceptableToken).transfer(msg.sender, bal);

        emit Withdraw(msg.sender, bal);
    }

    /**
     * @dev Allows owner to claim bid.
     * The seller must call to transfer the ERC20 to themselves
     */
    function ownerClaim() external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(block.timestamp >= endAt, 'Auction: not ended');
        require(!ownerClaimed, 'Auction: owner has already claimed');

        ownerClaimed = true;
        if (highestBidder != address(0)) {
            // Transfer remainder to seller
            IERC20Upgradeable(acceptableToken).transfer(
                seller,
                bids[highestBidder] - lostRevenue
            );
        } else {
            if (asset.token == AuctionLib.TokenType.erc721)
                IERC721Upgradeable(asset.contractAddr).safeTransferFrom(address(this), seller, asset.tokenId);
            else {
                // Asset token type is 1155 as initialization did not revert
                IERC1155Upgradeable(asset.contractAddr).safeTransferFrom(
                    address(this),
                    seller,
                    asset.tokenId,
                    1,
                    new bytes(0)
                );
            }
        }
    }

    /**
     * @dev Allows auction winner to claim the asset they won and transfers ownership
     */
    function winnerClaim() external {
        require(block.timestamp >= endAt, 'Auction: not ended');
        require(!winnerClaimed, 'Auction: winner has already claimed');
        require(msg.sender == highestBidder, 'Auction: you are not the winner, you cannot claim!'); //highestBidder at end is the winning address

        winnerClaimed = true;
        if (asset.token == AuctionLib.TokenType.erc721)
            IERC721Upgradeable(asset.contractAddr).safeTransferFrom(address(this), highestBidder, asset.tokenId);
        else {
            // Asset token type is 1155 as initialization did not revert
            IERC1155Upgradeable(asset.contractAddr).safeTransferFrom(
                address(this),
                highestBidder,
                asset.tokenId,
                1,
                new bytes(0)
            );
        }
    }

    /**********************
            Getters
    **********************/

    /**
     * @dev Returns the current highest bid
     */
    function getCurrentBid() external view returns (uint256) {
        //show the current price
        return bids[highestBidder];
    }

    /**
     * @dev Returns the remaining time in the auction
     */
    function getRemainingTime() external view returns (uint256) {
        if (block.timestamp >= endAt) return 0;
        return endAt - block.timestamp; //in seconds
    }
    
    /**
     * @dev ERC165 Support
     * @param interfaceId hash of the interface testing for
     * @return bool whether interface is supported
     */
    function supportsInterface(bytes4 interfaceId)
        public view virtual override(ERC1155ReceiverUpgradeable, AccessControlUpgradeable) returns (bool)
    {
        return interfaceId == ERC165TAG || super.supportsInterface(interfaceId);
    }
}