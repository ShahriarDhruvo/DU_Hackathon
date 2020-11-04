import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import { CardColumns } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { CardGroup } from "react-bootstrap";

export default class Home extends Component {
    render() {
        return (
          <Container className="dept" fluid>
            <h1 className="dept__name">SWE</h1>
            <CardColumns>
              <Card className="course">
                <Card.Body>
                  <Card.Title className="course__name">SWE121</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Structured Programming Language
                  </Card.Subtitle>
                  <Card.Text className="course__info">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <Button variant="outline-primary">Enroll</Button>
                </Card.Body>
              </Card>
            </CardColumns>
          </Container>
        );
    }
}