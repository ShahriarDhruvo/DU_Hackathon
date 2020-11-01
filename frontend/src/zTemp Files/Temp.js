import React, {Component} from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import './LoadingPage';
import LoadingPage from './LoadingPage';
import './Sign.scss';

function Temp() {
    const [modalShow, setModalShow] = React.useState(false);
    return (
      <div>
        <Button variant="primary" onClick={() => setModalShow(true)}>
          Launch vertically centered modal
        </Button>

        <LoadingPage
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </div>
    );
}
export default Temp;