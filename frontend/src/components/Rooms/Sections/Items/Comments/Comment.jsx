import Moment from "moment";
import React, { useState, useRef } from "react";
import CustomAlert from "../../../../generic/CustomAlert";
import CustomModal from "../../../../generic/CustomModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Counter from "../../../../generic/Counter";

const Comment = (props) => {
    const form = useRef(null);
    const [edit, setEdit] = useState(false);
    const [status, setStatus] = useState(undefined);

    const handleEdit = () => setEdit(!edit);

    const handleSubmit = (e) => {
        e.preventDefault();

        const API_URL = `/api/v1/rooms/sections/items/comments/${props.room_pk}/update/${props.comment_pk}/`;

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
        handleEdit();
        props.updateFlag();
    };

    const handleDelete = () => {
        const API_URL = `/api/v1/rooms/sections/items/comments/${props.room_pk}/delete/${props.comment_pk}/`;

        const loadData = async () => {
            const response = await fetch(API_URL, {
                method: "DELETE",
            });

            if (!response.ok) {
                const data = await response.json();
                setStatus(data.detail);
            }
        };

        loadData();
        props.updateFlag();
    };

    return (
        <div>
            <div className="d-flex">
                <Counter
                    room_pk={props.room_pk}
                    count={props.comment.vote}
                    comment_pk={props.comment_pk}
                />

                <div>
                    <div className="text-left border-bottom">
                        <small>{props.comment.user}</small>

                        <br />

                        <small>
                            {Moment(props.comment.comment_datetime).format(
                                "LLLL"
                            )}
                        </small>

                        <div className="my-1">
                            <button
                                onClick={handleEdit}
                                className="btn-link btn__none"
                            >
                                <FontAwesomeIcon
                                    className="mr-2"
                                    icon={["fas", "edit"]}
                                />
                            </button>

                            <CustomModal
                                modalTitle="Delete"
                                actionVariant="danger"
                                handleAction={handleDelete}
                                actionButtonClass="btn__none"
                                actionButtonStyle={{ color: "#f44336" }}
                                modalBody={`Do you really want to delete this comment?`}
                            >
                                <FontAwesomeIcon
                                    className="mr-2"
                                    icon={["fa", "trash-alt"]}
                                />
                            </CustomModal>
                        </div>
                    </div>

                    {edit ? (
                        <form
                            ref={form}
                            className="mt-2"
                            onSubmit={handleSubmit}
                        >
                            {status && (
                                <CustomAlert
                                    status={status}
                                    variant="warning"
                                />
                            )}

                            <div className="form-group">
                                <textarea
                                    required
                                    autoFocus
                                    type="text"
                                    name="content"
                                    placeholder="Content"
                                    className="form-control"
                                    defaultValue={props.comment.content}
                                />
                            </div>

                            <div className="text-right">
                                <button
                                    type="submit"
                                    className="btn-link btn__none"
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="mt-2">{props.comment.content}</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Comment;
