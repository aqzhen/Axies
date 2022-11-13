import React , { useState , Fragment } from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y , Autoplay } from 'swiper';
import Countdown from "react-countdown";
import CardModal from '../CardModal';

import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

const LiveAuction = props => {
    const data = props.data;

    const [modalShow, setModalShow] = useState(false);

    return (
        <Fragment>
            <section className="tf-section live-auctions bg-style">
                <div className="themesflat-container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="heading-live-auctions">
                                <h2 className="tf-title pb-24">
                                    Live Auctions</h2>
                                <Link to="/explore-03" className="exp style2">EXPLORE MORE</Link>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <Swiper
                                modules={[Navigation, Pagination, Scrollbar, A11y ,Autoplay]}
                                spaceBetween={30}
                                breakpoints={{
                                    0: {
                                        slidesPerView: 1,
                                    },
                                    767: {
                                    slidesPerView: 2,
                                    },
                                    991: {
                                    slidesPerView: 3,
                                    },
                                    1300: {
                                        slidesPerView: 4,
                                    },
                                }}
                                navigation
                                pagination={{ clickable: true }}
                                scrollbar={{ draggable: true }}
                            >
                                    {
                                        data.slice(0,7).map((item,index) => (
                                            <SwiperSlide key={index}>
                                                <div className="swiper-container show-shadow carousel auctions">
                                                    <div className="swiper-wrapper">
                                                        <div className="swiper-slide">
                                                            <div className="slider-item">
                                                            <div className="sc-card-product explode style2">
                                                                <div className="card-media">
                                                                    <Link to="/item-details-01"><img src={item.img} alt="axies" /></Link>
                                                                    <div className="featured-countdown">
                                                                        <span className="slogan"></span>
                                                                        <Countdown date={Date.now() + 500000000}>
                                                                                <span>You are good to go!</span>
                                                                            </Countdown>
                                                                    </div>
                                                                    <div className="button-place-bid">
                                                                        <button onClick={() => setModalShow(true)} className="sc-button style-place-bid style bag fl-button pri-3"><span>Place Bid</span></button>
                                                                    </div>
                                                                </div>
                                                                <div className="card-title">
                                                                    <h5><Link to="/item-details-01">"{item.title}"</Link></h5>
                                                                </div>
                                                                <div className="meta-info">
                                                                    <div className="author">
                                                                        <div className="avatar">
                                                                            <img src={item.imgAuthor} alt="axies" />
                                                                        </div>
                                                                        <div className="info">
                                                                            <span>Creator</span>
                                                                            <h6> <Link to="/authors-02">{item.nameAuthor}</Link> </h6>
                                                                        </div>
                                                                    </div>
                                                                    <div className="tags">{item.tags}</div>
                                                                </div>
                                                                <div className="card-bottom style-explode">
                                                                    <div className="price">
                                                                        <span>Current Bid</span>
                                                                        <div className="price-details">
                                                                            <h5>{item.price}</h5>
                                                                            <span>= {item.priceChange}</span>
                                                                        </div>
                                                                    </div>
                                                                    <Link to="/login" className="wishlist-button public heart"><span className="number-like">{item.wishlist}</span></Link>
                                                                </div>
                                                            </div>										    	
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        ))
                                    }
                            </Swiper>
                        </div>
                    </div>
                </div>
            </section>
            <CardModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </Fragment>
        
    );
}

LiveAuction.propTypes = {
    data: PropTypes.array.isRequired,
}


export default LiveAuction;
