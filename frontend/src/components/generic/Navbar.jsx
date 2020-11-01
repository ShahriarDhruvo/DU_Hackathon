import React from "react";
import { Navbar, Nav } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { NavLink } from "react-router-dom";
import Logout from "../components/account/Logout";

const MainNav = () => {
    return (
        <Navbar>
            <Navbar.Brand className="clogo" as={NavLink} to="/">
                <img
                    alt="logo"
                    className="mr-1"
                    src="/static/favicon.ico"
                    style={{ width: "1.1rem", marginBottom: "0.4rem" }}
                />
                ToDo++
            </Navbar.Brand>

            <Navbar.Collapse>
                <Nav className="ml-auto">
                    <Nav.Link as={NavLink} to="/about" className="text-syntax">
                        About
                    </Nav.Link>

                    <Logout />

                    <Nav.Link as={NavLink} to="/profile">
                        <FontAwesomeIcon
                            icon={["fas", "user-tie"]}
                            style={{ fontSize: "1.1rem" }}
                            className="fa-icon text-syntax"
                        />
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default MainNav;
