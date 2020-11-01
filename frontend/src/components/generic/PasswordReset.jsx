import React, { useRef, useState } from "react";
import { Form, Container, Button } from "react-bootstrap";
import { usePromiseTracker, trackPromise } from "react-promise-tracker";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoadingScreen from "./LoadingScreen";
import CustomAlert from "./CustomAlert";

const PasswordReset = (props) => {
    const { promiseInProgress } = usePromiseTracker();
    const [status, setStatus] = useState(undefined);
    const [variant, setVariant] = useState("danger");
    const form = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        const API_URL = "/api/v1/accounts/password/reset/";

        const loadData = async () => {
            const formData = new FormData(form.current);

            try {
                const response = await fetch(API_URL, {
                    method: "POST",
                    body: formData,
                });

                const data = await response.json();

                if (response.ok) setVariant("success");

                setStatus(data[Object.keys(data)[0]]);
            } catch (error) {
                setStatus(error);
            }
        };

        trackPromise(loadData());
        document.getElementById("password-reset-form").reset();
    };

    return (
        <Container className="vertical-center">
            {promiseInProgress ? (
                <LoadingScreen />
            ) : status ? (
                <CustomAlert status={status} variant={variant} />
            ) : (
                <div
                    className="col ccard bg-main-bg"
                    style={{ maxWidth: "28rem" }}
                >
                    <div className="p-3 p-sm-4 text-center">
                        <Form
                            id="password-reset-form"
                            ref={form}
                            onSubmit={handleSubmit}
                        >
                            <h5 className="card-title mb-4">Reset Password</h5>

                            <div className="my-3 d-flex">
                                <span className="ccard__input-prepend">
                                    <FontAwesomeIcon
                                        className="fa-icon"
                                        icon={["fas", "envelope"]}
                                    />
                                </span>

                                <input
                                    required
                                    type="email"
                                    name="email"
                                    placeholder="Account Email..."
                                    className="ccard__input pl-2"
                                    onChange={() => setStatus("")}
                                />
                            </div>

                            <div className="mt-4">
                                <Button
                                    size="sm"
                                    type="submit"
                                    variant="main"
                                    className="mr-2"
                                >
                                    <FontAwesomeIcon
                                        className="mr-2"
                                        icon={["fa", "paper-plane"]}
                                    />
                                    Send Email
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
            )}
        </Container>
    );
};

export default PasswordReset;
