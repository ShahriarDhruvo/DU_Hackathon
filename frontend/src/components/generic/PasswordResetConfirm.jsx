import React, { useState } from "react";
import { Container, Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomAlert from "./CustomAlert";

const PassworResetConfirm = (props) => {
    const [status, setStatus] = useState(undefined);
    const [variant, setVariant] = useState("danger");
    const params = useParams();

    const handleSubmit = (e) => {
        e.preventDefault();

        const API_URL = "/api/v1/accounts/password/reset/confirm/";

        const loadData = async () => {
            try {
                const response = await fetch(API_URL, {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        new_password1: e.target.new_password1.value,
                        new_password2: e.target.new_password2.value,
                        uid: params.uid,
                        token: params.token,
                    }),
                });

                const data = await response.json();

                if (response.ok) setVariant("success");

                setStatus(data[Object.keys(data)[0]]);
            } catch (error) {
                setStatus(error);
            }
        };

        loadData();
        document.getElementById("password-reset-form").reset();
    };

    return (
        <Container className="vertical-center">
            <div className="col ccard bg-main-bg" style={{ maxWidth: "28rem" }}>
                <div className="p-3 p-sm-4 text-center">
                    <h5 className="card-title mb-4">Reset Password</h5>

                    <Form id="password-reset-form" onSubmit={handleSubmit}>
                        {status && (
                            <CustomAlert variant={variant} status={status} />
                        )}

                        <div className="my-3 d-flex">
                            <span className="ccard__input-prepend">
                                <FontAwesomeIcon
                                    className="fa-icon"
                                    icon={["fas", "lock"]}
                                />
                            </span>

                            <input
                                required
                                type="password"
                                name="new_password1"
                                placeholder="New password"
                                className="ccard__input pl-2"
                                onChange={() => setStatus("")}
                            />
                        </div>

                        <div className="my-3 d-flex">
                            <span className="ccard__input-prepend">
                                <FontAwesomeIcon
                                    className="fa-icon"
                                    icon={["fas", "lock"]}
                                />
                            </span>

                            <input
                                required
                                type="password"
                                name="new_password2"
                                placeholder="Repeat password"
                                className="ccard__input pl-2"
                                onChange={() => setStatus("")}
                            />
                        </div>

                        <div className="mt-4">
                            <Button
                                size="sm"
                                type="submit"
                                variant="main"
                                className="mb-2 mb-md-0 mr-sm-2"
                            >
                                <FontAwesomeIcon
                                    className="mr-2"
                                    icon={["fa", "window-restore"]}
                                />
                                Reset Password
                            </Button>

                            <Button
                                size="sm"
                                variant="outline-main"
                                onClick={() => props.history.goBack()}
                            >
                                <FontAwesomeIcon
                                    className="mr-2"
                                    icon={["fa", "chevron-left"]}
                                />
                                Go Back
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </Container>
    );
};

export default PassworResetConfirm;
