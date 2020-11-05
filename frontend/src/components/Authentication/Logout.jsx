import React, { useContext } from "react";
import { Nav } from "react-bootstrap";
import { AuthenticationContext } from "../../contexts/AuthenticationContext";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Logout = () => {
    const { isAuthenticated, handleLogOut } = useContext(AuthenticationContext);

    return (
        <>
            {isAuthenticated ? (
                <Nav.Link onClick={handleLogOut} className="text-syntax">
                    <FontAwesomeIcon
                        className="mr-sm-1"
                        icon={["fas", "sign-out-alt"]}
                    />
                    <span
                        className="d-none d-sm-inline"
                        style={{ fontSize: "0.95rem" }}
                    >
                        Sign out
                    </span>
                </Nav.Link>
            ) : (
                <Nav.Link as={NavLink} to="/login" className="text-syntax">
                    <FontAwesomeIcon
                        className="mr-sm-1"
                        icon={["fas", "sign-in-alt"]}
                    />
                    <span
                        className="d-none d-sm-inline"
                        style={{ fontSize: "0.95rem" }}
                    >
                        Sign in
                    </span>
                </Nav.Link>
            )}
        </>
    );
};

export default Logout;
