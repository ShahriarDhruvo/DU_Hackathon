import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import CustomAlert from "./CustomAlert";

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
            <div
                className="ccard p-4 text-center bg-main-bg"
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
                        Login
                    </Button>
                ) : (
                    <Button variant="main" as={Link} to="/register">
                        Register
                    </Button>
                )}
            </div>
        </Container>
    );
};

export default EmailConfirm;
