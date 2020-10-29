import React,{ Component } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form';
import './Sign.css';


const axios = require('axios');
 
export default class SignIn extends Component {
    constructor(props) {
      super(props)
      this.state = {
        errors : {},
        email: '',
        password: '',
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

    handle_signin = (e, data) => {
      e.preventDefault();
      let endpoint = "http://127.0.0.1:8000/";
      var obj = {email: data.email, password: data.password};
      let body = JSON.stringify(obj);
      console.log(body)
      let config = {
        headers: {
          "Content-Type" : "application/json"
        }
      };
      axios.post(endpoint, body, config)
      .then(json => {
        localStorage.setItem('token', json.data.token);
        localStorage.setItem('username', json.data.user.username);
        this.setState({
          username: json.data.user.username,
          logged_in: true
        });
      })
      .catch(err => {
        console.log(err)
      })
    };


    render () {
      return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {/* <Modal.Header closeButton >
          <Modal.Title id="contained-modal-title-vcenter">
            Welcome Back!
          </Modal.Title>
        </Modal.Header> */}
        <Modal.Body>
          <h2 className="text-center">Sign In</h2>
          <Form  onSubmit={e=> this.handle_signin(e, this.state)}>
            <Form.Group controlId="signIn__email">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter your email" name="email" onChange={this.handle_change_signin}/>
            </Form.Group>

            <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="********" name="password" onChange={this.handle_change_signin}/>
            </Form.Group>
            
            <Button variant="outline-primary btn-block" type="submit">
                Submit
            </Button>
            <p className="forgot-password text-right">
                <a href="#">Forgot password?</a>
            </p>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide} variant="secondary">Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

  
