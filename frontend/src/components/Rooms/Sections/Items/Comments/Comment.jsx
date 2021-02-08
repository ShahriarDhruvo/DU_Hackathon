import Moment from "moment";
import React, { useState, useRef } from "react";
import CustomAlert from "../../../../generic/CustomAlert";
import CustomModal from "../../../../generic/CustomModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Counter from "../../../../generic/Counter";
import Linkify from "react-linkify";
import CommentAttachmentModal from "./CommentAttachmentModal";

const Comment = (props) => {
    const form = useRef(null);
    const [edit, setEdit] = useState(false);
    const [status, setStatus] = useState(undefined);

    const handleEdit = (e) => {
        e.preventDefault();
        setEdit(!edit);
    };

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

    const componentDecorator = (href, text, key) => (
        <a href={href} key={key} target="_blank" rel="noopener noreferrer">
            {text}
        </a>
    );

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

                            <CommentAttachmentModal
                                room_pk={props.room_pk}
                                comment={props.comment}
                                updateFlag={props.updateFlag}
                                actionButtonClass="btn-link btn__none text-secondary"
                            >
                                <FontAwesomeIcon
                                    className="mr-2"
                                    icon={["fa", "paperclip"]}
                                />
                            </CommentAttachmentModal>
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

                            <div className="d-flex justify-content-between">
                                <button
                                    onClick={handleEdit}
                                    style={{ color: "red" }}
                                    className="btn-link btn__none"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn-link btn__none"
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="mt-2">
                            <Linkify componentDecorator={componentDecorator}>
                                {props.comment.content}
                            </Linkify>

                            {props.comment.attachment && (
                                <>
                                    <br /> <br />
                                    <div style={{ fontSize: "0.85rem" }}>
                                        <span className="font-weight-bold">
                                            Attachment:{" "}
                                        </span>
                                        <a
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            href={props.comment.attachment}
                                        >
                                            {props.comment.attachment
                                                .split("/")
                                                .pop()}
                                        </a>
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Comment;
