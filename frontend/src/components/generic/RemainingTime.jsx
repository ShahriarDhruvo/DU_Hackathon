import React, { useState, useEffect } from "react";
import moment from "moment";
import "moment-duration-format";

const RemainingTime = (props) => {
    const [time, setTime] = useState(null);

    useEffect(() => {
        const interval = setInterval(() => {
            const currentTime = `${new Date().toLocaleDateString(
                "en-CA"
            )} ${new Date().toLocaleTimeString("en-GB")}`;

            const targetTime = `${props.deadline.split("T")[0]} ${
                props.deadline.split("T")[1]
            }`;

            setTime(
                moment
                    .duration(moment(targetTime).diff(moment(currentTime)))
                    .format(
                        "Y [year] M [month] w [week] d [days] h [hrs] m [min] s[s]"
                    )
            );
        }, 1000);

        if (time && time[0] === "-") clearInterval(interval);

        return () => clearInterval(interval);
    }, [props.deadline, time]);

    return (
        <>
            {time && time[0] === "-" ? (
                <span className="text-danger">Times Up!</span>
            ) : (
                <span>
                    <b>Remaining Time: </b>
                    {time}
                </span>
            )}
        </>
    );
};

export default RemainingTime;
