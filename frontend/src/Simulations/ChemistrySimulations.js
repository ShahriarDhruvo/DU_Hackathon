import React, { useState, useEffect } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

const ChemistrySimulations = (props) => {
    const [simulations, setSimulations] = useState([]);

    // Dummy data for getting at least 3 comming soon cards
    useEffect(() => {
        let tmp = [];
        for(let i=0; i<3; i++) 
            tmp.push(i);
        setSimulations(tmp);
    }, []);

    return (
        <Container className="mt-7">
            <Row>
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
            </Row>
        </Container>
    );
};

export default ChemistrySimulations;
