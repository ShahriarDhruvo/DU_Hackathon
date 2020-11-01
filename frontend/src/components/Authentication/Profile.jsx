import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import CustomAlert from "../generic/CustomAlert";

const Profile = () => {
    const [user, setUser] = useState({});
    const [status, setStatus] = useState(undefined);

    //   const { handleLogOut } = useContext(AuthenticationContext);

    useEffect(() => {
        const userStatus = {
            0: "Admin",
            1: "Teacher",
            2: "Student",
        };

        const loadData = async () => {
            //
            // Getting User Details
            //
            let API_URL = "/api/v1/accounts/user/";
            let response = await fetch(API_URL, {
                method: "GET",
            });
            // if (response.status === 401) handleLogOut();

            const userData = await response.json();
            if (!response.ok) setStatus(userData.detail);

            //
            // Getting University Details
            //
            API_URL = "/api/v1/university/details/";
            response = await fetch(API_URL, {
                method: "GET",
            });

            const universityData = await response.json();
            if (!response.ok) setStatus(universityData.detail);
            const university = universityData.find(
                (university) => university.id === userData.university
            ).name;

            //
            // Getting Department Details
            //
            API_URL = `/api/v1/university/departments/details/${userData.department}/`;
            response = await fetch(API_URL, {
                method: "GET",
            });

            const departmentData = await response.json();
            if (!response.ok) setStatus(departmentData.detail);
            else
                setUser({
                    ...userData,
                    university,
                    department: departmentData[0].name,
                    status: userStatus[userData.status],
                });
        };

        loadData();
    }, []);

    return (
        <Container className="vertical-center">
            {status ? (
                <CustomAlert status={status} />
            ) : (
                <div
                    className="ccard p-3 p-sm-4 text-center w-100 bg-main-bg"
                    style={{ maxWidth: "28rem" }}
                >
                    <img
                        src="/static/img/profile_pic.png"
                        // onError={(e) => {
                        //     e.target.onerror = null;
                        //     e.target.src = "/img/Default.png";
                        // }}
                        alt="profile"
                        style={{ maxWidth: "10rem" }}
                    />

                    <div className="mb-3">
                        <b>Username: </b>
                        {user.username}
                        <br />

                        <b>Department: </b>
                        {user.department}
                        <br />

                        <b>Reg. No: </b>
                        {user.reg_no}
                        <br />

                        <b>Status: </b>
                        {user.status}
                        <br />

                        <b>University: </b>
                        {user.university}
                        <br />

                        <b>Email: </b>
                        {user.email}
                    </div>

                    <Link to="/password/change/">Change Password</Link>
                </div>
            )}
        </Container>
    );
};

export default Profile;
