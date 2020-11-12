import React, { useEffect, useContext, useState } from "react";
import Sections from "./Sections/Sections";
import RoomMembers from "./RoomMembers";
import RoomMembersModal from "./RoomMembersModal";
import { Col, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AuthenticationContext } from "../../contexts/AuthenticationContext";
import { useParams } from "react-router-dom";
import CustomAlert from "../generic/CustomAlert";
import UpdateRoomModal from "./UpdateRoomModal";
import CustomModal from "../generic/CustomModal";

const Rooms = (props) => {
    const [room, setRoom] = useState({});
    const [status, setStatus] = useState(undefined);
    const { handleLogOut } = useContext(AuthenticationContext);

    const params = useParams();

    useEffect(() => {
        const API_URL = `/api/v1/rooms/details/${params.room_pk}/`;

        const loadData = async () => {
            let response = await fetch(API_URL, {
                method: "GET",
            });

            if (response.status === 401) handleLogOut();
            else if (response.status === 406) props.history.push("/");

            let data = await response.json();

            if (!response.ok) setStatus(data.detail);
            else {
                setRoom({
                    ...data[0],
                    course_title: data[0].course.split(", ")[0],
                    course_details: data[0].course.split(", ")[1],
                });
            }
        };

        loadData();
    }, [params.room_pk, handleLogOut]);

    const handleDelete = () => {
        const API_URL = `/api/v1/rooms/delete/${params.room_pk}/`;

        const loadData = async () => {
            const response = await fetch(API_URL, {
                method: "DELETE",
            });

            if (!response.ok) {
                const data = await response.json();
                setStatus(data.detail);
            }
        };

        loadData();
    };

    return (
        <Container>
            <div className="mb-2 text-center ">
                <h4 className="my-4">
                    {room.course_title} ({room.year})
                    <br />
                    {room.course_details}
                    <br />
                    {room.group && `Group: ${room.group}`}
                </h4>
            </div>

            <div className="mb-3 d-flex flex-column flex-md-row justify-content-around">
                <RoomMembersModal
                    actionButtonSize="sm"
                    room_pk={params.room_pk}
                    variant="outline-primary"
                    actionButtonClass="d-md-none mb-2"
                >
                    <FontAwesomeIcon icon={["fas", "users"]} className="mr-2" />
                    Show Member's List
                </RoomMembersModal>

                <UpdateRoomModal
                    year={room.year}
                    group={room.group}
                    modalTitle="Update"
                    actionVariant="primary"
                    room_pk={params.room_pk}
                    actionButtonClass="btn btn-outline-success btn-sm mb-2"
                >
                    <FontAwesomeIcon
                        icon={["fas", "wrench"]}
                        className="mr-2"
                    />
                    Update this Room
                </UpdateRoomModal>

                <CustomModal
                    modalTitle="Delete"
                    actionVariant="danger"
                    handleAction={handleDelete}
                    actionButtonClass="btn btn-outline-danger btn-sm mb-2"
                    modalBody={`Do you really want to delete this Room? P.S: This action cannot be undone`}
                >
                    <FontAwesomeIcon
                        className="mr-2"
                        icon={["fa", "trash-alt"]}
                    />
                    Delete this Room
                </CustomModal>
            </div>

            {status && <CustomAlert variant="warning" status={status} />}

            <Row>
                <Col md={3} className="d-none d-md-block border px-0">
                    <RoomMembers room_pk={params.room_pk} />
                </Col>
                <Col md={9} className="border px-0">
                    <Sections room_pk={params.room_pk} />
                </Col>
            </Row>
        </Container>
    );
};

export default Rooms;
