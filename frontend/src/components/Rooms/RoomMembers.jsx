import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import CustomAlert from "../generic/CustomAlert";
import CustomModal from "../generic/CustomModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RoomMembers = (props) => {
    const [status, setStatus] = useState(undefined);
    const [flag, setFlag] = useState(Math.random());
    const [members, setMembers] = useState({
        owner: "",
        class_representatives: [],
        teachers: [],
        students: [],
    });
    const [isCR, setIsCR] = useState(false);
    const [pendingUsers, setPendingUsers] = useState([]);

    useEffect(() => {
        let API_URL = `/api/v1/rooms/members/${props.room_pk}/`;

        const loadData = async () => {
            let response = await fetch(API_URL, {
                method: "GET",
            });

            let data = await response.json();

            if (!response.ok) setStatus(data.detail);
            else setMembers(data[0]);

            // Check isCR
            API_URL = `/api/v1/rooms/check_CR/${props.room_pk}/`;

            response = await fetch(API_URL, {
                method: "GET",
            });

            response.ok && setIsCR(true);
        };

        loadData();
    }, [props.room_pk, flag]);

    // Pending user's list
    useEffect(() => {
        const loadData = async () => {
            const API_URL = `/api/v1/rooms/pending_requests/${props.room_pk}/list/`;

            const response = await fetch(API_URL, {
                method: "GET",
            });

            const data = await response.json();

            if (
                !response.ok &&
                response.status !== 404 &&
                localStorage.getItem("status") !== "2"
            )
                setStatus(data.detail);
            else setPendingUsers(data);
        };

        if (localStorage.getItem("status") !== "2" || isCR || flag) loadData();
    }, [isCR, flag, props.room_pk]);

    const updateFlag = () => setFlag(Math.random());

    const handleAddPendingUser = (pending_request_pk, username, userstatus) => {
        // Deleting from pending users list
        const loadData = async () => {
            let API_URL = `/api/v1/rooms/pending_requests/${props.room_pk}/delete/${pending_request_pk}/`;
            let response = await fetch(API_URL, {
                method: "DELETE",
            });

            if (!response.ok) {
                let data = await response.json();
                setStatus(data.detail);
            }
        };

        const loadAddMemberData = async () => {
            let API_URL = `/api/v1/rooms/add/${props.room_pk}/${userstatus}/${username}/`;

            let response = await fetch(API_URL, {
                method: "PATCH",
            });

            let data = await response.json();
            if (!response.ok) setStatus(data.detail);
        };

        loadAddMemberData();
        loadData();
        updateFlag();
    };

    const handleRemovePendingUser = (pending_request_pk) => {
        const API_URL = `/api/v1/rooms/pending_requests/${props.room_pk}/delete/${pending_request_pk}/`;

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
        updateFlag();
    };

    const handleAddMember = (username, userstatus) => {
        let API_URL = `/api/v1/rooms/add/${props.room_pk}/${userstatus}/${username}/`;

        const loadData = async () => {
            let response = await fetch(API_URL, {
                method: "PATCH",
            });

            if (!response.ok) {
                const data = await response.json();
                setStatus(data.detail);
            }
        };

        loadData();
        updateFlag();
    };

    const handleRemoveMember = (username, userstatus) => {
        const API_URL = `/api/v1/rooms/remove/${props.room_pk}/${userstatus}/${username}/`;

        const loadData = async () => {
            const response = await fetch(API_URL, {
                method: "PATCH",
            });

            if (!response.ok) {
                const data = await response.json();
                setStatus(data.detail);
            }
        };

        loadData();
        updateFlag();
    };

    const handleCloseAction = () => setStatus(undefined);

    return (
        <div>
            {status && (
                <CustomModal
                    show={true}
                    noAction={true}
                    modalTitle="Error"
                    handleCloseAction={handleCloseAction}
                    modalBody={<CustomAlert variant="info" status={status} />}
                />
            )}

            <div className="rounded card-header text-primary members__header">
                <FontAwesomeIcon className="mr-2" icon={["fas", "users"]} />
                Room's Members
            </div>

            <div className="card-header mb-3 border-top border-main members__header">
                <FontAwesomeIcon className="mr-2" icon={["fas", "crown"]} />
                Owner
            </div>

            <Card className="mx-3">
                <Card.Body className="p-2">{members.owner}</Card.Body>
            </Card>

            <div className="card-header my-3 border-top border-main members__header">
                <FontAwesomeIcon
                    className="mr-2"
                    icon={["fas", "chalkboard-teacher"]}
                />
                Teachers
            </div>

            <div className="mx-3">
                {members.teachers.map((teacher) => (
                    <Card key={teacher} className="my-2">
                        <Card.Body className="p-2">
                            {teacher}

                            <div className="mt-2">
                                {localStorage.getItem("status") !== "2" && (
                                    <CustomModal
                                        actionVariant="danger"
                                        modalTitle="Remove Member"
                                        handleAction={() =>
                                            handleRemoveMember(
                                                teacher,
                                                "teacher"
                                            )
                                        }
                                        actionButtonClass="btn btn-outline-danger btn-sm"
                                        modalBody={`Do you really want to remove ${teacher} from this room?`}
                                    >
                                        <FontAwesomeIcon
                                            icon={["fas", "user-slash"]}
                                        />
                                    </CustomModal>
                                )}
                            </div>
                        </Card.Body>
                    </Card>
                ))}
            </div>

            {members.class_representatives.length !== 0 && (
                <>
                    <div className="card-header my-3 border-top border-main members__header">
                        <FontAwesomeIcon
                            className="mr-2"
                            icon={["fas", "user-shield"]}
                        />
                        Class Representatives
                    </div>

                    <div className="mx-3">
                        {members.class_representatives.map(
                            (class_representative) => (
                                <Card
                                    key={class_representative}
                                    className="my-2"
                                >
                                    <Card.Body className="p-2">
                                        {class_representative}

                                        <div className="mt-2">
                                            {localStorage.getItem("status") !==
                                                "2" && (
                                                <CustomModal
                                                    actionVariant="danger"
                                                    modalTitle="Remove CR"
                                                    handleAction={() =>
                                                        handleRemoveMember(
                                                            class_representative,
                                                            "class_representative"
                                                        )
                                                    }
                                                    actionButtonClass="btn btn-outline-danger btn-sm mr-2"
                                                    modalBody={`Do you want to remove ${class_representative} from Class Representative's list?`}
                                                >
                                                    RCR
                                                </CustomModal>
                                            )}

                                            {localStorage.getItem("status") !==
                                                "2" && (
                                                <CustomModal
                                                    actionVariant="danger"
                                                    modalTitle="Remove Member"
                                                    handleAction={() =>
                                                        handleRemoveMember(
                                                            class_representative,
                                                            "class_representative"
                                                        )
                                                    }
                                                    actionButtonClass="btn btn-outline-danger btn-sm"
                                                    modalBody={`Do you really want to remove ${class_representative} from this room?`}
                                                >
                                                    <FontAwesomeIcon
                                                        icon={[
                                                            "fas",
                                                            "user-slash",
                                                        ]}
                                                    />
                                                </CustomModal>
                                            )}
                                        </div>
                                    </Card.Body>
                                </Card>
                            )
                        )}
                    </div>
                </>
            )}

            {members.students.length !== 0 && (
                <>
                    <div className="card-header my-3 border-top border-main members__header">
                        <FontAwesomeIcon
                            className="mr-2"
                            icon={["fas", "user-graduate"]}
                        />
                        Students
                    </div>

                    <div className="mx-3">
                        {members.students.map((student) => (
                            <Card key={student} className="my-2">
                                <Card.Body className="p-2">
                                    {student}

                                    <div className="mt-2">
                                        {localStorage.getItem("status") !==
                                            "2" && (
                                            <CustomModal
                                                actionVariant="info"
                                                modalTitle="Add CR"
                                                handleAction={() =>
                                                    handleAddMember(
                                                        student,
                                                        "class_representative"
                                                    )
                                                }
                                                actionButtonClass="btn btn-outline-info btn-sm mr-2"
                                                modalBody={`Do you want to add ${student} as a Class Representative of this room?`}
                                            >
                                                CR
                                            </CustomModal>
                                        )}

                                        {(localStorage.getItem("status") !==
                                            "2" ||
                                            isCR) && (
                                            <CustomModal
                                                actionVariant="danger"
                                                modalTitle="Remove Member"
                                                handleAction={() =>
                                                    handleRemoveMember(
                                                        student,
                                                        "student"
                                                    )
                                                }
                                                actionButtonClass="btn btn-outline-danger btn-sm"
                                                modalBody={`Do you really want to remove ${student} from this room?`}
                                            >
                                                <FontAwesomeIcon
                                                    icon={["fas", "user-slash"]}
                                                />
                                            </CustomModal>
                                        )}
                                    </div>
                                </Card.Body>
                            </Card>
                        ))}
                    </div>
                </>
            )}

            {!pendingUsers.detail &&
                pendingUsers.length !== 0 &&
                (localStorage.getItem("status") !== "2" || isCR) && (
                    <>
                        <div className="card-header my-3 border-top border-main members__header">
                            <FontAwesomeIcon
                                className="mr-2"
                                icon={["fas", "users-cog"]}
                            />
                            Pending Requests
                        </div>

                        <div className="mx-3">
                            {!pendingUsers.detail &&
                                pendingUsers.map((pendingUser) => (
                                    <Card key={pendingUser.id} className="my-2">
                                        <Card.Body className="p-2">
                                            {pendingUser.user}

                                            <div className="mt-2">
                                                {(localStorage.getItem(
                                                    "status"
                                                ) !== "2" ||
                                                    isCR) && (
                                                    <CustomModal
                                                        modalTitle="Accept Request"
                                                        actionVariant="success"
                                                        handleAction={() =>
                                                            handleAddPendingUser(
                                                                pendingUser.id,
                                                                pendingUser.user,
                                                                pendingUser.user_status
                                                            )
                                                        }
                                                        actionButtonClass="btn btn-outline-success btn-sm mr-2"
                                                        modalBody={`Do you want to accept ${pendingUser.user}'s request?`}
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={[
                                                                "fas",
                                                                "user-check",
                                                            ]}
                                                        />
                                                    </CustomModal>
                                                )}

                                                {(localStorage.getItem(
                                                    "status"
                                                ) !== "2" ||
                                                    isCR) && (
                                                    <CustomModal
                                                        modalTitle="Reject Request"
                                                        actionVariant="danger"
                                                        handleAction={() =>
                                                            handleRemovePendingUser(
                                                                pendingUser.id
                                                            )
                                                        }
                                                        actionButtonClass="btn btn-outline-danger btn-sm"
                                                        modalBody={`Do you really want to reject ${pendingUser.user}'s request?`}
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={[
                                                                "fas",
                                                                "user-times",
                                                            ]}
                                                        />
                                                    </CustomModal>
                                                )}
                                            </div>
                                        </Card.Body>
                                    </Card>
                                ))}
                        </div>
                    </>
                )}
        </div>
    );
};

export default RoomMembers;
