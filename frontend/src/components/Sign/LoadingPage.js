import React, {Component} from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Spinner from 'react-bootstrap/Spinner';
import './Sign.scss';
import './Temp';

function LoadingPage(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {/* <Modal.Body className="loading">
        <Spinner animation="border" role="status" className="loading__spinner">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </Modal.Body> */}
      <Modal.Body className="loading">
        <p>Confirmation Email Sent!</p>
      </Modal.Body>
    </Modal>
  );
}
export default LoadingPage;