import React,{ Component } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import { CardColumns } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import './Home.scss';

class Home extends Component {
    render() {
        return (
            <Container fluid>
                <div className="dept">
                    <h1 className="dept_name">SWE</h1>
                    <hr className="line"></hr>
                    <CardColumns>
                        <Card border="info" className="course">
                            <Card.Header className="course__code">SWE121</Card.Header>
                            <Card.Body>
                                <Card.Title className="course__name">Structured Programming Language</Card.Title>
                                <Card.Text className="course__info">
                                    Some quick example text to build on the card title and make up the bulk
                                    of the card's content.
                                </Card.Text>
                                <Button variant="outline-primary">Enroll</Button>
                            </Card.Body>
                        </Card>
                    </CardColumns>
                </div>
            </Container>
        )
    }
}
export default Home;