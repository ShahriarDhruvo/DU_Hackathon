import React, { useRef, useState } from "react";
import { Form, Container, Card, Button } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomAlert from "./CustomAlert";
// import { AuthenticationContext } from "../contexts/AuthenticationContext";

const PasswordChange = (props) => {
    const [status, setStatus] = useState(undefined);
    const [variant, setVariant] = useState("danger");
    const form = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        const API_URL = "/api/v1/accounts/password/change/";

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

        loadData();
        document.getElementById("password-change-form").reset();
    };

    return (
        <Container className="vertical-center">
            <Card className="col border-main" style={{ maxWidth: "28rem" }}>
                <Card.Body className="text-center">
                    <h5 className="mb-4">Change Password</h5>

                    <Form
                        ref={form}
                        onSubmit={handleSubmit}
                        id="password-change-form"
                    >
                        <div className="mx-auto">
                            {status && (
                                <CustomAlert
                                    status={status}
                                    variant={variant}
                                />
                            )}
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
                                name="old_password"
                                placeholder="Old password"
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

                        <div className="d-md-flex justify-content-between mt-4">
                            <Button
                                size="sm"
                                type="submit"
                                variant="main"
                                className="mb-2 mr-sm-2"
                            >
                                <FontAwesomeIcon
                                    className="mr-2"
                                    icon={["fa", "key"]}
                                />
                                Change Password
                            </Button>

                            <Button
                                size="sm"
                                variant="outline-main"
                                className="mb-2"
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
                </Card.Body>
            </Card>
        </Container>
    );
};

export default PasswordChange;
