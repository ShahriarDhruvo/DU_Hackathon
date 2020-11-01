import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../assets/logo.png";
import SignIn from "../Authentication/SignIn";
import SignUp from "../Authentication/SignUp";
import "./Navbar.scss";
import { Link } from "react-router-dom";

const Navs = () => {
  const [signInShow, setSignInShow] = React.useState(false);
  const [signUpShow, setSignUpShow] = React.useState(false);
  return (
    <Navbar bg="outline-primary" expand="lg" className="nav">
      <Navbar.Brand href="#home">
        <div>
          <img
            src={logo}
            width={"40"}
            height={"40"}
            className={"d-inline-block align-top"}
            alt={"logo"}
          />
        </div>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Form inline>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text className="src__form">
                  <FontAwesomeIcon icon="search" />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                className="src__form"
                placeholder="Search Course"
                aria-label="search"
                aria-describedby="basic-addon1"
                type="search"
              />
            </InputGroup>
          </Form>
        </Nav>
        <Nav className="ml-auto">
          <Nav.Link>
            <Button className="btn__sign" onClick={() => setSignInShow(true)}>
              Sign In
            </Button>
          </Nav.Link>
          <Nav.Link>
            <Button className="btn__sign" onClick={() => setSignUpShow(true)}>
              Sign Up
            </Button>
          </Nav.Link>
          <Nav.Link>
            <Button className="btn__sign" as={Link} to="/profile/">
              Profile
            </Button>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <SignIn show={signInShow} onHide={() => setSignInShow(false)} />
      <SignUp show={signUpShow} onHide={() => setSignUpShow(false)} />
    </Navbar>
  );
};

export default Navs;
