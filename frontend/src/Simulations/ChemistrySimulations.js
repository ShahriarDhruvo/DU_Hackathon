import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

const ChemistrySimulations = (props) => {
    return (
        <Container className="mt-7">
            <Row>
                <Col>
                    <Card>
                        <Card.Img
                            variant="top"
                            src="/static/img/Coming_Soon.jpg"
                        />
                        <Card.Body>
                            <Card.Title>Coming Soon</Card.Title>
                            <Card.Text>
                                Cras cursus magna libero, eu viverra augue
                                feugiat eget. In hac habitasse platea dictumst.
                                Etiam ut sem vel magna aliquet maximus. Sed
                                pulvinar tellus turpis, pharetra porta ligula
                                dictum ut.
                            </Card.Text>
                            <Button disabled variant="primary">
                                Show Simulations
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>

                <Col>
                    <Card>
                        <Card.Img
                            variant="top"
                            src="/static/img/Coming_Soon.jpg"
                        />
                        <Card.Body>
                            <Card.Title>Coming Soon</Card.Title>
                            <Card.Text>
                                Cras cursus magna libero, eu viverra augue
                                feugiat eget. In hac habitasse platea dictumst.
                                Etiam ut sem vel magna aliquet maximus. Sed
                                pulvinar tellus turpis, pharetra porta ligula
                                dictum ut.
                            </Card.Text>
                            <Button disabled variant="primary">
                                Show Simulations
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>

                <Col>
                    <Card>
                        <Card.Img
                            variant="top"
                            src="/static/img/Coming_Soon.jpg"
                        />
                        <Card.Body>
                            <Card.Title>Coming Soon</Card.Title>
                            <Card.Text>
                                Cras cursus magna libero, eu viverra augue
                                feugiat eget. In hac habitasse platea dictumst.
                                Etiam ut sem vel magna aliquet maximus. Sed
                                pulvinar tellus turpis, pharetra porta ligula
                                dictum ut.
                            </Card.Text>
                            <Button disabled variant="primary">
                                Show Simulations
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ChemistrySimulations;
