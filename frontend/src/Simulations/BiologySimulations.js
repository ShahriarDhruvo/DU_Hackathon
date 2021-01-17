import React, { useState, useEffect } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const BiologySimulations = (props) => {
    const [simulations, setSimulations] = useState([]);

    // Dummy data for getting at least 3 comming soon cards
    useEffect(() => {
        let tmp = [];
        for (let i = 0; i < 2; i++)
            tmp.push(i);
        setSimulations(tmp);
    }, []);

    return (
        <Container className="mt-7">
            <Row>
                <>
                    <Col md={4} sm={6} className="mb-4">
                        <Card>
                            <Card.Img
                                variant="top"
                                src="/static/img/Simulations/CellSimulation.jpg"
                            />
                            <Card.Body>
                                <Card.Title>Cell Simulation</Card.Title>
                                <Card.Text>
                                    The cell is the basic structural, functional,
                                    and biological unit of all known organisms. A
                                    cell is the smallest unit of life. Cells are
                                    often called the "building blocks of life".
                        </Card.Text>
                                <Button
                                    size="sm"
                                    as={Link}
                                    variant="primary"
                                    to="/simulation/biology/cell/simulation/"
                                >
                                    Show Simulations
                        </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    {simulations.map((simulation) => (
                        <Col md={4} sm={6} key={simulation} className="mb-4">
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
                                    <Button size="sm" disabled variant="primary">
                                        Show Simulations
                                </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </>
            </Row>
        </Container>
    );
};

export default BiologySimulations;
