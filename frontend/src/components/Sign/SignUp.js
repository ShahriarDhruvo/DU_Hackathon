import React,{ Component } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form';
import './Sign.css';

const axios = require('axios');
 
export default class SignUp extends Component {
  constructor(props) {
    super(props)

    this.state = {
      occupation: "student",
      email : '',
      password: '',
      password_confirm : '',
    }
  }

  handle_change_signin = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(prevstate => {
        const newState = {...prevstate};
        newState[name] = value;
        return newState;
    })
  }

  handle_signup = (e, data) => {
        e.preventDefault();
        let endpoint = "http://127.0.0.1:8000/";
        var obj;
        if(this.state.occupation==='student')
            obj = {occupation: data.occupation,email: data.email,password: data.password,confirm_password:data.password_confirm};
        else
            obj = {occupation: data.occupation,email: data.email,password: data.password,confirm_password:data.password_confirm}
        let body = JSON.stringify(obj);
        console.log(body)
        let config = {
        headers: {
            "Content-Type" : "application/json"
        }
        };
        axios.post(endpoint, body, config)
        .then(json => {
        /*console.log(json.data.token)
        localStorage.setItem('token', json.data.token);
        this.setState({
            username: json.data.user.username,
        });*/
        })
        .catch(err => {
        console.log(err)
        })
      
    };

    toggleForm = (e) => {
      this.setState(prevstate => {
        const newState = {...prevstate};
        newState['occupation'] = e.target.value;
        return newState;
    })
    }

    


  
/*     state  = {
      occupation: "student"
    }
    toggleForm = (e) => {
        this.setState({
            occupation: e.target.value
        })
    } */
    render() {
      return (
        <Modal
        {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body>
            <h4>Sign Up</h4>
            {/* <Form onChange={this.toggleForm}> */}
            <Form onChange={this.toggleForm}>
                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Select Occupation</Form.Label>
                    <Form.Control as="select">
                      <option value="student">Student</option>
                      <option value="teacher">Teacher</option>
                    </Form.Control>
                </Form.Group>
              </Form>
              {/* {
                  this.state.occupation === 'student' ? 
                  <Form.Group controlId="signUp__userId">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="" placeholder="Name" />
                  </Form.Group> : null
              } */}
              {/* {
                  this.state.occupation === 'student' ? 
                  <Form.Group controlId="regNo">
                      <Form.Label>Registration No</Form.Label>
                      <Form.Control type="" placeholder="Registration No" />
                  </Form.Group> : <Form.Group controlId="signUp__userId">
                  <Form.Label>User Name</Form.Label>
                  <Form.Control type="" placeholder="Enter an User Name" />
                  </Form.Group>
              } */}
            <Form onSubmit={e=> this.handle_signup(e, this.state)}>
              <Form.Group controlId="signUp__email">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" name="email" onChange={this.handle_change_signin} />
              </Form.Group>

              <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="********" name="password" onChange={this.handle_change_signin}/>
              </Form.Group>

              <Form.Group controlId="confirm_password">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control type="password" placeholder="********" name="password_confirm" onChange={this.handle_change_signin} />
              </Form.Group>
              
              <Button variant="outline-primary btn-block" type="submit">
                  Submit
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      );
    }
  }