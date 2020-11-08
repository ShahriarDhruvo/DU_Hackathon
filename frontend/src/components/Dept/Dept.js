import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import { CardColumns } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { CardGroup } from "react-bootstrap";
import {Link,useLocation, useParams} from "react-router-dom";
const axios = require("axios");

export default class Dept extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       invalid: false,
       courses: [],
       courses_length: null,
       dept_name:'',
       dept_id:null,
    }
  }
  

  async componentDidMount() {
    const {match:{params}} = this.props;
    const id = params.id;
    const fetchcourses = async() => {
        let config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        let endpoint = `/api/v1/university/departments/courses/${id}/list/`;
        await axios.get(endpoint, config)
        .then((response) => {
          let tmparray = [];
          
          for (var j = 0; j < response.data.length; j++) {
            tmparray.push(response.data[j]);
          }

          this.setState({
            courses: tmparray,
            courses_length: response.data.length,
          },() => {console.log(this.state)})
        });
      }

      if(id)
        await fetchcourses();
  }

    render() {
      let courselists;
      if(this.state.courses){
        courselists = this.state.courses.map((item) => {
          return(
          <div>
            <Container className="dept" fluid>
              <h1 className="dept__name">SWE</h1>
              <CardColumns>
                <Card className="course">
                  <Card.Body>
                    <Card.Title className="course__name">{item.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {item.details}
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
          </div>
        )
      });
  }

        return (
          /*<Container className="dept" fluid>
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
          </Container>*/
          <div>
            {courselists}
          </div>
        );
    }
}