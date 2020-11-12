import "./Sign.scss";
import { Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import CustomAlert from "../generic/CustomAlert";
// import { createHashHistory } from "history";
import LoadingScreen from "../generic/LoadingScreen";
import { withRouter } from "react-router-dom";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// export const history = createHashHistory();
const axios = require("axios");

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dept: [],
      varsity: [],
      status: null,
      email: "",
      password1: "",
      password2: "",
      university: null,
      department: null,
      reg_no: null,
      username: "",
      name: "",
      errors: {},
      promise: false,
    };
  }

  componentDidMount() {
    let endpoint = "api/v1/university/departments/list/";
    let endpoint1 = "api/v1/university/details/";
    let config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios.get(endpoint, config)
    .then((response) => {
      let tmparray = [];
      for (var i = 0; i < response.data.length; i++) {
        tmparray.push(response.data[i]);
      }
      this.setState({
        dept: tmparray,
        department: tmparray[0].id,
      });
    }).catch((err) => {
      this.setState({
        errors: err.response.data,
        promise: false,
      });
    });

    axios.get(endpoint1, config).then((response) => {
      let tmparray = [];
      for (var i = 0; i < response.data.length; i++) {
        tmparray.push(response.data[i]);
      }
      this.setState({
        varsity: tmparray,
        university: tmparray[0].id,
      });
    }).catch((err) => {
      this.setState({
        errors: err.response.data,
        promise: false,
      });
    });
  }

  handle_signup = (e, data) => {
    e.preventDefault();

    let endpoint = "api/v1/accounts/registration/";
    var obj;
    if (this.state.status === "2")
      obj = {
        username: data.name + "_" + data.reg_no,
        email: data.email,
        password1: data.password1,
        password2: data.password2,
        department: data.department,
        university: data.university,
        reg_no: data.reg_no,
        status: data.status,
      };
    else
      obj = {
        username: data.username,
        email: data.email,
        password1: data.password1,
        password2: data.password2,
        department: data.department,
        university: data.university,
        reg_no: null,
        status: data.status,
      };
    let body = JSON.stringify(obj);
    let config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    this.setState({
      promise: true,
    });
    axios
      .post(endpoint, body, config)
      .then((response) => {
        this.setState({
          promise: false,
        });
        this.props.history.push(`/email/confirmation/sent/${this.state.email}/`);
      })
      .catch((err) => {
        this.setState({
          errors: err.response.data,
          promise: false,
        });
      });
  };

  handle_change_signin = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState((prevstate) => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };

  toggleForm = (e) => {
    this.setState((prevstate) => {
      const newState = { ...prevstate };
      newState["status"] = e.target.value;
      return newState;
    });
  };

  handle_change_uni = (e) => {
    this.setState((prevstate) => {
      const newState = { ...prevstate };
      newState["university"] = e.target.value;
      return newState;
    });
  };

  handle_change_dept = (e) => {
    this.setState((prevstate) => {
      const newState = { ...prevstate };
      newState["department"] = e.target.value;
      return newState;
    });
  };

  render() {
    const { dept } = this.state;
    const { varsity } = this.state;
    const { staticContext, ...rest } = this.props;

    let departmentlist =
      dept.length > 0 &&
      dept.map((item, i) => {
        return (
          <option key={i} value={item.id}>
            {item.name}
          </option>
        );
      });
    let varsitylist =
      varsity.length > 0 &&
      varsity.map((item, i) => {
        return (
          <option key={i} value={item.id}>
            {item.name}
          </option>
        );
      });
    return (
      <>
        {this.state.promise ? (
          <LoadingScreen />
        ) : (
          <Modal
            className="sign"
            {...rest}
            size="lg"
            animation={true}
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton className="sign__header"></Modal.Header>
            <Modal.Body className="sign__body">
              <h2 className="text-center sign__heading">Sign Up</h2>

              {Object.keys(this.state.errors).length !== 0 && (
                this.state.errors['status'] ? (
                  <CustomAlert status={JSON.stringify('Select Role: ' + this.state.errors['status'])} />
                ) :
                this.state.errors['username'] ? (
                  <CustomAlert status={JSON.stringify('Username: ' + this.state.errors['username'])} />
                ) : 
                this.state.errors['email'] ? (
                  <CustomAlert status={JSON.stringify('Email: ' + this.state.errors['email'])} />
                ) : 
                this.state.errors['password1'] ? (
                  <CustomAlert status={JSON.stringify('Password: ' + this.state.errors['password1'])} />
                ) : 
                this.state.errors['password2'] ? (
                  <CustomAlert status={JSON.stringify('Confirm Password: ' + this.state.errors['password2'])} />
                ) : 
                 (
                  <CustomAlert status={JSON.stringify('Already there are account with these credentials')} />
                )
              )}

              <Form
                className="sign__form"
                onSubmit={(e) => this.handle_signup(e, this.state)}
              >
                <Form.Group
                  controlId="exampleForm.ControlSelect1"
                  onChange={this.toggleForm}
                >
                  <Form.Control as="select">
                    <option value="null">Select Role</option>
                    <option value="2">Student</option>
                    <option value="1">Teacher</option>
                    <option value="0">Admin</option>
                  </Form.Control>
                </Form.Group>
                <Form.Row>
                  {this.state.status === "2" ? (
                    <Form.Group as={Col} controlId="signUp__userId">
                      <Form.Control
                        type="text"
                        placeholder="Name"
                        name="name"
                        onChange={this.handle_change_signin}
                      />
                    </Form.Group>
                  ) : null}
                  {this.state.status === "2" ? (
                    <Form.Group as={Col} controlId="regNo">
                      <Form.Control
                        type="number"
                        placeholder="Registration No"
                        name="reg_no"
                        onChange={this.handle_change_signin}
                      />
                    </Form.Group>
                  ) : (
                    <Form.Group as={Col} controlId="signUp__userId">
                      <Form.Control
                        type="text"
                        placeholder="User Name"
                        name="username"
                        onChange={this.handle_change_signin}
                      />
                    </Form.Group>
                  )}
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} controlId="university">
                    <Form.Control
                      as="select"
                      type="number"
                      onChange={this.handle_change_uni}
                    >
                      {varsitylist}
                    </Form.Control>
                  </Form.Group>
                  <Form.Group as={Col} controlId="department">
                    <Form.Control
                      as="select"
                      onChange={this.handle_change_dept}
                    >
                      {departmentlist}
                    </Form.Control>
                  </Form.Group>
                </Form.Row>
                <Form.Group controlId="signUp__email">
                  <Form.Control
                    type="email"
                    placeholder="Email Address"
                    name="email"
                    onChange={this.handle_change_signin}
                  />
                </Form.Group>
                <Form.Row>
                  <Form.Group as={Col} controlId="password">
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      name="password1"
                      onChange={this.handle_change_signin}
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="confirm_password">
                    <Form.Control
                      type="password"
                      placeholder="Confirm Password"
                      name="password2"
                      onChange={this.handle_change_signin}
                    />
                  </Form.Group>
                </Form.Row>
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
            <Modal.Footer className="sign__footer"></Modal.Footer>
          </Modal>
        )}
      </>
    );
  }
}

export default withRouter(SignUp);
