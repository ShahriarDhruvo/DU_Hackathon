import React from "react";
import { Spinner } from "react-bootstrap";

const LoadingPage = () => {
    return (
        <div className="d-flex">
            <Spinner animation="border" variant="syntax" />
            <span className="ml-3 my-auto">Loading...</span>
        </div>
    );
};

export default LoadingPage;