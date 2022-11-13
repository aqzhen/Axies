import React, { useState } from 'react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import { Link } from 'react-router-dom'
import Countdown from "react-countdown";
import { Tab, Tabs, TabList, TabPanel  } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import liveAuctionData from '../assets/fake-data/data-live-auction';
import LiveAuction from '../components/layouts/LiveAuction';
import img1 from '../assets/images/avatar/avt-3.jpg'
import img2 from '../assets/images/avatar/avt-11.jpg'
import img3 from '../assets/images/avatar/avt-1.jpg'
import img4 from '../assets/images/avatar/avt-5.jpg'
import img5 from '../assets/images/avatar/avt-7.jpg'
import img6 from '../assets/images/avatar/avt-8.jpg'
import img7 from '../assets/images/avatar/avt-2.jpg'
import imgdetail1 from '../assets/images/box-item/4-1.png'
import CardModal from "../components/layouts/CardModal";

const ItemDetails02 = () => {

    const [modalShow, setModalShow] = useState(false);

    const [dataHistory] = useState(
        [
            {
                img: img1,
                name:"Mason Woodward",
                time: "8 hours ago",
                price: "100000 TRX",
                priceChange: "$12.246"
            },
            {
                img: img2,
                name:"Alex Jones",
                time: "at 11/10/2022, 3:20 AM",
                price: "94032 TRX",
                priceChange: "$12.246"
            },
            {
                img: img3,
                name:"Rehan Ackrim",
                time: "at 11/09/2022, 7:53 PM",
                price: "60231 TRX",
                priceChange: "$12.246"
            },
            {
                img: img4,
                name:"Mason Woodward",
                time: "8 hours ago",
                price: "4.89 ETH",
                priceChange: "$12.246"
            },
            {
                img: img5,
                name:"Mason Woodward",
                time: "8 hours ago",
                price: "4.89 ETH",
                priceChange: "$12.246"
            },
            {
                img: img6,
                name:"Mason Woodward",
                time: "8 hours ago",
                price: "4.89 ETH",
                priceChange: "$12.246"
            },
        ]
    )
    return (
        <div className='item-details'>
            <Header />
            <section className="flat-title-page inner">
                <div className="overlay"></div>
                <div className="themesflat-container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="page-title-heading mg-bt-12">
                                <h1 className="heading text-center">Klawock Heenya Improved Forest Management Project</h1>
                            </div>
                            <div className="breadcrumbs style2">
                                <ul>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="#">Explore</Link></li>
                                    <li>Klawock Heenya Forest Management Project</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>                    
            </section>
            <div className="tf-section tf-item-details style-2">
                <div className="themesflat-container">
                    <div className="row">
                        <div className="col-xl-6 col-md-12">
                            <div className="content-left">
                                <div className="media">
                                    <img src={imgdetail1} alt="Axies" />
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-md-12">
                            <div className="content-right">
                                <div className="sc-item-details">
                                    <div className="meta-item">
                                        <div className="left">
                                            <h2>Klawock Heenya Improved Forest Management Project</h2>
                                        </div>
                                        <div className="right">
                                            <span className="viewed eye mg-r-8">225</span>
                                            <span to="/login" className="liked heart wishlist-button"><span className="number-like">100</span></span>
                                        </div>
                                    </div>
                                    <div className="client-infor sc-card-product">
                                        <div className="meta-info">
                                            <div className="author">
                                                <div className="info">
                                                    <span>Owned By</span>
                                                    <h6> <Link to="/author-02">Farm Offsets Corp.</Link> </h6>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="meta-info">
                                            <div className="author">
                                                <div className="info">
                                                    <span>Created By</span>
                                                    <h6> <Link to="/author-02">Farm Offsets Corp.</Link> </h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <p>The Klawock Heenya Project protects 8,600 acres of forest on Prince of Wales Island in Alaska—1,000 acres of which is old-growth forest, home to centuries-old trees and an abundance of biodiversity. The forests of Klawock Heenya have been utilized for centuries for subsistence uses such as firewood, housing materials, and canoe logs. From 1980 to 2015, nearly all the commercially operable timber on Klawock Heenya lands was harvested, narrowly preserving the areas of old growth that remain. Since then, natural regeneration has resulted in thriving second growth forests, with trees reaching up to twelve feet in diameter. The registration and management of this forest carbon project helps ensure the long-term sustainable governance, protecting and preserving the health and age of the forest.
                                    </p>
                                    <div className="meta-item-details">
                                        <div className="item-style-2 item-details">
                                            <ul className="list-details">
                                                <li><span>Artist : </span><h6>Farm Offsets Corp.</h6> </li>
                                                <li><span>Carbon Reduction : </span><h6>33,000 Tons</h6> </li>
                                                <li><span>Expires : </span><h6>04 April , 2032</h6> </li>
                                                <li><span>Grade : </span><h6>A+</h6> </li>
                                            </ul>
                                        </div>
                                        <div className="item-style-2">
                                            <div className="item meta-price">
                                                <span className="heading">Current Bid</span>
                                                <div className="price">
                                                    <div className="price-box">
                                                        <h5> 100000 TRX </h5>
                                                        <span>= $5149.44</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="item count-down">
                                            <Countdown date={Date.now() + 500000000}>
                                                <span>You are good to go!</span>
                                            </Countdown>
                                            </div>
                                        </div>
                                    </div>
                                    <button onClick={() => {
                                        setModalShow(true)
                                    }} className="sc-button loadmore style bag fl-button pri-3"><span>Place a bid</span></button>
                                    <div className="flat-tabs themesflat-tabs">
                                    <Tabs>
                                        <TabList>
                                        <Tab>Bid History</Tab>
                                        <Tab>Info</Tab>
                                        </TabList>

                                        <TabPanel>
                                            <ul className="bid-history-list">
                                                {
                                                    dataHistory.map((item, index) => (
                                                        <li key={index} item={item}>
                                                            <div className="content">
                                                                <div className="client">
                                                                    <div className="sc-author-box style-2">
                                                                        <div className="author-infor">
                                                                            <div className="name">
                                                                                <h6><Link to="/author-02">{item.name} </Link></h6> <span> place a bid</span>
                                                                            </div>
                                                                            <span className="time">{item.time}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="price">
                                                                    <h5>{item.price}</h5>
                                                                    <span>= {item.priceChange}</span>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        </TabPanel>
                                        <TabPanel>
                                            <ul className="bid-history-list">
                                                    <li>
                                                        <div className="content">
                                                            <div className="client">
                                                                <div className="sc-author-box style-2">
                                                                    <div className="author-infor">
                                                                        <div className="name">
                                                                            <h6> <Link to="/author-02">Mason Woodward </Link></h6> <span> place a bid</span>
                                                                        </div>
                                                                        <span className="time">8 hours ago</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                            </ul>
                                        </TabPanel>
                                        <TabPanel>
                                            <div className="provenance">
                                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                                                    when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                                                    It has survived not only five centuries, but also the leap into electronic typesetting, 
                                                    remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
                                                    and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                                            </div>
                                        </TabPanel>
                                    </Tabs>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <CardModal show={modalShow} onHide={() => setModalShow(false)}></CardModal>
            <LiveAuction data={liveAuctionData} />
        </div>
    );
}

export default ItemDetails02;
