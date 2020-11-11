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
       rooms: [],
       rooms_length: null,
       dept_name:'',
       dept_id:null,
    }
  }
  

  async componentDidMount() {
    console.log("VAUI")
    const {match:{params}} = this.props;
    const id = params.id;
    console.log(params)
    const fetchcourses = async() => {
        let config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        let endpoint = `/api/v1/rooms/${id}/list/`;
        await axios.get(endpoint, config)
        .then((response) => {
          let tmparray = [];
          
          for (var j = 0; j < response.data.length; j++) {
            tmparray.push(response.data[j]);
          }
          console.log("ASD")
          console.log(tmparray)

          this.setState({
            rooms: tmparray,
            rooms_length: response.data.length,
          },() => {console.log(this.state)})
        })
        .catch((err)=>{
          console.log(err)
        });
      }

      const fetch_dept_details = async() => {
        let config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        let endpoint = `/api/v1/university/departments/details/${id}/`;
        await axios.get(endpoint, config)
        .then((response) => {
          console.log("HIIIIII")
          console.log(response.data[0].name)
          this.setState({
            dept_id: response.data.id,
            dept_name: response.data[0].name
          })
        },()=>{console.log(this.state)})
        .catch((err) => {
          console.log("ERROR")
          console.log(err)
        });
      }

      if(id){
        await fetchcourses();
      }
      await fetch_dept_details();
  }

    render() {
      let courselists;
      if(this.state.rooms){
        courselists = this.state.rooms.map((item) => (
          <div key={item.id}>
            
              <CardColumns>
                <Card className="course">
                  <Card.Body>
                    <Card.Title className="course__name">
                      {item.course.split(",")[0]}
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {item.course.split(",")[1]}
                    </Card.Subtitle>
                    <Button variant="outline-primary">Enroll</Button>
                  </Card.Body>
                </Card>
              </CardColumns>
          </div>
      ));
  }

      return (
        <div>
          <Container className="dept" fluid>
              <h1 className="dept__name">{this.state.dept_name}</h1>
          {courselists}
          </Container>
        </div>
      );
    }
}