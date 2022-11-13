import React , { useState } from 'react';
import { Link } from 'react-router-dom'
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import { Accordion } from 'react-bootstrap-accordion'

const FAQ = () => {
    const [data] = useState(
        [
            {   key: "0",
                show: "show",
                title: 'What is a carbon credit?',
                text: 'A carbon credit is a transferable certificate that represents reduction or removal of one metric tonne of carbon dioxide or equivalent.'
            },
            {
                key: "1",
                title: 'What is a GBM Auction?',
                text: 'A GBM auction is a time-limited and incentivized open ascending auction. Bids must be fully funded i.e. bidders commit the full amount when placing their bid. Each new bid needs to be higher than the previous bid by a minimum step, calculated as a percentage of the previous bid. When someone is outbid, they are instantly refunded their bid, as well as an incentive. This incentive is calculated as a percentage of their bid amount, and this percentage depends on the ratio between the previous bid and their bid. The auction runs for a set time, and bids placed just before the end of the auction extend the duration of the auction (which is the technological equivalent of saying “Going once, going twice, sold!” when a new bid is placed at the end of an auction).\n' +
                    'The highest bidder at the end of a GBM auction wins the carbon credit and their winning bid is the final price paid for the credit, just like in a traditional English auction. The revenue of the GBM auction (i.e. the money collected by the project provider and our platform [the auction house]) is equal to the winning bid, minus the sum of the incentives that were distributed to bidders during the auction.\n'
            },
            {
                key: "2",
                title: 'Why does a GBM auction make sense for a Carbon Credits marketplace?',
                text: "Axies’ GBM auction removes another barrier for companies looking to enter the carbon offset market by neutralizing the costs a business may incur while looking for carbon offsets (through our auction’s incentives). Businesses now have no reasons not to participate in the carbon offset market."
            },
            {
                key: "3",
                title: 'What projects does Axies support?',
                text: "Axies sources projects which share our core values. Axies supports a variety of sustainable projects from around the world ranging from:\n" +
                    "Forestry and land use\n" +
                    "Renewable energy\n" +
                    "Waste management\n" +
                    "Chemical processes\n" +
                    "Industrial manufacturing\n"
            },
        ]
    )
    return (
        <div>
            <Header />
            <section className="flat-title-page inner">
                <div className="overlay"></div>
                <div className="themesflat-container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="page-title-heading mg-bt-12">
                                <h1 className="heading text-center">FAQ</h1>
                            </div>
                            <div className="breadcrumbs style2">
                                <ul>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="#">Pages</Link></li>
                                    <li>FAQ</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>                    
            </section>
            <section className="tf-section wrap-accordion">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h2 className="tf-title-heading ct style-2 fs-30 mg-bt-10">
                                Frequently Asked Questions
                            </h2>
                        </div>
                        <div className="col-md-12">
                            <div className="flat-accordion2">
                                {
                                    data.map((item,index) => (
                                        <Accordion key={index} title={item.title} >
                                            <p>{item.text}</p>
                                        </Accordion>
                                    ))
                                }                             
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}

export default FAQ;
