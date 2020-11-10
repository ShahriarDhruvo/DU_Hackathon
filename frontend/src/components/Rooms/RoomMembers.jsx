import React, { useState, useEffect } from "react";
import CustomAlert from "../generic/CustomAlert";

const RoomMembers = (props) => {
    const [status, setStatus] = useState(undefined);
    const [members, setMembers] = useState({
        owner: "",
        class_representatives: [],
        teachers: [],
        students: [],
    });

    useEffect(() => {
        const API_URL = `/api/v1/rooms/members/${props.room_pk}/`;

        const loadData = async () => {
            let response = await fetch(API_URL, {
                method: "GET",
            });

            let data = await response.json();

            if (!response.ok) setStatus(data.detail);
            else setMembers(data[0]);
        };

        loadData();
    }, [props.room_pk]);

    return (
        <div className="text-center">
            {status && <CustomAlert variant="warning" status={status} />}

            <div className="card-header border-top members__header">
                Room's Members
            </div>

            <div className="card-header mb-3 border-top members__header">
                Owner
            </div>

            <div className="mx-3">{members.owner}</div>

            <div className="card-header my-3 border-top members__header">
                Teachers
            </div>

            <div className="mx-3">
                {members.teachers.map((teacher) => (
                    <div key={teacher} className="my-2">
                        {teacher}
                    </div>
                ))}
            </div>

            <div className="card-header my-3 border-top members__header">
                Class Representatives
            </div>

            <div className="mx-3">
                {members.class_representatives.map((class_representative) => (
                    <div key={class_representative} className="my-2">
                        {class_representative}
                    </div>
                ))}
            </div>

            <div className="card-header my-3 border-top members__header">
                Students
            </div>

            <div className="mx-3">
                {members.students.map((student) => (
                    <div key={student} className="my-2">
                        {student}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RoomMembers;
