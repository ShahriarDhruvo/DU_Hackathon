import React, { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { SettingsContext } from "../../contexts/SettingsContext";
import RoomMembers from "./RoomMembers";

const RoomMembersModal = (props) => {
    const [show, setShow] = useState(false);
    const { isAnimated } = useContext(SettingsContext);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body className="p-0">
                    <RoomMembers />
                </Modal.Body>
            </Modal>
        </>
    );
};

export default RoomMembersModal;
