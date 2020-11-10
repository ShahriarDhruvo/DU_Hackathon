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
      // console.log(response.data);
      for (var i = 0; i < response.data.length; i++) {
        tmparray.push(response.data[i]);
      }
      /*console.log(tmparray)*/
      this.setState({
        dept: tmparray,
        department: tmparray[0].id,
      });
      /*console.log(this.state)*/
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
      /*console.log(tmparray)*/
      this.setState({
        varsity: tmparray,
        university: tmparray[0].id,
      });
      /*console.log(this.state)*/
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
        /* password1: "balchalabal",
        password2: "balchalabal",
        department: 1,
        university: 1,
        reg_no: 200,
        status: 2,*/
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
    // console.log(body);
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
        // console.log(response.data, "SED");
        this.setState({
          promise: false,
        });
        /*const {history} = this.props;*/
        /*history.push(`/email/confirmation/sent`)
          this.props.history.push(`/email/contirmation/sent/${this.state.email}`);*/
        this.props.history.push(`/email/confirmation/sent/${this.state.email}/`);
        /*console.log(json.data.token)
          localStorage.setItem('token', json.data.token);
          this.setState({
              username: json.data.user.username,
          });*/
      })
      .catch((err) => {
        this.setState({
          errors: err.response.data,
          promise: false,
        });
      });
  };

  handle_change_signin = (e) => {
    /*console.log(this.state)*/
    const name = e.target.name;
    const value = e.target.value;
    this.setState((prevstate) => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
    // console.log(this.state);
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
      <div>
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
              {/* <Container fluid>
            <Row>
              <Col sm={3}>
                <h1 className="text-center">Welcome</h1>
              </Col>
              <Col sm={9}> */}
              <h2 className="text-center sign__heading">Sign Up</h2>
              {/* <Form onChange={this.toggleForm}> */}

              {Object.keys(this.state.errors).length !== 0 && (
                <CustomAlert status={JSON.stringify(this.state.errors)} />
              )}

              <Form
                className="sign__form"
                onSubmit={(e) => this.handle_signup(e, this.state)}
              >
                <Form.Group
                  controlId="exampleForm.ControlSelect1"
                  onChange={this.toggleForm}
                >
                  {/* <Form.Label>Select Occupation</Form.Label> */}
                  <Form.Control as="select">
                    <option value="null">Select Role</option>
                    <option value="2">Student</option>
                    <option value="1">Teacher</option>
                    <option value="0">Admin</option>
                  </Form.Control>
                </Form.Group>
                <Form.Row>
                  {this.state.status === "2" ? (
                    /*                   <Form>
                  <label>Name</label>
                  <InputGroup controlId="signUp__userId">
                    <InputGroup.Prepend>
                      <InputGroup.Text style={{backgroundColor: "transparent"}} id="basic-addon1">
                        <FontAwesomeIcon icon="user-circle"/>
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl type="" placeholder="Name"/>
                  </InputGroup>
                  </Form> */
                    <Form.Group as={Col} controlId="signUp__userId">
                      {/* <Form.Label>Name</Form.Label> */}
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
                      {/* <Form.Label>Registration No</Form.Label> */}
                      <Form.Control
                        type="number"
                        placeholder="Registration No"
                        name="reg_no"
                        onChange={this.handle_change_signin}
                      />
                    </Form.Group>
                  ) : (
                    <Form.Group as={Col} controlId="signUp__userId">
                      {/* <Form.Label>User Name</Form.Label> */}
                      <Form.Control
                        type="text"
                        placeholder="User Name"
                        name="username"
                        onChange={this.handle_change_signin}
                      />
                    </Form.Group>
                  )}
                </Form.Row>
                {/*<Form>*/}
                <Form.Row>
                  <Form.Group as={Col} controlId="university">
                    {/* <Form.Label>University</Form.Label> */}
                    <Form.Control
                      as="select"
                      type="number"
                      onChange={this.handle_change_uni}
                    >
                      {/*<option value="null">Select University</option>
                    <option value="sust">SUST</option>
                    <option value="du">DU</option>
                    */}
                      {varsitylist}
                    </Form.Control>
                  </Form.Group>
                  <Form.Group as={Col} controlId="department">
                    {/* <Form.Label>Department</Form.Label> */}
                    <Form.Control
                      as="select"
                      onChange={this.handle_change_dept}
                    >
                      {/*<option value="null">Select Department</option>
                    <option value="swe">SWE</option>
                    <option value="cse">EEE</option>*/}
                      {departmentlist}
                    </Form.Control>
                  </Form.Group>
                </Form.Row>
                <Form.Group controlId="signUp__email">
                  {/* <Form.Label>Email address</Form.Label> */}
                  <Form.Control
                    type="email"
                    placeholder="Email Address"
                    name="email"
                    onChange={this.handle_change_signin}
                  />
                </Form.Group>
                <Form.Row>
                  <Form.Group as={Col} controlId="password">
                    {/* <Form.Label>Password</Form.Label> */}
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      name="password1"
                      onChange={this.handle_change_signin}
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="confirm_password">
                    {/* <Form.Label>Confirm Password</Form.Label> */}
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
                {/*</Form>*/}
              </Form>
              {/* </Col>
            </Row>
          </Container> */}
            </Modal.Body>
            <Modal.Footer className="sign__footer"></Modal.Footer>
          </Modal>
        )}
      </div>
    );
  }
}

export default withRouter(SignUp);
