import React,{ Component } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form';
import './Sign.css';
 
export default class SignIn extends Component {
    constructor(props) {
      super(props)
    }
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
          <Form>
            <Form.Group controlId="signIn__email">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter your email" />
            </Form.Group>

            <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="********" />
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
