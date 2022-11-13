# B2E Auction Contract: Auction.sol

We introduce a novel "bid-to-earn" contract with incentives for bidders who are outbid during the auction. This pricing mechanism further drives price-discovery and incentivizes investors to allocate more capital towards purchasing carbon credits.

## How it Works

Implementation for an Auction smart contract with a novel bid-to-earn mechanism that incentivizes bidders to keep bidding until the highest bidder wins the asset. Built on top of a standard English Auction with the differences being that bidders are rewarded with their initial capital, as well as an incentive, when they are outbid.

The contract is initialized with the seller address, the asset being listed (Auction handles the asset being listed as an AuctionLib.Asset struct), the ERC20 token acceptable for payment, the starting bid on the NFT, the duration of the auction, the reset time (the time at which the auction resets when a bid is made within this time frame), the sale fee (as an integer percentage <= 100), and the return rate (the proportion that a bidder receives when outbid). The return for being outbid, r, takes on the value `return rate * (current bid amount - previous bid amount` but is capped at `return rate * previous bid amount`.

Upon initialization of the contract, the asset will be transferred from the seller to the contract.

In order to start the auction, the `endAt` variable is initialized, which keeps track of the length of the auction.

Then, the bidders can call the `bid()` method to place a bid through an amount defined in the parameter. The function ensures that the newest bid must be higher than the highest bid. All bids made are mapped by the address that made the bid in a mapping called `bids` so that the highest bid is always kept track of. When the `bid()` function is called, the bid value of ERC20 tokens are transferred from the bidder to the contract address, while the amount owed to the previously highest-bidder is updated (incentive for being outbidded). The `endAt` variable is also modified if the bid is made within the `resetTime` defined in the initialization.

Once bids continue to be made the `withdraw()` function can also be called by any bidder except for the highest bidder. This will allow lower bidders to get their previous bid amounts, in addition to their incentive, back in ERC20 tokens.

When the auction ends, the owner is able to call the `ownerClaim()` function which will transfer the funds from the contract address to the seller. If no bids were made, `ownerClaim()` is where the owner can get back their asset from the contract address.

Finally, once the auction has ended, the highest bidder is able to call the `winnerClaim()` function which transfers the ownership of the asset from the contract address to the highest bidder. This function will ensure that only the highest bidder is able to claim the asset.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
