import React from 'react';
import { Link } from 'react-router-dom'
import icon1 from '../../assets/images/icon/Wallet.png'
import icon2 from '../../assets/images/icon/Category.png'
import icon3 from '../../assets/images/icon/Image2.png'
import icon4 from '../../assets/images/icon/Bookmark.png'

const Create = () => {
    const data = [
        {
            title: "Connect Your Wallet",
            description: "TRON Wallet that is functional for NFT purchasing. You may have to create a new one to get started.",
            icon : icon1,
            colorbg : "icon-color1"
        },
        {
            title: "Set Up Your Posting",
            description: "Setting up your carbon offset posting is easy. Just fill out the form and you’re good to go!",
            icon : icon2,
            colorbg : "icon-color2"
        },
        {
            title: "Add Images",
            description: "Add some images that show off your carbon offset posting. You can add up to 10 images.",
            icon : icon3,
            colorbg : "icon-color3"
        },
        {
            title: "List Them For Sale",
            description: "Choose between auctions, fixed-price listings, and declining-price listings. You choose how you want to sell your offsets!",
            icon : icon4,
            colorbg : "icon-color4"
        },
    ]
    return (
        <section className="tf-box-icon create style1 tf-section">
            <div className="themesflat-container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="heading-live-auctions mg-bt-22">
                            <h2 className="tf-title pb-17">
                                List And Sell Your Carbon Offsets</h2>
                        </div>
                    </div>
                    {
                        data.map((item , index) => (
                            <CreateItem key={index} item={item} />
                        ))
                    }
                </div>                 
            </div>
        </section>
    );
}

const CreateItem = props => (
    <div className='col-lg-3 col-md-6 col-12'>
        <div className="sc-box-icon">
            <div className="image">
                <div className={`icon-create ${props.item.colorbg}`}>
                    <img src={props.item.icon} alt="" />
                </div>                                                                             
            </div>
            <h3 className="heading"><span>{props.item.title}</span></h3>
            <p className="content">{props.item.description}</p>
        </div>
    </div>
)

export default Create;
