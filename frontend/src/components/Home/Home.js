import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "@material-ui/core/Button";
import "./Home.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from "../Header/Header";
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
            enrolled_rooms_id: [],
        };
    }

    async componentDidMount() {
        let endpoint = "/api/v1/university/departments/list/";
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
                    });
                })
                .catch((err) => {
                    //console.log(err);
                });
        };
        await fetchdept();

        const fetchrooms = async () => {
            for (let i = 0; i < this.state.dept.length; i++) {
                let endpoint1 = `/api/v1/rooms/${this.state.dept[i].id}/list/`;
                let current_dept_id = this.state.dept[i].id;
                await axios
                    .get(endpoint1, config)
                    .then((response) => {
                        let tmparray = [];
                        for (let j = 0; j < response.data.length; j++) {
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
                        //console.log(err);
                    });
            }
        };

        const fetchuserrooms = async () => {
            let endpoint2 = `/api/v1/rooms/user_room_list/`;
            await axios
                .get(endpoint2, config)
                .then((response) => {
                    let tmprooms = [];

                    for (let k = 0; k < response.data.length; k++) {
                        tmprooms.push(response.data[k].id);
                    }
                    this.setState({
                        enrolled_rooms_id: [
                            ...this.state.enrolled_rooms_id,
                            ...tmprooms,
                        ],
                    });
                })
                .catch((err) => {
                    //console.log(err);
                });
        };
        await fetchrooms();
        if (localStorage.getItem("isAuthenticated")) {
            await fetchuserrooms();
        }
    }

    async componentDidUpdate() {
        let config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const fetch_dept_name = async () => {
            let endpoint3 = `/api/v1/university/departments/details/${localStorage.getItem(
                "dept_id"
            )}/`;
            await axios
                .get(endpoint3, config)
                .then((response) => {
                    localStorage.setItem("dept_name", response.data[0].name);
                })
                .catch((err) => {
                    // console.log(err)
                });
        };

        if (localStorage.getItem("isAuthenticated")) {
            await fetch_dept_name();
        }
    }

    room_enroll(room_id) {
        if (localStorage.getItem("status") == 2) {
            let body = new FormData();
            let endpoint = `/api/v1/rooms/pending_requests/${room_id}/create/`;
            axios
                .post(endpoint, body)
                .then((response) => {})
                .catch((err) => {
                    //console.log(err)
                });
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
        let deptcoursel;
        if (Object.keys(this.state.dept).length > 0) {
            deptcoursel = this.state.dept.map((iitem, i) => (
                <div key={iitem.id}>
                    {this.state.rooms[iitem.id] ? (
                        <div>
                            <h3 className="dept__name">{iitem.name}</h3>
                            <style>{cssstyle}</style>
                            <Slider {...settings}>
                                {this.state.rooms[iitem.id] ? (
                                    this.state.rooms[iitem.id].map((item) => (
                                        <div key={item.id}>
                                            <Card
                                                className="course"
                                                border="primary"
                                            >
                                                <Card.Body>
                                                    <Card.Title className="course__name">
                                                        {
                                                            item.course.split(
                                                                ","
                                                            )[0]
                                                        }
                                                    </Card.Title>
                                                    <Card.Subtitle className="mb-2 text-muted">
                                                        {
                                                            item.course.split(
                                                                ","
                                                            )[1]
                                                        }
                                                    </Card.Subtitle>
                                                    {this.state.enrolled_rooms_id.includes(
                                                        item.id
                                                    ) &&
                                                    localStorage.getItem(
                                                        "isAuthenticated"
                                                    ) ? (
                                                        <div>
                                                            <Link
                                                                to={`rooms/${item.id}`}
                                                            >
                                                                <Button
                                                                    variant="outlined"
                                                                    color="primary"
                                                                    style={{
                                                                        float:
                                                                            "right",
                                                                    }}
                                                                >
                                                                    Enter
                                                                </Button>
                                                            </Link>
                                                        </div>
                                                    ) : localStorage.getItem(
                                                          "isAuthenticated"
                                                      ) ? (
                                                        <Button
                                                            variant="outlined"
                                                            color="primary"
                                                            style={{
                                                                float: "right",
                                                            }}
                                                            onClick={() =>
                                                                this.room_enroll(
                                                                    item.id
                                                                )
                                                            }
                                                        >
                                                            Enroll
                                                        </Button>
                                                    ) : (
                                                        <Button
                                                            variant="outlined"
                                                            color="primary"
                                                            style={{
                                                                float: "right",
                                                            }}
                                                        >
                                                            Enroll
                                                        </Button>
                                                    )}
                                                </Card.Body>
                                            </Card>
                                        </div>
                                    ))
                                ) : (
                                    <p></p>
                                )}
                            </Slider>
                            <div className="d-flex justify-content-center">
                                <Button
                                    color="primary"
                                    style={{ marginTop: "40px" }}
                                >
                                    <Link to={`/homerooms/${iitem.id}`}>
                                        See More
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <p></p>
                    )}
                </div>
            ));
        }

        return (
            <div>
                {this.state.rooms &&
                Object.keys(this.state.rooms).length > 0 ? (
                    <div>
                        <Header />
                        <h2 className="pageIntro">All Availabe Rooms</h2>
                        <Container className="dept" fluid>
                            {deptcoursel}
                        </Container>
                    </div>
                ) : (
                    // enrolled courses will be shown here:
                    <div></div>
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
