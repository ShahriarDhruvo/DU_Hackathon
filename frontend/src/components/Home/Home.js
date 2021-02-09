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
import CustomModal from "../generic/CustomModal";
import CustomAlert from "../generic/CustomAlert";
const axios = require("axios");

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dept: [],
            rooms: {},
            dept_id: null,
            promise: false,
            dept_size: null,
            variant: "danger",
            status: undefined,
            pending_rooms_id: [],
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
                    // this.setState({ status: err });
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
                        // this.setState({ status: err });
                    });
            }
        };

        await fetchrooms();

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
                    // this.setState({ status: err });
                });
        };

        const fetchUserPendingRooms = async () => {
            const API_URL = "api/v1/rooms/user_pending_request_room_list/";

            const response = await fetch(API_URL, {
                method: "GET",
            });

            const data = await response.json();

            let tmp = [];

            for (let i = 0; i < data.length; i++) tmp.push(data[i].id);

            this.setState({
                pending_rooms_id: tmp,
            });

            // if (!response.ok) this.setState({ status: data.detail });
        };

        if (localStorage.getItem("isAuthenticated")) {
            await fetchuserrooms();
            fetchUserPendingRooms();
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
                    // this.setState({ status: err });
                });
        };

        if (localStorage.getItem("isAuthenticated")) {
            await fetch_dept_name();
        }
    }

    room_enroll(room_id, isPending) {
        if (localStorage.getItem("status") === "2") {
            let body = new FormData();
            let endpoint = `/api/v1/rooms/pending_requests/${room_id}/create/`;
            axios
                .post(endpoint, body)
                .then((response) => {})
                .catch((err) => {
                    // this.setState({ status: err });
                });
        }

        if (isPending) {
            this.setState({
                variant: "info",
                status:
                    "A teacher or CR needs to approve your request to enter this room",
            });
        } else {
            this.setState({
                variant: "success",
                status: "A request has been sent to join the room",
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
            deptcoursel = this.state.dept.map((iitem) => (
                <div key={iitem.id}>
                    {this.state.rooms[iitem.id] && (
                        <div>
                            <h3 className="dept__name">
                                {iitem.name} (
                                {this.state.rooms[iitem.id].length < 3
                                    ? (settings.slidesToShow = this.state.rooms[
                                          iitem.id
                                      ].length)
                                    : (settings.slidesToShow = 3)}
                                )
                            </h3>

                            <style>{cssstyle}</style>

                            <Slider {...settings}>
                                {this.state.rooms[iitem.id] &&
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
                                                        }{" "}
                                                        ({item.year})
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
                                                    ) : (
                                                        localStorage.getItem(
                                                            "isAuthenticated"
                                                        ) && (
                                                            <Button
                                                                variant="outlined"
                                                                color="primary"
                                                                style={{
                                                                    float:
                                                                        "right",
                                                                }}
                                                                onClick={() =>
                                                                    this.room_enroll(
                                                                        item.id,
                                                                        this.state.pending_rooms_id.includes(
                                                                            item.id
                                                                        )
                                                                    )
                                                                }
                                                            >
                                                                {this.state.pending_rooms_id.includes(
                                                                    item.id
                                                                )
                                                                    ? "Pending..."
                                                                    : "Enroll"}
                                                            </Button>
                                                        )
                                                    )}
                                                </Card.Body>
                                            </Card>
                                        </div>
                                    ))}
                            </Slider>

                            <div className="d-flex justify-content-center">
                                <Button
                                    color="primary"
                                    style={{ marginTop: "40px" }}
                                >
                                    <Link to={`/homerooms/${iitem.id}`}>
                                        Show All
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            ));
        }

        return (
            <div>
                {this.state.rooms && Object.keys(this.state.rooms).length > 0 && (
                    <div>
                        <Header />
                        <h2 className="pageIntro">All Availabe Rooms</h2>

                        {this.state.status && (
                            <CustomModal
                                show={true}
                                noAction={true}
                                modalTitle="Error"
                                modalBody={
                                    <CustomAlert
                                        status={this.state.status}
                                        variant={this.state.variant}
                                    />
                                }
                            />
                        )}

                        <Container className="dept" fluid>
                            {deptcoursel}
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
