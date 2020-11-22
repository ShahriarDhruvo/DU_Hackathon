import React, { useContext, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { SettingsContext } from "../../../../contexts/SettingsContext";
import CustomAlert from "../../../generic/CustomAlert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UpdateItemModal = (props) => {
    const form = useRef(null);
    const [show, setShow] = useState(false);
    const [status, setStatus] = useState(undefined);
    const { isAnimated } = useContext(SettingsContext);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleUpdateItem = (e) => {
        e.preventDefault();

        const API_URL = `/api/v1/rooms/sections/items/${props.room_pk}/update/${props.item_pk}/`;

        const loadData = async () => {
            const formData = new FormData(form.current);

            const response = await fetch(API_URL, {
                method: "PATCH",
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                const firstErrorKey = Object.keys(data)[0];
                const firstError =
                    firstErrorKey.toUpperCase() + ": " + data[firstErrorKey];
                setStatus(firstError);
            } else handleClose();
        };

        loadData();
        props.updateItemFlag();
    };

    return (
        <>
            <button
                onClick={handleShow}
                style={{ color: "#ef6c00" }}
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
            >
                <Modal.Header closeButton>Update this Item</Modal.Header>
                <Modal.Body>
                    <form ref={form} onSubmit={handleUpdateItem}>
                        {status && (
                            <CustomAlert variant="warning" status={status} />
                        )}

                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label>Date</label>

                                <input
                                    required
                                    type="date"
                                    name="date"
                                    className="form-control"
                                    placeholder="12/21/2020"
                                    defaultValue={props.date}
                                />
                            </div>

                            <div className="form-group col-md-6">
                                <label>Time</label>

                                <input
                                    required
                                    type="time"
                                    name="time"
                                    placeholder="23:58"
                                    className="form-control"
                                    defaultValue={props.time}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Content</label>

                            <textarea
                                required
                                autoFocus
                                type="text"
                                name="content"
                                placeholder="Content"
                                className="form-control"
                                defaultValue={props.content}
                            />
                        </div>

                        <div className="text-center">
                            <button type="submit" className="btn btn-primary">
                                <FontAwesomeIcon
                                    className="mr-2"
                                    icon={["fas", "wrench"]}
                                />
                                Update
                            </button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default UpdateItemModal;
