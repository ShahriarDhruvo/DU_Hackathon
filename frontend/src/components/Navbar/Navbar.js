import React, { useContext } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SignIn from "../Authentication/SignIn";
import SignUp from "../Authentication/SignUp";
import "./Navbar.scss";
import { NavLink } from "react-router-dom";
import "../Authentication/Logout";
import { AuthenticationContext } from "../../contexts/AuthenticationContext";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import Notifications from "../Notifications/Notifications";
import { SettingsContext } from "../../contexts/SettingsContext";

const Navs = () => {
    const { isAnimated } = useContext(SettingsContext);
    const [signInShow, setSignInShow] = React.useState(false);
    const [signUpShow, setSignUpShow] = React.useState(false);
    const { handleLogOut } = useContext(AuthenticationContext);

    return (
        <Navbar bg="" variant="light" className="nav">
            <Navbar.Brand as={Link} to="/" className="nav__brand">
                <img
                    src={"/static/img/logo.png"}
                    width={"40"}
                    height={"40"}
                    className={"d-inline-block align-top"}
                    alt={"logo"}
                />
                <span className="nav__heading">ClassPortal</span>
            </Navbar.Brand>

            {!localStorage.getItem("isAuthenticated") ? (
                <Nav className="ml-auto">
                    <Nav.Link>
                        <button
                            className="nav__btn__sign btn__none"
                            onClick={() => setSignInShow(true)}
                        >
                            Sign In
                        </button>
                    </Nav.Link>

                    <Nav.Link>
                        <button
                            className="nav__btn__sign btn__none"
                            onClick={() => setSignUpShow(true)}
                        >
                            Sign Up
                        </button>
                    </Nav.Link>
                </Nav>
            ) : (
                <Nav className="ml-auto">
                    {/* Unity simulation */}
                    {/* <Nav.Link>
                        <NavLink to="/simulation/" id="nav-dropdown">
                            <FontAwesomeIcon
                                style={{ fontSize: "1.09rem" }}
                                icon={["fab", "unity"]}
                            />
                            <span className="d-none d-md-inline font-weight-bold">
                                Simulations
                            </span>
                        </NavLink>
                    </Nav.Link> */}
                    {/* Unity simulation */}

                    <NavDropdown
                        id="nav-dropdown"
                        alignRight={true}
                        title={<FontAwesomeIcon icon={["fas", "search"]} />}
                    >
                        <Form inline className="nav__src__form">
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text className="nav__src__form__icon">
                                        <FontAwesomeIcon icon="search" />
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    placeholder="Search Course"
                                    aria-label="search"
                                    aria-describedby="basic-addon1"
                                    type="search"
                                />
                            </InputGroup>
                        </Form>
                    </NavDropdown>

                    <NavDropdown
                        id="nav-dropdown"
                        alignRight={true}
                        title={
                            <FontAwesomeIcon
                                className="fa-icon"
                                icon={["fas", "bell"]}
                            />
                        }
                        variant=""
                    >
                        <Notifications />
                    </NavDropdown>

                    <NavDropdown
                        id="nav-dropdown"
                        alignRight={true}
                        title={
                            <FontAwesomeIcon
                                className="fa-icon"
                                icon={["fas", "user"]}
                            />
                        }
                    >
                        <NavDropdown.Item
                            eventKey="1"
                            as={NavLink}
                            to="/profile/"
                        >
                            Profile
                        </NavDropdown.Item>
                        <NavDropdown.Item
                            eventKey="2"
                            as={NavLink}
                            to="/myrooms/"
                        >
                            My Rooms
                        </NavDropdown.Item>
                        <NavDropdown.Item
                            eventKey="3"
                            onClick={() => handleLogOut()}
                        >
                            Sign Out
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            )}
            <SignIn
                show={signInShow}
                animation={isAnimated}
                onHide={() => setSignInShow(false)}
            />
            <SignUp
                show={signUpShow}
                animation={isAnimated}
                onHide={() => setSignUpShow(false)}
            />
        </Navbar>
    );
};

export default Navs;
