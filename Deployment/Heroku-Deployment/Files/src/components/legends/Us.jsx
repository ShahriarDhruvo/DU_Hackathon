import React from "react";
import emoji from "react-easy-emoji";
import { Col, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Us = () => {
    return (
        <Container className="vertical-center">
            <div className="text-center mt-5">
                <h3 className="mb-6 text-secondary">
                    Want to know who are the legends? {emoji("😁")}
                </h3>

                <Row>
                    <Col md={1} />
                    <Col md={4} className="mb-4">
                        <div className="text-center">
                            <img
                                alt="profile"
                                className="rounded-circle img-fluid border border-main"
                                style={{ maxWidth: "13rem" }}
                                src="/static/img/Legends/dhruvo.jpg"
                            />

                            <h4 className="font-weight-bold mt-4">
                                Shahriar Elahi Dhruvo
                            </h4>

                            <h6>Full Stack Web Engineer</h6>

                            <div className="text-muted">
                                Undergraduate Student at Shahjalal University of
                                Science & Technology
                            </div>
                        </div>
                    </Col>
                    <Col md={2} />
                    <Col md={4} className="mb-4">
                        <div className="text-center">
                            <img
                                alt="profile"
                                className="rounded-circle img-fluid border border-main"
                                style={{ maxWidth: "13rem" }}
                                src="/static/img/Legends/tashfi.jpg"
                            />

                            <h4 className="font-weight-bold mt-4">
                                Mohammad Akhlaqur Rahman
                            </h4>

                            <h6>Backend Web Engineer</h6>

                            <div className="text-muted">
                                Undergraduate Student at Shahjalal University of
                                Science & Technology
                            </div>
                        </div>
                    </Col>
                    <Col md={1} />
                </Row>

                <Row>
                    <Col md={1} />
                    <Col md={4} className="mb-4">
                        <div className="text-center">
                            <img
                                alt="profile"
                                className="rounded-circle img-fluid border border-main"
                                style={{ maxWidth: "13rem" }}
                                src="/static/img/Legends/emon.jpg"
                            />

                            <h4 className="font-weight-bold mt-4">
                                Mahfuzur Rahman Emon
                            </h4>

                            <h6>Frontend Web Engineer</h6>

                            <div className="text-muted">
                                Undergraduate Student at Shahjalal University of
                                Science & Technology
                            </div>
                        </div>
                    </Col>
                    <Col md={2} />
                    <Col md={4} className="mb-4">
                        <div className="text-center">
                            <img
                                alt="profile"
                                className="rounded-circle img-fluid border border-main"
                                style={{ maxWidth: "13rem" }}
                                src="/static/img/Legends/sania.jpg"
                            />

                            <h4 className="font-weight-bold mt-4">
                                Sania Rahman
                            </h4>

                            <h6>Frontend Web Engineer</h6>

                            <div className="text-muted">
                                Undergraduate Student at Shahjalal University of
                                Science & Technology
                            </div>
                        </div>
                    </Col>
                    <Col md={1} />
                </Row>

                <Row>
                    <Col md={4} />
                    <Col md={4}>
                        <div className="text-center">
                            <img
                                alt="profile"
                                className="rounded-circle img-fluid border border-main"
                                style={{ maxWidth: "13rem" }}
                                src="/static/img/Legends/mobin.jpg"
                            />

                            <h4 className="font-weight-bold mt-4">
                                Shakirul Hasan Khan
                            </h4>

                            <h6>Advisor</h6>

                            <div className="text-muted">
                                Undergraduate Student at Shahjalal University of
                                Science & Technology
                            </div>
                        </div>
                    </Col>
                    <Col md={4} />
                </Row>

                <h3 className="mt-6 text-secondary">
                    ... are the Legends who made this awesome webpage{" "}
                    {emoji("😎")}
                </h3>
                <div className="mt-4">
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://github.com/ShahriarDhruvo/DU_Hackathon"
                    >
                        <FontAwesomeIcon
                            className="mr-2"
                            icon={["fab", "github"]}
                        />
                        Git hub page of this project
                    </a>
                </div>
            </div>
        </Container>
    );
};

export default Us;
