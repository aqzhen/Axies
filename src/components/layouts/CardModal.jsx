import React from 'react';
import { Link } from 'react-router-dom'
import { Modal } from "react-bootstrap";

const CardModal = (props) => {
    
return (

    <Modal
    show={props.show}
    onHide={props.onHide}
  >
    <Modal.Header closeButton></Modal.Header>

    <div className="modal-body space-y-20 pd-40">
        <h3>Place a Bid</h3>
        <p className="text-center">You must bid at least <span className="price color-popup">130500 TRX</span>
        </p>
        <input type="text" className="form-control"
            placeholder="00.00 TRX" />
        <p>Enter quantity of carbon. <span className="color-popup">5 tons available</span>
        </p>
        <input type="number" className="form-control" placeholder="1" />
        <div className="hr"></div>
        <div className="d-flex justify-content-between">
            <p> You must bid at least:</p>
            <p className="text-right price color-popup"> 130500 TRX </p>
        </div>
        <div className="d-flex justify-content-between">
            <p> Service fee:</p>
            <p className="text-right price color-popup"> 1000 TRX </p>
        </div>
        <div className="d-flex justify-content-between">
            <p> Total bid amount:</p>
            <p className="text-right price color-popup"> 131500 TRX </p>
        </div>
        <Link to="/item-details-02" className="btn btn-primary" data-toggle="modal" data-target="#popup_bid_success" data-dismiss="modal" aria-label="Close"> Place a bid</Link>
    </div>
    </Modal>
    
  );
};

export default CardModal;
