import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Counter = (props) => {
    const [count, setCount] = useState(props.count);

    const upCount = () => setCount(count + 1);
    const downCount = () => setCount(count - 1);

    useEffect(() => {
        const API_URL = `/api/v1/rooms/sections/items/comments/${props.room_pk}/update/${props.comment_pk}/`;

        const loadData = async () => {
            await fetch(API_URL, {
                method: "PATCH",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    vote: count,
                }),
            });
        };

        loadData();
    }, [count, props]);

    return (
        <div
            style={{ wordBreak: "normal" }}
            className="mr-2 mt-1 d-flex flex-column"
        >
            <button onClick={upCount} className="btn__none">
                <FontAwesomeIcon
                    className="fa-icon"
                    icon={["fas", "chevron-up"]}
                />
            </button>

            {count}

            <button onClick={downCount} className="btn__none">
                <FontAwesomeIcon
                    className="fa-icon"
                    icon={["fas", "chevron-down"]}
                />
            </button>
        </div>
    );
};

export default Counter;
