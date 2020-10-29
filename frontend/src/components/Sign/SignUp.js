import React,{ Component } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form';
import './Sign.css';
 
function SignUp(props) {
/*     state  = {
      occupation: "student"
    }
    toggleForm = (e) => {
        this.setState({
            occupation: e.target.value
        })
    } */
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <h4>Sign Up</h4>
          {/* <Form onChange={this.toggleForm}> */}
          <Form>
              <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label>Select Occupation</Form.Label>
                  <Form.Control as="select">
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                  </Form.Control>
              </Form.Group>
          </Form>
          <Form> 
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

            <Form.Group controlId="signUp__email">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="********" />
            </Form.Group>

            <Form.Group controlId="confirm_password">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="********" />
            </Form.Group>
            
            <Button variant="outline-primary btn-block" type="submit">
                Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  export default SignUp;
