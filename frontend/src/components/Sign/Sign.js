import React,{ Component, isValidElement } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Sign.css';

const axios = require('axios');

export default class Sign extends Component {
    constructor(props) {
        super(props)

        this.state = {
            errors : {},
            username: '',
            password: '',
            logged_in: false,
            occupation: "student",
            registration_no :'',
            email : '',
            isValid : true,
            password_1: '',
            password_1_confirm : '',
            Name: '',
        }
    }

    toggleForm = (e) => {
        this.setState({
            occupation: e.target.value
        })
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
        var obj = {username: data.username, password: data.password};
        let body = JSON.stringify(obj);
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

       handle_signup = (e, data) => {
        this.validate();
        if(this.state.isValid) {
            console.log('gese')
            e.preventDefault();
            let endpoint = "http://127.0.0.1:8000/";
            var obj;
            if(this.state.occupation=='student')
                obj = {occupation: data.occupation,registration_no:data.registration_no,name:data.Name,email: data.email,password: data.password_1,confirm_password:data.password_1_confirm};
            else
                obj = {occupation: data.occupation,username:data.username,email: data.email,password: data.password_1,confirm_password:data.password_1_confirm}
            let body = JSON.stringify(obj);
            console.log(body)
            let config = {
            headers: {
                "Content-Type" : "application/json"
            }
            };
            axios.post(endpoint, body, config)
            .then(json => {
            console.log(json.data.token)
            localStorage.setItem('token', json.data.token);
            this.setState({
                username: json.data.user.username,
            });
            })
            .catch(err => {
            console.log(err)
            })
        }
      };

      validate() {
        if(this.state.occupation == 'student')
        {
            
            if(this.state.Name=='') {
                console.log('student');
                this.setState({
                    isValid : false,
                    errors: {
                        ['error'] : "Please enter your name."
                    }
                });
            }
            if(this.state.registration_no=='') {
                this.setState({
                    isValid : false,
                    errors: {
                        ['error'] : "Please enter your registration no."
                    }
                });
            }
        }
        if(this.state.occupation=='teacher')
        {
            if(this.state.username=='') {
                this.setState({
                    isValid : false,
                    errors: {
                        ['error'] : "Please check your username."
                    }
                });
            }
        }
        if(this.state.email=='') {
            this.setState({
                isValid : false,
                errors: {
                    ['error'] : "Please enter your email."
                }
            });
        }
      }
    render () {
    return(
    <div className="outer"> 
        <div className="inner1">
            <div className="container">
                <div className="row sign">
                    <div className="col">
                        <Tabs defaultActiveKey="signIn" id="sign__tabs">
                            {/* Sign In */}
                            <Tab eventKey="signIn" title="Sign In">
                                <Form onSubmit={e=> this.handle_signin(e, this.state)}>
                                    <Form.Group controlId="signIn__email">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control type="text" placeholder="Username" name="username" onChange={this.handle_change_signin}/>
                                    </Form.Group>

                                    <Form.Group controlId="password">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Password" name="password" onChange={this.handle_change_signin}/>
                                    </Form.Group>
                                    
                                    <Button variant="outline-primary" type="submit">
                                        Submit
                                    </Button>
                                </Form>
                            </Tab>
                            {/* Sign Up */}
                            <Tab eventKey="signUp" title="Sign Up">
                                        <Form onChange={this.toggleForm}>
                                            <Form.Group controlId="exampleForm.ControlSelect1">
                                                <Form.Label>Select Occupation</Form.Label>
                                                <Form.Control as="select">
                                                    <option value="student">Student</option>
                                                    <option value="teacher">Teacher</option>
                                                </Form.Control>
                                            </Form.Group>
                                        </Form>
                                        <Form onSubmit={e=> this.handle_signup(e, this.state)}> 

                                            {
                                                this.state.occupation == 'student' ? 
                                                <Form.Group controlId="signUp__userId">
                                                <Form.Label>Name</Form.Label>
                                                {/* specify the type */}
                                                <Form.Control type="text" placeholder="Name" name="Name" onChange={this.handle_change_signin}/>
                                                </Form.Group> : null
                                            }
                                            {
                                                this.state.occupation == 'student' ? 
                                                <Form.Group controlId="regNo">
                                                    <Form.Label>Registration No</Form.Label>
                                                    {/* specify the type */}
                                                    <Form.Control type="text" placeholder="Registration No" name="registration_no" onChange={this.handle_change_signin}/>
                                                </Form.Group> : <Form.Group controlId="signUp__userId">
                                                <Form.Label>User Name</Form.Label>
                                                {/* specify the type */}
                                                <Form.Control type="text" placeholder="Enter an User Name" name="username" onChange={this.handle_change_signin}/>
                                                </Form.Group>
                                            }

                                            <Form.Group controlId="signUp__email">
                                                <Form.Label>Email address</Form.Label>
                                                <Form.Control type="email" placeholder="Enter email" name="email" onChange={this.handle_change_signin} />
                                            </Form.Group>

                                            <Form.Group controlId="password">
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control type="password" placeholder="Password" />
                                            </Form.Group>

                                            <Form.Group controlId="confirm_password">
                                                <Form.Label>Confirm Password</Form.Label>
                                                <Form.Control type="password" placeholder="Re type the password" />
                                            </Form.Group>
                                            
                                            <Button variant="outline-primary" type="submit">
                                                Submit
                                            </Button>
                                        </Form>
                                    </Tab>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
    }
}
