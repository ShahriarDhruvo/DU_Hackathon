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
                onClick={handleShow}
                disabled={props.edit}
                variant={props.variant}
                size={props.actionButtonSize}
                className={props.actionButtonClass}
                style={{ width: props.actionButtonWidth }}
            >
                {props.children}
            </Button>

            <Modal
                centered
                show={show}
                onHide={handleClose}
                animation={isAnimated}
            >
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body className="p-0">
                    <RoomMembers room_pk={props.room_pk} />
                </Modal.Body>
            </Modal>
        </>
    );
};

export default RoomMembersModal;
