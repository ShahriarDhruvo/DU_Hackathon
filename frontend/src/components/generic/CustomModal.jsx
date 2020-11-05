import React, { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { SettingsContext } from "../../contexts/SettingsContext";

const CustomModal = (props) => {
    const [show, setShow] = useState(false);
    const { isAnimated } = useContext(SettingsContext);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleAction = () => {
        handleClose();
        props.handleAction();
    };

    return (
        <>
            <Button
                variant={props.variant}
                className={props.actionButtonClass}
                size={props.actionButtonSize}
                onClick={handleShow}
                disabled={props.edit}
                style={{ width: props.actionButtonWidth }}
            >
                {props.children}
            </Button>

            <Modal
                show={show}
                animation={isAnimated}
                onHide={handleClose}
                className="text-center"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>{props.modalTitle}</Modal.Title>
                </Modal.Header>

                <Modal.Body>{props.modalBody}</Modal.Body>

                <Modal.Footer>
                    <Button
                        variant={props.actionVariant}
                        onClick={handleAction}
                    >
                        {props.modalTitle}
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default CustomModal;
