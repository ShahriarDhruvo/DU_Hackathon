import React, { useEffect, useState } from "react";
import CustomAlert from "../../../../generic/CustomAlert";
import DeleteItemModal from "../DeleteItemModal";
import UpdateItemModal from "../UpdateItemModal";
import AddComment from "./AddComment";
import Comment from "./Comment";

const Comments = (props) => {
    const [show, setShow] = useState(false);
    const [comments, setComments] = useState([]);
    const [flag, setFlag] = useState(Math.random());
    const [status, setStatus] = useState(undefined);

    useEffect(() => {
        const API_URL = `/api/v1/rooms/sections/items/comments/${props.room_pk}/${props.item_pk}/list/`;

        const loadData = async () => {
            let response = await fetch(API_URL, {
                method: "GET",
            });

            let data = await response.json();

            if (!response.ok) setStatus(data.detail);
            else setComments(data);
        };

        loadData();
    }, [props.room_pk, props.item_pk, flag]);

    const updateFlag = () => setFlag(Math.random());

    const handleShow = () => setShow(!show);

    return (
        <>
            <div className="p-2 d-flex flex-column flex-md-row justify-content-around">
                <button
                    onClick={handleShow}
                    className="btn__none my-1"
                    style={{ color: "#1e88e5" }}
                >
                    {!show ? "Show" : "Hide"} comments
                </button>

                <UpdateItemModal
                    date={props.date}
                    time={props.time}
                    modalTitle="Update"
                    actionButtonSize="sm"
                    content={props.content}
                    actionVariant="primary"
                    room_pk={props.room_pk}
                    item_pk={props.item_pk}
                    actionButtonClass="btn__none my-1"
                    updateItemFlag={props.updateItemFlag}
                >
                    Update this Item
                </UpdateItemModal>

                <DeleteItemModal
                    modalTitle="Delete"
                    actionButtonSize="sm"
                    actionVariant="danger"
                    room_pk={props.room_pk}
                    item_pk={props.item_pk}
                    actionButtonClass="btn__none my-1"
                    updateItemFlag={props.updateItemFlag}
                    modalBody={`Do you really want to delete this Item?`}
                >
                    Delete this Item
                </DeleteItemModal>
            </div>

            <div className="mx-3">
                {show && (
                    <>
                        {comments.map((comment) => (
                            <div key={comment.id} className="mb-2">
                                <Comment
                                    comment={comment}
                                    room_pk={props.room_pk}
                                    comment_pk={comment.id}
                                    updateFlag={updateFlag}
                                />
                            </div>
                        ))}

                        {status &&
                            (comments.length === 0 ? (
                                <h5 className="text-center text-muted my-4">
                                    {status}
                                </h5>
                            ) : (
                                <CustomAlert
                                    variant="warning"
                                    status={status}
                                />
                            ))}

                        <AddComment
                            room_pk={props.room_pk}
                            item_pk={props.item_pk}
                            updateFlag={updateFlag}
                        />
                    </>
                )}
            </div>
        </>
    );
};

export default Comments;
