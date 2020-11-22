import React from "react";
import { Alert } from "react-bootstrap";

const CustomAlert = (props) => {
    return (
        <div className="text-center">
            <Alert
                variant={props.variant ? props.variant : "danger"}
                className={props.alertClass ? `${props.alertClass}` : ""}
            >
                {props.status}
            </Alert>
        </div>
    );
};

export default CustomAlert;
