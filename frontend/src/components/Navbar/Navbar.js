import React,{useContext,useEffect} from "react";
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
import {AuthenticationContext} from "../../contexts/AuthenticationContext";
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from "react-router-dom";

const Navs = () => {
  const [signInShow, setSignInShow] = React.useState(false);
  const [signUpShow, setSignUpShow] = React.useState(false);
  const { handleLogOut } = useContext(AuthenticationContext);
  return (
    <Navbar bg="" variant="light" className="nav">
      <Navbar.Brand href="#home" className="nav__brand">
        <div>
          <Link to={`/`}>
            <img
              src={"/static/img/logo.png"}
              width={"40"}
              height={"40"}
              className={"d-inline-block align-top"}
              className="nav__logo"
              alt={"logo"}
            />
          <span className="nav__heading">ClassPortal</span>
          </Link>
        </div>
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
          <NavDropdown
            alignRight={true}
            title={
              <FontAwesomeIcon className="fa-icon" icon={["fas", "search"]} />
            }
            variant=""
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
            alignRight={true}
            title={
              <FontAwesomeIcon className="fa-icon" icon={["fas", "bell"]} />
            }
            variant=""
          >
            <NavDropdown.Item
              eventKey="1"
              className="text-wrap"
              style={{ width: "16rem" }}
            >
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis,
              voluptatem voluptate consequuntur, velit aliquid inventore veniam
              a fuga et optio qui enim totam deleniti! Delectus iure non
              quibusdam at quo nihil quas repudiandae perspiciatis ab illum,
              quis nemo inventore repellendus dolorum possimus quisquam, iusto
              quam sunt eius animi sequi repellat veritatis facilis. Numquam
              dolorem, nam dolores iste eius harum earum recusandae! Quod itaque
              iure velit est reiciendis praesentium autem molestias fuga
              aliquam. Itaque consequatur voluptate porro ut neque blanditiis
              ex, quasi, eaque repellendus quaerat esse iure, eum odio qui
              laboriosam eveniet illum facilis facere id at? Placeat, vel
              pariatur. Quia?
            </NavDropdown.Item>
            <NavDropdown.Item eventKey="2">Action 2</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown
            alignRight={true}
            title={
              <FontAwesomeIcon className="fa-icon" icon={["fas", "user"]} />
            }
            variant=""
          >
            <NavDropdown.Item eventKey="1" as={NavLink} to="/profile/">
              Profile
            </NavDropdown.Item>
            <NavDropdown.Item eventKey="2" as={NavLink} to="/myrooms/">
              My Rooms
            </NavDropdown.Item>
            <NavDropdown.Item eventKey="3" onClick={() => handleLogOut()}>
              Sign Out
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      )}
      <SignIn show={signInShow} onHide={() => setSignInShow(false)} />
      <SignUp show={signUpShow} onHide={() => setSignUpShow(false)} /> 
    </Navbar>
  );
};

export default Navs;
