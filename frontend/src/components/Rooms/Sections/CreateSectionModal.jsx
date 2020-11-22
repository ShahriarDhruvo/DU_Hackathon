import React, { useContext, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import Tab from "@material-ui/core/Tab";
import { withStyles } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SettingsContext } from "../../../contexts/SettingsContext";
import CustomAlert from "../../generic/CustomAlert";

const AntTab = withStyles(() => ({
    root: {
        minWidth: 50,
    },
}))((props) => <Tab disableRipple {...props} />);

const CreateSectionModal = (props) => {
    const form = useRef(null);
    const [show, setShow] = useState(false);
    const [status, setStatus] = useState(undefined);
    const { isAnimated } = useContext(SettingsContext);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCreateSection = (e) => {
        e.preventDefault();

        const API_URL = `/api/v1/rooms/sections/${props.room_pk}/create/`;

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
        props.updateFlag();
    };

    return (
        <>
            <AntTab
                label={
                    <FontAwesomeIcon
                        className="fa-icon"
                        icon={["fas", "plus"]}
                    />
                }
                onClick={handleShow}
            />

            <Modal
                centered
                show={show}
                onHide={handleClose}
                animation={isAnimated}
            >
                <Modal.Header closeButton>Create a Section</Modal.Header>
                <Modal.Body>
                    <form
                        ref={form}
                        onSubmit={handleCreateSection}
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
                            />
                        </div>

                        <button type="submit" className="btn btn-primary">
                            Create
                        </button>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default CreateSectionModal;
