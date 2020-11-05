import React from "react";
import Sections from "./Sections";
import RoomMembers from "./RoomMembers";
import RoomMembersModal from "./RoomMembersModal";
import { Button, Col, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Rooms = () => {
    return (
        <Container fluid>
            <div className="mb-3">
                <h3>Room SWE121</h3>
                <Button size="sm" variant="outline-primary">
                    Add New Section
                </Button>

                <RoomMembersModal
                    actionButtonSize="sm"
                    variant="outline-primary"
                    actionButtonClass="d-md-none ml-2"
                >
                    <FontAwesomeIcon icon={["fas", "users"]} className="mr-2" />
                    Show Member's List
                </RoomMembersModal>
            </div>

            <Row>
                <Col md={3} className="d-none d-md-block border px-0">
                    <RoomMembers />
                </Col>
                <Col md={9} className="border px-0">
                    <Sections />
                </Col>
            </Row>
        </Container>
    );
};

export default Rooms;
