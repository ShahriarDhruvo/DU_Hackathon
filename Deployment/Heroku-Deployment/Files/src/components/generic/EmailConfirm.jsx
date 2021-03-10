import React, { useState, useEffect } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import CustomAlert from "./CustomAlert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EmailConfirm = () => {
    const [status, setStatus] = useState(undefined);
    const params = useParams();

    useEffect(() => {
        const API_URL = "/api/v1/accounts/account-confirm-email/";

        const loadData = async () => {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    key: params.key,
                }),
            });

            const data = await response.json();

            setStatus(data.detail);
        };

        loadData();
    }, [params]);

    return (
        <Container className="d-flex align-items-center justify-content-center">
            <Card
                className="p-3 text-center border-main"
                style={{ maxWidth: "28rem" }}
            >
                <CustomAlert
                    variant="info"
                    status={
                        status === "ok"
                            ? "You have successfully verified your email address."
                            : "Sorry, try again."
                    }
                />

                {status === "ok" ? (
                    <Button variant="main" as={Link} to="/login">
                        <FontAwesomeIcon
                            className="mr-2"
                            icon={["fas", "sign-in-alt"]}
                        />
                        SignIn
                    </Button>
                ) : (
                    <Button variant="main" as={Link} to="/">
                        <FontAwesomeIcon
                            className="mr-2"
                            icon={["fas", "home"]}
                        />
                        Go to HomePage
                    </Button>
                )}
            </Card>
        </Container>
    );
};

export default EmailConfirm;
