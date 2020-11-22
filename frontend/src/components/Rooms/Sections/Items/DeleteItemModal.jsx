import React, { useState, useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import { SettingsContext } from "../../../../contexts/SettingsContext";
import CustomAlert from "../../../generic/CustomAlert";

const DeleteItemModal = (props) => {
    const [show, setShow] = useState(false);
    const [status, setStatus] = useState(undefined);
    const { isAnimated } = useContext(SettingsContext);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleAction = (e) => {
        e.preventDefault();

        const API_URL = `/api/v1/rooms/sections/items/${props.room_pk}/delete/${props.item_pk}/`;

        const loadData = async () => {
            const response = await fetch(API_URL, {
                method: "DELETE",
            });

            if (!response.ok) {
                const data = await response.json();
                setStatus(data.detail);
            } else handleClose();
        };

        loadData();
        props.updateItemFlag();
    };

    return (
        <>
            <button
                onClick={handleShow}
                style={{ color: "#f44336" }}
                size={props.actionButtonSize}
                className={props.actionButtonClass}
            >
                {props.children}
            </button>

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

                <Modal.Body>
                    {status && <CustomAlert variant="danger" status={status} />}

                    {props.modalBody}
                </Modal.Body>

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

export default DeleteItemModal;
