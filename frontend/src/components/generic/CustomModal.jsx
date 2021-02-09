import React, { useContext, useState } from "react";
import { withRouter } from "react-router";
import { Button, Modal } from "react-bootstrap";
import { SettingsContext } from "../../contexts/SettingsContext";

const CustomModal = (props) => {
    const { isAnimated } = useContext(SettingsContext);
    const [show, setShow] = useState(props.show ? props.show : false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleAction = () => {
        props.redirect && props.history.push(props.redirect);
        handleClose();
        props.handleAction();
    };

    return (
        <>
            {props.noAction ? (
                <></>
            ) : (
                <button
                    onClick={handleShow}
                    disabled={props.edit}
                    style={props.actionButtonStyle}
                    className={props.actionButtonClass}
                >
                    {props.children}
                </button>
            )}

            <Modal
                centered
                show={show}
                onHide={handleClose}
                animation={isAnimated}
                className="text-center"
            >
                <Modal.Header closeButton>
                    <Modal.Title>{props.modalTitle}</Modal.Title>
                </Modal.Header>

                <Modal.Body>{props.modalBody}</Modal.Body>

                <Modal.Footer className="d-flex justify-content-between">
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>

                    {props.noAction ? (
                        <></>
                    ) : (
                        <Button
                            variant={props.actionVariant}
                            onClick={handleAction}
                        >
                            {props.modalTitle}
                        </Button>
                    )}
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default withRouter(CustomModal);
