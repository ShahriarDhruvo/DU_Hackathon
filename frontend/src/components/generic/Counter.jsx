import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Counter = (props) => {
    const [count, setCount] = useState(0);

    const upCount = () => setCount(count + 1);
    const downCount = () => setCount(count - 1);

    return (
        <div className="mr-2 mt-1 text-center" style={{ wordBreak: "normal" }}>
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
