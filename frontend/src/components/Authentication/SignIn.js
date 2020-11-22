import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "./Sign.scss";
import { Link } from "react-router-dom";
import CustomAlert from "../generic/CustomAlert";

const axios = require("axios");

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      username: "",
      password: "",
    };
  }

  handle_change_signin = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState((prevstate) => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };

  handle_signin = (e, data) => {
    e.preventDefault();
    let endpoint = "/api/v1/accounts/login/";
    var obj = { username: data.username, password: data.password };
    let body = JSON.stringify(obj);
    console.log(body);
    let config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .post(endpoint, body, config)
      .then((json) => {
        localStorage.setItem('username',json.data.user.username);
        localStorage.setItem('status',json.data.user.status);
        localStorage.setItem('reg_no',json.data.user.reg_no);
        localStorage.setItem('email',json.data.user.email);
        localStorage.setItem('isAuthenticated',"authenticated");
        localStorage.setItem('user_id',json.data.user.pk);
        localStorage.setItem('dept_id',json.data.user.department);
        window.location.href = "/";
      })
      .catch((err) => {
        this.setState({
          errors: err.response.data
        },() => {console.log(this.state.errors)})
      });
  };

    componentWillUnmount() {
      this.setState({
        errors: {},
      },() => console.log(this.state.errors,'sdfghs'))
    }

  render() {
    return (
      <Modal
        className="sign"
        {...this.props}
        size="lg"
        animation={true}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton className="sign__header"></Modal.Header>
        <Modal.Body className="sign__body">
          <h2 className="text-center sign__heading">Sign In</h2>
          
          {Object.keys(this.state.errors).length !== 0 &&
          this.state.errors['password'] ? (
            <CustomAlert status={JSON.stringify('Password: ' + this.state.errors['password'])}/> // non_field_errors
          ) : 
          this.state.errors['non_field_errors'] ? (
            <CustomAlert status={JSON.stringify('Username: This field may not be blank')}/> // non_field_errors
          ) : 
          (
            <div></div>
          )
          }

          <Form onSubmit={(e) => this.handle_signin(e, this.state)}>
            <Form.Group controlId="signIn__email">
              {/* <Form.Label>Email address</Form.Label> */}
              <Form.Control
                type="text"
                placeholder="Username"
                name="username"
                onChange={this.handle_change_signin}
              />
            </Form.Group>

            <Form.Group controlId="password">
              {/* <Form.Label>Password</Form.Label> */}
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                onChange={this.handle_change_signin}
              />
            </Form.Group>
            <div className="text-center">
              <Button
                variant="btn-block"
                type="submit"
                className="sign__submit"
              >
                Submit
              </Button>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer className="sign__footer">
          <p className="forgot-password text-right">
            <Link to="/password/reset/">Forgot password?</Link>
          </p>
        </Modal.Footer>
      </Modal>
    );
  }
}
