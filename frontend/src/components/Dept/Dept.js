import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import { CardColumns } from "react-bootstrap";
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
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
       enrolled_rooms_id : []
    }
  }
  

  async componentDidMount() {
    const {match:{params}} = this.props;
    const id = params.id;
    let config = {
      headers: {
          "Content-Type": "application/json",
      },
  };
    const fetchcourses = async() => {
        let endpoint = `/api/v1/rooms/${id}/list/`;
        await axios.get(endpoint, config)
        .then((response) => {
          let tmparray = [];
          
          for (var j = 0; j < response.data.length; j++) {
            tmparray.push(response.data[j]);
          }

          this.setState({
            rooms: tmparray,
            rooms_length: response.data.length,
          })
        })
        .catch((err)=>{
          console.log(err)
        });
      }

      const fetch_dept_details = async() => {
        let endpoint = `/api/v1/university/departments/details/${id}/`;
        await axios.get(endpoint, config)
        .then((response) => {
          this.setState({
            dept_id: response.data.id,
            dept_name: response.data[0].name
          })
        })
        .catch((err) => {
          console.log(err)
        });
      }

      const fetchuserrooms = async () => {
        let endpoint2 = '/api/v1/rooms/user_room_list/';
        await axios
            .get(endpoint2, config)
            .then((response) => {
                let tmprooms = [];
                
                for(let k=0; k<response.data.length; k++) {
                    tmprooms.push(response.data[k].id)
                }
                this.setState({
                    enrolled_rooms_id: [
                        ...this.state.enrolled_rooms_id,
                        ...tmprooms
                    ]
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

      if(id){
        await fetchcourses();
        await fetchuserrooms();
      }
      await fetch_dept_details();
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
                {localStorage.getItem("isAuthenticated") &&
                this.state.enrolled_rooms_id.includes(item.id) ? (
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
                ) : (
                  <Button
                    variant="outlined"
                    color="primary"
                    style={{ float: "right", marginBottom:"10px" }}
                  >
                    Enroll
                  </Button>
                )}
              </Card.Body>
            </Card>
          </div>
        ));
      }
      return (
        <Container className="dept" fluid>
          <h1 className="dept__name">{this.state.dept_name}</h1>
          <CardColumns className="container">{courselists}</CardColumns>
        </Container>
      );
    }
}