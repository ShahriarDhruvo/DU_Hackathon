import React, { useState, useEffect } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const SimulationSubjects = (props) => {
    const [simulationSubjects, setSimulationSubjects] = useState([]);

    // Dummy data for getting at least 3 Simulation Subjects cards
    useEffect(() => {
        let tmp = [
            {
                name: "biology",
                description: "Biology is the natural science that studies life and living organisms, including their physical structure, chemical processes, molecular interactions, physiological mechanisms and development.",
            },
            {
                name: "physics",
                description: "Physics is the natural science that studies matter, its motion and behavior through space and time, and the related entities of energy and force. Physics is one of the most fundamental scientific disciplines.",
            },
            {
                name: "chemistry",
                description: "Chemistry is the scientific discipline involved with elements and compounds composed of atoms, molecules and ions: their composition, structure, properties, behavior with other substances.",
            }
        ];

        setSimulationSubjects(tmp);
    }, []);

    return (
        <Container className="mt-7">
            <Row>
                {simulationSubjects.map((simulationSubject) => (
                    <Col md={4} sm={6} key={simulationSubject} className="mb-4">
                        <Card>
                            <Card.Img
                                variant="top"
                                src={`/static/img/SimulationsSubjects/${simulationSubject.name}.jpg`}
                            />
                            <Card.Body>
                                <Card.Title>{simulationSubject.name.charAt(0).toUpperCase() + simulationSubject.name.slice(1)}</Card.Title>
                                <Card.Text>
                                    {simulationSubject.description}
                                </Card.Text>
                                <Button
                                    size="sm"
                                    as={Link}
                                    to={`/simulation/${simulationSubject.name}/`}
                                    variant="outline-primary"
                                >
                                    Show Simulations
                            </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default SimulationSubjects;
