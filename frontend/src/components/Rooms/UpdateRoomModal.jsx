import React, { useContext, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { SettingsContext } from "../../contexts/SettingsContext";
import CustomAlert from "../generic/CustomAlert";

const UpdateRoomModal = (props) => {
    const form = useRef(null);
    const [show, setShow] = useState(false);
    const [status, setStatus] = useState(undefined);
    const { isAnimated } = useContext(SettingsContext);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCreateSection = (e) => {
        e.preventDefault();

        const API_URL = `/api/v1/rooms/update/${props.room_pk}/`;

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
                <Modal.Header closeButton>Update this Room</Modal.Header>
                <Modal.Body>
                    <form
                        ref={form}
                        className="text-center"
                        onSubmit={handleCreateSection}
                    >
                        {status && (
                            <CustomAlert variant="warning" status={status} />
                        )}

                        <div className="form-group">
                            <label>Year</label>

                            <input
                                required
                                autoFocus
                                name="year"
                                type="number"
                                placeholder="Year"
                                className="form-control"
                                defaultValue={props.year}
                            />

                            <label className="mt-3">Group</label>

                            <input
                                type="text"
                                name="group"
                                placeholder="Group"
                                className="form-control"
                                defaultValue={props.group}
                            />
                        </div>

                        <button type="submit" className="btn btn-primary">
                            Update
                        </button>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default UpdateRoomModal;
