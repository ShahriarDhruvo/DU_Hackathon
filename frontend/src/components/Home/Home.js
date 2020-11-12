import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
// import { CardColumns } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "./Home.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from "../Header/Header";
import LoadingScreen from "../generic/LoadingScreen";
import { Link } from "react-router-dom";
const axios = require("axios");

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dept: [],
            rooms: {},
            promise: false,
            dept_id: null,
            dept_size: null,
        };
    }

    async componentDidMount() {
        console.log(localStorage.getItem("status"));
        let endpoint = "api/v1/university/departments/list/";
        let config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const fetchdept = async () => {
            await axios
                .get(endpoint, config)
                .then((response) => {
                    let tmparray = [];

                    for (var i = 0; i < response.data.length; i++) {
                        tmparray.push(response.data[i]);
                    }
                    this.setState({
                        dept: tmparray,
                        dept_size: response.data.length,
                    },()=>{console.log(this.state.dept, "here")});
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        await fetchdept();

        const fetchcourse_unauthenticated = async () => {
            for (let i = 0; i < this.state.dept.length; i++) {
                let endpoint1 = `api/v1/rooms/${this.state.dept[i].id}/list/`;
                let current_dept_id = this.state.dept[i].id;
                await axios
                    .get(endpoint1, config)
                    .then((response) => {
                        let tmparray = [];
                        for (var j = 0; j < response.data.length; j++) {
                            tmparray.push(response.data[j]);
                        }

                        this.setState({
                            rooms: {
                                ...this.state.rooms,
                                [current_dept_id]: tmparray,
                            },
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        };

        const fetchcourse_authenticated = async () => {
            let endpoint2 = `api/v1/rooms/${localStorage.getItem('dept_id')}/list/`;
            let current_dept_id = localStorage.getItem('dept_id');
            await axios
                .get(endpoint2, config)
                .then((response) => {
                    let tmparray = [];
                    for (var j = 0; j < response.data.length; j++) {
                        tmparray.push(response.data[j]);
                    }

                    this.setState({
                        rooms: {
                            ...this.state.rooms,
                            [current_dept_id]: tmparray,
                        },
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        };

        if (!localStorage.getItem("isAuthenticated")) {
            await fetchcourse_unauthenticated();
        } else {
            await fetchcourse_authenticated();
            
        }
    }

    async componentDidUpdate() {
        let config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const fetch_dept_name = async() => {
            let endpoint3 = `api/v1/university/departments/details/${localStorage.getItem('dept_id')}/`
            await axios
            .get(endpoint3, config)
            .then((response) => {
                localStorage.setItem('dept_name',response.data[0].name)
            })
            .catch((err) => {
                console.log(err)
            })
        }

        if(localStorage.getItem("isAuthenticated")){
            await fetch_dept_name();
        }
    }

    render() {
        const settings = {
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
            dots: true,
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
        let deptcoursel_unauthenticate;
        if (Object.keys(this.state.dept).length > 0) {
            deptcoursel_unauthenticate = this.state.dept.map((iitem, i) => (
              <div key={iitem.id}>
                <h3 className="dept__name">{iitem.name}</h3>
                <style>{cssstyle}</style>
                <Slider {...settings}>
                  {this.state.rooms[iitem.id] ? (
                    this.state.rooms[iitem.id].map((item) => (
                      <div key={item.id}>
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
                      </div>
                    ))
                  ) : (
                    <LoadingScreen />
                  )}
                </Slider>
                <div>
                  <Link
                    to={`/homerooms/${iitem.id}`}
                    style={{ float: "right" }}
                  >
                    <p>See More...</p>
                  </Link>
                </div>
              </div>
            ));
        }

        let deptcoursel_authenticate;
        if(localStorage.getItem('dept_id')){
            let dept_id = localStorage.getItem('dept_id');
            if(this.state.rooms[dept_id]) deptcoursel_authenticate = (
              <div>
                <style>{cssstyle}</style>
                <h3 className="dept__name">
                  {localStorage.getItem("dept_name")}
                </h3>
                <Slider {...settings}>
                  {this.state.rooms[dept_id].map((item) => (
                    <div key={item}>
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
                    </div>
                  ))}
                </Slider>
              </div>
            );
        }
        

        return (
            <div>
                {this.state.rooms &&
                Object.keys(this.state.rooms).length > 0 &&
                !localStorage.getItem("isAuthenticated") ? (
                    <div>
                        <Header />
                        <h2 className="pageIntro">All Availabe Rooms</h2>
                        <Container className="dept" fluid>
                            {deptcoursel_unauthenticate}
                        </Container>
                    </div>
                ) : (
                    // enrolled courses will be shown here:
                    <div>
                        <Header />
                        <h2 className="pageIntro">All Availabe Rooms</h2>
                        <Container className="dept" fluid>
                            {deptcoursel_authenticate}
                        </Container>
                    </div>
                )}
            </div>
        );
    }
}
const cssstyle = `
.slick-next:before, .slick-prev:before {
    color: #D6D6D6;
}
`;
