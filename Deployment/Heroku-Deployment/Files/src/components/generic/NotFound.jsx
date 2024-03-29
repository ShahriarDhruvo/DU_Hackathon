import React from "react";
import { Link } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NotFound = (props) => (
    <Container className="vertical-center text-center">
        <Card className="border-main">
            <Card.Body style={{ maxWidth: "30rem" }}>
                <h2 className="my-3">Oops! This Page Could Not Be Found.</h2>
                <span className="text-danger">Error Code: 404</span>
                <p>
                    The page you are looking for does not exist, have been
                    removed, name changed or is temporarily unavailable.
                </p>

                <div className="d-md-flex justify-content-between">
                    <Button
                        size="sm"
                        variant="main"
                        className="mt-3"
                        as={Link}
                        to="/"
                    >
                        <FontAwesomeIcon
                            className="mr-2"
                            icon={["fa", "home"]}
                        />
                        Go To Homepage
                    </Button>
                    <Button
                        size="sm"
                        variant="main"
                        className="mt-3 ml-2"
                        onClick={() => props.history.goBack()}
                    >
                        <FontAwesomeIcon
                            className="mr-2"
                            icon={["fa", "chevron-left"]}
                        />
                        Go Back
                    </Button>
                </div>
            </Card.Body>
        </Card>
    </Container>
);

export default NotFound;
