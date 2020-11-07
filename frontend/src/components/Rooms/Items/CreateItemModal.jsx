import React, { useContext, useState } from "react";
import { Modal } from "react-bootstrap";
import { SettingsContext } from "../../../contexts/SettingsContext";

const CreateItemModal = (props) => {
    const [show, setShow] = useState(false);
    const { isAnimated } = useContext(SettingsContext);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <button
                onClick={handleShow}
                // disabled={props.edit}
                size={props.actionButtonSize}
                className={props.actionButtonClass}
                // style={{ width: props.actionButtonWidth }}
            >
                {props.children}
            </button>

            <Modal
                centered
                show={show}
                onHide={handleClose}
                animation={isAnimated}
            >
                <Modal.Header closeButton>Create an Item</Modal.Header>
                <Modal.Body>form of item developing</Modal.Body>
            </Modal>
        </>
    );
};

export default CreateItemModal;
