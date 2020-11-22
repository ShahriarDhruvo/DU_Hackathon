import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import { CardColumns } from "react-bootstrap";
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom";
const axios = require("axios");

export default class MyRooms extends Component {
    constructor(props) {
        super(props);

        this.state = {
            invalid: false,
            rooms: [],
            rooms_length: null,
            enrolled_rooms_id: [],
        };
    }

    async componentDidMount() {
        let config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const fetchcourses = async () => {
            let endpoint = `/api/v1/rooms/user_room_list/`;
            await axios
                .get(endpoint, config)
                .then((response) => {
                    let tmparray = [];

                    for (var j = 0; j < response.data.length; j++) {
                        tmparray.push(response.data[j]);
                    }

                    this.setState({
                        rooms: tmparray,
                        rooms_length: response.data.length,
                    });
                })
                .catch((err) => {
                    //console.log(err);
                });
        };
        await fetchcourses();
    }

    render() {
      let courselists;
      if(this.state.rooms){
        courselists = this.state.rooms.map((item) => (
          <div key={item.id}>
            <Card border="primary" className="course">
              <Card.Body>
                <Card.Title className="course__name">
                  {item.course.split(",")[0]}
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {item.course.split(",")[1]}
                </Card.Subtitle>
                <div>
                  <Link to={`/rooms/${item.id}`}>
                    <Button
                      variant="outlined"
                      color="primary"
                      style={{ float: "right", marginBottom:"10px" }}
                    >
                      Enter
                    </Button>
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </div>
        ));
  }

      return (
        <Container className="dept" fluid>
          <h1 className="dept__name">My Rooms</h1>
          <CardColumns className="container">{courselists}</CardColumns>
        </Container>
      );
    }
}
