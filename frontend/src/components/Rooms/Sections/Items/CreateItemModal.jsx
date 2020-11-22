import { Modal } from "react-bootstrap";
import React, { useContext, useState, useRef } from "react";
import CustomAlert from "../../../generic/CustomAlert";
import { SettingsContext } from "../../../../contexts/SettingsContext";

const CreateItemModal = (props) => {
    const form = useRef(null);
    const [show, setShow] = useState(false);
    const [status, setStatus] = useState(undefined);
    const { isAnimated } = useContext(SettingsContext);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleAddItem = (e) => {
        e.preventDefault();

        const API_URL = `/api/v1/rooms/sections/items/${props.room_pk}/${props.section_pk}/create/`;

        const loadData = async () => {
            const formData = new FormData(form.current);

            const response = await fetch(API_URL, {
                method: "POST",
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
            <button onClick={handleShow} className={props.actionButtonClass}>
                {props.children}
            </button>

            <Modal
                centered
                show={show}
                onHide={handleClose}
                animation={isAnimated}
            >
                <Modal.Header closeButton>Create an Item</Modal.Header>
                <Modal.Body>
                    <form ref={form} onSubmit={handleAddItem}>
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
                                    defaultValue={new Date().toLocaleDateString(
                                        "en-CA"
                                    )}
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
                                    defaultValue={new Date().toLocaleTimeString(
                                        "en-GB",
                                        {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        }
                                    )}
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
                            />
                        </div>

                        <div className="text-center">
                            <button type="submit" className="btn btn-primary">
                                Create
                            </button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default CreateItemModal;
