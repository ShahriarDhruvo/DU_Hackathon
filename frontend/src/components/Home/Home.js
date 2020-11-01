import React,{ Component } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import { CardColumns } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import './Home.scss';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default class Home extends Component {
    render() {
        const settings = {
          dots: false,
          infinite: true,
          speed: 500,
          slidesToShow: 3,
          slidesToScroll: 1,
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
                dots: true,
              },
            },
            {
              breakpoint: 1000,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
              },
            },
            {
              breakpoint: 800,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                arrows: false,
                infinite: true,
                dots: true,
              },
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                infinite: true,
                dots: true,
              },
            },
          ],
        };
        return (
          <Container className="dept" fluid>
            <h1 className="">SWE</h1>
            <style>{cssstyle}</style>
            <Slider {...settings}>
              <div>
                <Card className="course">
                  <Card.Body>
                    <Card.Title className="course__name">SWE121</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Structured Programming Language</Card.Subtitle>
                    <Card.Text className="course__info">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </Card.Text>
                    <Button variant="outline-primary">Enroll</Button>
                  </Card.Body>
                </Card>
              </div>
              <div>
              <Card className="course">
                  <Card.Body>
                    <Card.Title className="course__name">SWE121</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Structured Programming Language</Card.Subtitle>
                    <Card.Text className="course__info">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </Card.Text>
                    <Button variant="outline-primary">Enroll</Button>
                  </Card.Body>
                </Card>
              </div>
              <div>
              <Card className="course">
                  <Card.Body>
                    <Card.Title className="course__name">SWE121</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Structured Programming Language</Card.Subtitle>
                    <Card.Text className="course__info">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </Card.Text>
                    <Button variant="outline-primary">Enroll</Button>
                  </Card.Body>
                </Card>
              </div>
              <div>
              <Card className="course">
                  <Card.Body>
                    <Card.Title className="course__name">SWE121</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Structured Programming Language</Card.Subtitle>
                    <Card.Text className="course__info">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </Card.Text>
                    <Button variant="outline-primary">Enroll</Button>
                  </Card.Body>
                </Card>
              </div>
              <div>
              <Card className="course">
                  <Card.Body>
                    <Card.Title className="course__name">SWE121</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Structured Programming Language</Card.Subtitle>
                    <Card.Text className="course__info">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </Card.Text>
                    <Button variant="outline-primary">Enroll</Button>
                  </Card.Body>
                </Card>
              </div>
            </Slider>
          </Container>
          /*  <Container fluid>
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
            </Container> */
        );
    }
}
const cssstyle = `
.slick-next:before, .slick-prev:before {
    color: #000;
}
`