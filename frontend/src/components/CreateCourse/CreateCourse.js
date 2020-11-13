import React, { useEffect, useState, useRef } from "react";
import Modal from "react-bootstrap/Modal";
// import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./CreateCourse.scss";
import { Form } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
const axios = require("axios");

const useStyles = makeStyles((theme) => ({
    fab: {
        position: "fixed",
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200,
        maxWidth: 300,
    },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function CreateCourse() {
    const classes = useStyles();
    const form = useRef(null);
    const [show, setShow] = useState(false);
    const [courses, setCourses] = useState(null);
    const [select_course, set_select_course] = useState(null);
    const [year, setYear] = useState(null);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [roomname, setRoomName] = React.useState([]);
    const [valid, setValid] = React.useState([]);

    useEffect(() => {
        let config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const loadCourse = async () => {
            const dept_id = localStorage.getItem("dept_id");
            let endpoint = `api/v1/university/departments/courses/${dept_id}/list/`;
            let tmpcourse = [];
            await axios
                .get(endpoint, config)
                .then((response) => {
                    for (let i = 0; i < response.data.length; i++)
                        tmpcourse.push(response.data[i]);
                    if (response.data.length) {
                        setCourses(tmpcourse);
                        set_select_course(tmpcourse[0].id);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        loadCourse();
    }, []);

    const handleChange = (event) => {
        setRoomName(event.target.value);
        setValid(event.target.value);
    };

    const handle_year = (event) => {
        setYear(event.target.value);
        console.log(year);
    };

    const handle_select_course = (event) => {
        set_select_course(event.target.value);
    };

    const handle_course_create = (e, data) => {
        e.preventDefault();
        const create_room = async () => {
            /*let value = {
                "course": select_course,
                "group": "",
                "year": year,
                "owner":localStorage.getItem('user_id'),
                "teachers":localStorage.getItem('user_id')
            }*/
            const body = new FormData(form.current);
            /*let body = JSON.stringify(value);*/
            console.log(body, "bal");
            let config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            let dept_id = localStorage.getItem("dept_id");
            let endpoint = `api/v1/rooms/create/`;
            await axios
                .post(endpoint, body, config)
                .then((response) => {
                    console.log(response.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        create_room();
    };

    if (localStorage.getItem("status") == 1 && courses) {
        let courselist =
            courses.length > 0 &&
            courses.map((item, i) => {
                return (
                    <option key={i} value={item.id}>
                        {item.title}
                    </option>
                );
            });
        return (
            <>
                {/* <button onClick={handleShow} className="ccourse">
            <span className="ccourse__plus">
                <FontAwesomeIcon icon="plus" />
            </span>
            </button> */}
                <Fab
                    style={{ backgroundColor: "#c35cff", color: "#FFFCF7" }}
                    className={classes.fab}
                    onClick={handleShow}
                >
                    <AddIcon />
                </Fab>
                <Modal show={show} centered>
                    <Modal.Body>
                        <h2 className="text-center ccourse__heading">
                            Create Room
                        </h2>
                        <Form
                            ref={form}
                            className="form"
                            onSubmit={handle_course_create}
                        >
                            <Form.Group className="form__group">
                                <Form.Control
                                    as="select"
                                    type="number"
                                    name="course"
                                    className="form__control"
                                >
                                    {courselist}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group className="form__group">
                                <Form.Control
                                    type="number"
                                    placeholder="Year"
                                    name="year"
                                />
                            </Form.Group>
                            <Form.Group className="form__group">
                                <Form.Control
                                    type="text"
                                    placeholder="Group"
                                    name="group"
                                />
                            </Form.Group>

                            <div className="text-center">
                                <Button
                                    variant="btn-block"
                                    type="submit"
                                    className="sign__submit"
                                >
                                    Create
                                </Button>
                            </div>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                {/*<Button variant="primary" onClick={handleClose}>
                    Done
                </Button>
                */}
                    </Modal.Footer>
                    
                </Modal>
            </>
        );
    } else {
        return <div></div>;
    }
}

export default CreateCourse;
