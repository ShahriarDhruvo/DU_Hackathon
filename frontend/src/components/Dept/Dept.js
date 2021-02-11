import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import { CardColumns } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const axios = require("axios");

export default class Dept extends Component {
    constructor(props) {
        super(props);

        this.state = {
            invalid: false,
            rooms: [],
            rooms_length: null,
            dept_name: "",
            dept_id: null,
            pending_rooms_id: [],
            enrolled_rooms_id: [],
        };
    }

    async componentDidMount() {
        const {
            match: { params },
        } = this.props;
        const id = params.id;
        let config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const fetchcourses = async () => {
            let endpoint = `/api/v1/rooms/${id}/list/`;
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
                    console.log(err);
                });
        };

        const fetch_dept_details = async () => {
            let endpoint = `/api/v1/university/departments/details/${id}/`;
            await axios
                .get(endpoint, config)
                .then((response) => {
                    this.setState({
                        dept_id: response.data.id,
                        dept_name: response.data[0].name,
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        };

        const fetchuserrooms = async () => {
            let endpoint2 = "/api/v1/rooms/user_room_list/";
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
                    // console.log(err);
                });
        };

        const fetchUserPendingRooms = async () => {
            const API_URL = "/api/v1/rooms/user_pending_request_room_list/";

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

        if (localStorage.getItem("isAuthenticated")) fetchUserPendingRooms();

        if (id) {
            await fetchcourses();
            await fetchuserrooms();
        }
        await fetch_dept_details();
    }

    render() {
        let courselists;
        if (this.state.rooms) {
            courselists = this.state.rooms.map((item) => (
                <div key={item.id}>
                    <Card border="main" className="course">
                        <Card.Body>
                            <Card.Title className="course__name">
                                {item.course.split(",")[0]} ({item.year})
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
                                            style={{
                                                float: "right",
                                                marginBottom: "10px",
                                            }}
                                        >
                                            <FontAwesomeIcon
                                                icon={["fas", "sign-in-alt"]}
                                                className="mr-2"
                                            />
                                            Enter
                                        </Button>
                                    </Link>
                                </div>
                            ) : (
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    style={{
                                        float: "right",
                                        marginBottom: "10px",
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
                                    ) ? (
                                        <>
                                            <FontAwesomeIcon
                                                icon={["fas", "spinner"]}
                                                className="mr-2"
                                            />
                                            Pending...
                                        </>
                                    ) : (
                                        <>
                                            <FontAwesomeIcon
                                                icon={["fas", "paper-plane"]}
                                                className="mr-2"
                                            />
                                            Enroll
                                        </>
                                    )}
                                </Button>
                            )}
                        </Card.Body>
                    </Card>
                </div>
            ));
        }
        return (
            <Container className="dept" fluid>
                <h2 className="dept__name">{this.state.dept_name}</h2>
                <CardColumns className="container">{courselists}</CardColumns>
            </Container>
        );
    }
}
