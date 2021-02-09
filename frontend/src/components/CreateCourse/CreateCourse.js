import React, { useEffect, useState, useRef, useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import CustomAlert from "../generic/CustomAlert";
import "./CreateCourse.scss";
import { SettingsContext } from "../../contexts/SettingsContext";
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

const CreateCourse = (props) => {
    const classes = useStyles();
    const form = useRef(null);
    const [show, setShow] = useState(false);
    const [courses, setCourses] = useState(null);
    //const [select_course, set_select_course] = useState(null);
    //const [created_rooms, set_Created_rooms] = useState([]);
    const [errors, seterrors] = useState("");
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { isAnimated } = useContext(SettingsContext);

    useEffect(() => {
        let config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const dept_id = localStorage.getItem("dept_id");

        const loadCourse = async () => {
            let endpoint = `api/v1/university/departments/courses/${dept_id}/list/`;
            let tmpcourse = [];
            await axios
                .get(endpoint, config)
                .then((response) => {
                    for (let i = 0; i < response.data.length; i++)
                        tmpcourse.push(response.data[i]);
                    if (response.data.length) {
                        setCourses(tmpcourse);
                        //set_select_course(tmpcourse[0].id);
                    }
                })
                .catch((err) => {
                    //.log(err);
                });
        };
        dept_id && loadCourse();

        /*const fetchuserrooms = async () => {
            let endpoint2 = `/api/v1/rooms/user_room_list/`;
            await axios
                .get(endpoint2, config)
                .then((response) => {
                    let tmprooms = [];
                    console.log(response.data)
                    for(let k=0; k<response.data.length; k++) {
                        tmprooms.push(response.data[k].id)
                    }
                    set_Created_rooms([...created_rooms, ...tmprooms]);
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        fetchuserrooms();*/
    }, []);

    const handle_course_create = (e) => {
        e.preventDefault();

        const create_room = async () => {
            const body = new FormData(form.current);
            let config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            let endpoint = `api/v1/rooms/create/`;
            await axios
                .post(endpoint, body, config)
                .then((response) => {
                    //console.log(response.data);
                })
                .catch((err) => {
                    seterrors("The item from this course is already created");
                });
        };
        create_room();
        window.location.replace("/");
        handleClose();
    };

    if (localStorage.getItem("status") === "1" && courses) {
        let courselist =
            courses.length > 0 &&
            courses.map((item, i) => {
                //if(!created_rooms.includes(item.id)){
                return (
                    <option key={i} value={item.id}>
                        {item.title}
                    </option>
                );
                //}
            });
        return (
            <>
                <Fab
                    style={{ backgroundColor: "#c35cff", color: "#FFFCF7" }}
                    className={classes.fab}
                    onClick={handleShow}
                >
                    <AddIcon />
                </Fab>
                <Modal
                    centered
                    show={show}
                    onHide={handleClose}
                    animation={isAnimated}
                >
                    <Modal.Body>
                        <h2 className="text-center">Create Room</h2>
                        {Object.keys(errors).length !== 0 && (
                            <CustomAlert status={JSON.stringify(errors)} />
                        )}
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

                            <div className="d-flex justify-content-between">
                                <Button
                                    className="w-25"
                                    onClick={handleClose}
                                    variant="outline-danger"
                                >
                                    Cancel
                                </Button>

                                <Button
                                    type="submit"
                                    className="w-25 course__submit"
                                >
                                    Create
                                </Button>
                            </div>
                        </Form>
                    </Modal.Body>
                </Modal>
            </>
        );
    } else {
        return <div></div>;
    }
};

export default CreateCourse;
