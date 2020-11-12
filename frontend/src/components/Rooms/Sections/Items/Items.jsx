import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import CustomAlert from "../../../generic/CustomAlert";
import Comments from "./Comments/Comments";
import Moment from "moment";

const Items = (props) => {
    const [items, setItems] = useState([]);
    const [status, setStatus] = useState(undefined);

    useEffect(() => {
        const API_URL = `/api/v1/rooms/sections/items/${props.room_pk}/${props.section_pk}/list/`;

        const loadData = async () => {
            let response = await fetch(API_URL, {
                method: "GET",
            });

            let data = await response.json();

            if (!response.ok) setStatus(data.detail);
            else setItems(data);
        };

        loadData();
    }, [props.room_pk, props.section_pk]);

    return (
        <>
            {items.length ? (
                items.map((item) => (
                    <Card
                        key={item.id}
                        style={{ maxWidth: "60rem" }}
                        className="mx-auto mb-3"
                    >
                        <Card.Header className="d-md-flex justify-content-between">
                            <div>
                                {Moment(item.post_datetime).format("LLLL")}
                            </div>
                            <div>{item.user}</div>
                        </Card.Header>

                        <Card.Body className="border-bottom">
                            {status && (
                                <CustomAlert
                                    variant="warning"
                                    status={status}
                                />
                            )}

                            <div>
                                {item.content}
                                <div>
                                    Submission Date:{" "}
                                    {Moment(`${item.date} ${item.time}`).format(
                                        "LLLL"
                                    )}
                                </div>
                            </div>
                        </Card.Body>

                        <Comments
                            date={item.date}
                            time={item.time}
                            item_pk={item.id}
                            content={item.content}
                            room_pk={props.room_pk}
                        />
                    </Card>
                ))
            ) : (
                <div className="h4 text-muted text-center py-5">{status}</div>
            )}
        </>
    );
};

export default Items;
