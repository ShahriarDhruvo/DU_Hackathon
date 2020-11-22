import React, { useContext, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { SettingsContext } from "../../../contexts/SettingsContext";
import CustomAlert from "../../generic/CustomAlert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UpdateSectionModal = (props) => {
    const form = useRef(null);
    const [show, setShow] = useState(false);
    const [status, setStatus] = useState(undefined);
    const { isAnimated } = useContext(SettingsContext);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleUpdateSection = (e) => {
        e.preventDefault();

        const API_URL = `/api/v1/rooms/sections/${props.room_pk}/update/${props.section_pk}/`;

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
        props.updateFlag();
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
                <Modal.Header closeButton>Update this Section</Modal.Header>
                <Modal.Body>
                    <form
                        ref={form}
                        onSubmit={handleUpdateSection}
                        className="text-center"
                    >
                        {status && (
                            <CustomAlert variant="warning" status={status} />
                        )}

                        <div className="form-group">
                            <label>Section title</label>

                            <input
                                required
                                autoFocus
                                type="text"
                                name="title"
                                placeholder="Title"
                                className="form-control"
                                defaultValue={props.title}
                            />
                        </div>

                        <button type="submit" className="btn btn-primary">
                            <FontAwesomeIcon
                                className="mr-2"
                                icon={["fas", "wrench"]}
                            />
                            Update
                        </button>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default UpdateSectionModal;
