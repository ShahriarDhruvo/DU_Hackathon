import React, { useEffect, useState, useContext } from "react";
import { Container, Row } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import CustomAlert from "../generic/CustomAlert";
import { AuthenticationContext } from "../../contexts/AuthenticationContext";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Profile = () => {
    const [user, setUser] = useState({});
    const [status, setStatus] = useState(undefined);

    const { handleLogOut } = useContext(AuthenticationContext);

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
            if (response.status === 401) handleLogOut();

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
    }, [handleLogOut]);

    return (
      <Container fluid>
        {status ? (
          <CustomAlert status={status} />
        ) : (
          <div>
            <div className="mb-3 container profile">
              <h2>
                <FontAwesomeIcon className="fa-icon" icon={["fas", "user"]} />{" "}
                {user.username} {"  "}
                <small className="profile_status">
                  ({user.status})
                </small>
              </h2>
              <br />
              <h3>Account</h3>
              <hr></hr>

              <Row>
                <Col>
                  <h6>
                    <FontAwesomeIcon
                      className="fa-icon"
                      icon={["fas", "university"]}
                    />{" "}
                    University:{" "}
                  </h6>
                </Col>
                <Col>
                  <Form.Control
                    type="text"
                    placeholder={user.university}
                    readOnly
                  />
                </Col>
              </Row>
              <br />
              <Row>
                <Col>
                  <h6>
                    <FontAwesomeIcon
                      className="fa-icon"
                      icon={["fas", "building"]}
                    />{" "}
                    Department:{" "}
                  </h6>
                </Col>
                <Col>
                  <Form.Control
                    type="text"
                    placeholder={user.department}
                    readOnly
                  />
                </Col>
              </Row>
              <br />
              <Row>
                <Col>
                  <h6>
                    <FontAwesomeIcon
                      className="fa-icon"
                      icon={["fas", "id-card"]}
                    />{" "}
                    Reg. No:{" "}
                  </h6>
                </Col>
                <Col>
                  <Form.Control
                    type="text"
                    placeholder={user.reg_no}
                    readOnly
                  />
                </Col>
              </Row>
              <br />
              <Row>
                <Col>
                  <h6>
                    <FontAwesomeIcon
                      className="fa-icon"
                      icon={["fas", "envelope"]}
                    />{" "}
                    Email:{" "}
                  </h6>
                </Col>
                <Col>
                  <Form.Control type="text" placeholder={user.email} readOnly />
                </Col>
              </Row>
              <br />
              <Link to="/password/change/">Change Password</Link>
            </div>
          </div>
        )}
      </Container>
    );
};

export default Profile;
