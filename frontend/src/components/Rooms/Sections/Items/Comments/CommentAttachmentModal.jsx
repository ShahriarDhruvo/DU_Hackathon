import { Button, Modal } from "react-bootstrap";
import React, { useContext, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SettingsContext } from "../../../../../contexts/SettingsContext";
import CustomAlert from "../../../../generic/CustomAlert";

const CommentAttachmentModal = (props) => {
    const form = useRef(null);
    const [show, setShow] = useState(false);
    const [status, setStatus] = useState(undefined);
    const { isAnimated } = useContext(SettingsContext);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (e) => {
        e.preventDefault();

        const API_URL = `/api/v1/rooms/sections/items/comments/${props.room_pk}/update/${props.comment.id}/`;

        const loadData = async () => {
            const formData = new FormData(form.current);

            const response = await fetch(API_URL, {
                method: "PATCH",
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) setStatus(data.detail);
        };

        loadData();
        props.updateFlag();
        handleClose();
    };

    return (
        <>
            <button onClick={handleShow} className={props.actionButtonClass}>
                {props.children}
            </button>

            <Modal
                centered
                show={show}
                onHide={handleClose}
                animation={isAnimated}
            >
                <Modal.Header closeButton>Add an attachment</Modal.Header>
                <Modal.Body>
                    <form ref={form} onSubmit={handleSubmit}>
                        {status && (
                            <CustomAlert variant="warning" status={status} />
                        )}

                        <div className="form-group">
                            <div className="row">
                                {props.comment.attachment ? (
                                    <label
                                        htmlFor="attachment"
                                        className="col-6 my-auto"
                                    >
                                        Change{" "}
                                        <span className="text-muted">
                                            (Optional):
                                        </span>
                                    </label>
                                ) : (
                                    <label
                                        htmlFor="attachment"
                                        className="col-6 my-auto"
                                    >
                                        Attachment{" "}
                                        <span className="text-muted">
                                            (Optional):
                                        </span>
                                    </label>
                                )}

                                <input
                                    type="file"
                                    id="attachment"
                                    name="attachment"
                                    className="col-6 form-control-file"
                                />
                            </div>
                        </div>

                        <div className="d-flex justify-content-between">
                            <Button
                                size="sm"
                                className="w-25"
                                onClick={handleClose}
                                variant="outline-danger"
                            >
                                <FontAwesomeIcon
                                    className="mr-2"
                                    icon={["fas", "times"]}
                                />
                                Cancel
                            </Button>

                            <Button size="sm" type="submit">
                                <FontAwesomeIcon
                                    className="mr-2"
                                    icon={["fas", "plus"]}
                                />
                                {props.comment.attachment ? "Update" : "Add"}{" "}
                                attachment
                            </Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default CommentAttachmentModal;
