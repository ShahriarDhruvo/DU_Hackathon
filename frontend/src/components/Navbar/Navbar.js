import React,{useContext,useEffect} from "react";
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
import { NavLink } from "react-router-dom";
import Logout from "../Authentication/Logout";
import {AuthenticationContext} from "../../contexts/AuthenticationContext"

const Navs = () => {

  

  const [signInShow, setSignInShow] = React.useState(false);
  const [signUpShow, setSignUpShow] = React.useState(false);
  const { handleLogOut } = useContext(AuthenticationContext);
  return (
    <Navbar bg="" variant="light" expand="lg" className="nav">
      <Navbar.Brand href="#home" className="nav__brand">
      <div>
          <img
            src={logo}
            width={"40"}
            height={"40"}
            className={"d-inline-block align-top"}
            className="nav__logo"
            alt={"logo"}
          />
          <span className="nav__heading">ClassPortal</span>
        </div>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Form inline>
            <InputGroup>
              <InputGroup.Prepend>
              <InputGroup.Text className="nav__src__form">
                  <FontAwesomeIcon icon="search" />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                className="nav__src__form"
                placeholder="Search Course"
                aria-label="search"
                aria-describedby="basic-addon1"
                type="search"
              />
            </InputGroup>
          </Form>
        </Nav>
        <Nav className="ml-auto">
          {!localStorage.getItem('isAuthenticated') ? 
          (
            <div>
              <Nav.Link>
                <button className="nav__btn__sign" onClick={() => setSignInShow(true)}>
                  Sign In
                </button>
              </Nav.Link>

              <Nav.Link>
                <Button className="nav__btn__sign" onClick={() => setSignUpShow(true)}>
                  Sign Up
                </Button>
              </Nav.Link>
            </div>
          ):(
            <div>
              <Nav.Link>
                <Button className="nav__btn__sign" onClick={() => handleLogOut()}>
                  Logout
                </Button>
              </Nav.Link>
              <Nav.Link as={NavLink} to="/profile/" className="nav__btn__sign">
              {/* Don't use button here, change the style of the btn__sign class according to your needs
              It'll fix most of the issues you have with buttons */}
              {/* <Button className="btn__sign" as={Link} to="/profile/"> */}
                Profile
              {/* </Button> */}
            </Nav.Link>
            <Nav.Link as={NavLink} to="/rooms/1/" className="nav__btn__sign">
              {/* This is here temporarirly we will move it to the correct position later */}
              Rooms
            </Nav.Link>
          </div>
          )}

          

          
        </Nav>
      </Navbar.Collapse>
      <SignIn show={signInShow} onHide={() => setSignInShow(false)} />
      <SignUp show={signUpShow} onHide={() => setSignUpShow(false)} />
    </Navbar>
  );
};

export default Navs;
