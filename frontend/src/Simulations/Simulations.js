import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const Simulations = (props) => {
    return (
        <Container className="mt-7">
            <Row>
                <Col>
                    <Card>
                        <Card.Img
                            variant="top"
                            src="/static/img/SimulationsSubjects/Biology.jpg"
                        />
                        <Card.Body>
                            <Card.Title>Biology</Card.Title>
                            <Card.Text>
                                Biology is the natural science that studies life
                                and living organisms, including their physical
                                structure, chemical processes, molecular
                                interactions, physiological mechanisms,
                                development and evolution.
                            </Card.Text>
                            <Button
                                variant="primary"
                                as={Link}
                                to="/simulation/biology/"
                            >
                                Show Simulations
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>

                <Col>
                    <Card>
                        <Card.Img
                            variant="top"
                            src="/static/img/SimulationsSubjects/Physics.jpg"
                        />
                        <Card.Body>
                            <Card.Title>Physics</Card.Title>
                            <Card.Text>
                                Physics is the natural science that studies
                                matter, its motion and behavior through space
                                and time, and the related entities of energy and
                                force. Physics is one of the most fundamental
                                scientific disciplines.
                            </Card.Text>
                            <Button
                                variant="primary"
                                as={Link}
                                to="/simulation/physics/"
                            >
                                Show Simulations
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>

                <Col>
                    <Card>
                        <Card.Img
                            variant="top"
                            src="/static/img/SimulationsSubjects/Chemistry.jpg"
                        />
                        <Card.Body>
                            <Card.Title>Chemistry</Card.Title>
                            <Card.Text>
                                Chemistry is the scientific discipline involved
                                with elements and compounds composed of atoms,
                                molecules and ions: their composition,
                                structure, properties, behavior with other
                                substances.
                            </Card.Text>
                            <Button
                                variant="primary"
                                as={Link}
                                to="/simulation/chemistry/"
                            >
                                Show Simulations
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Simulations;
