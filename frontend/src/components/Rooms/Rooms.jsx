import React, { useEffect, useContext, useState } from "react";
import Sections from "./Sections/Sections";
import RoomMembers from "./RoomMembers";
import RoomMembersModal from "./RoomMembersModal";
import { Col, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AuthenticationContext } from "../../contexts/AuthenticationContext";
import { useParams } from "react-router-dom";
import CustomAlert from "../generic/CustomAlert";

const Rooms = () => {
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

            let data = await response.json();

            // let room_members = [];
            // room_members.push(...data[0].students);
            // room_members.push(...data[0].teachers);

            // console.log(data[0]);

            if (!response.ok) setStatus(data.detail);
            else setRoom(data[0]);
        };

        loadData();
    }, [params.room_pk, handleLogOut]);

    return (
        <Container>
            <div className="mb-3">
                <h3>
                    {room.course} ({room.year})
                    <br />
                    {room.group && `Group: ${room.group}`}
                </h3>

                <RoomMembersModal
                    actionButtonSize="sm"
                    room_pk={params.room_pk}
                    variant="outline-primary"
                    actionButtonClass="d-md-none ml-2"
                >
                    <FontAwesomeIcon icon={["fas", "users"]} className="mr-2" />
                    Show Member's List
                </RoomMembersModal>
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
