import React,{ Component } from 'react';
import './Header.scss';
import Navs from '../Navbar/Navbar';
import { Container } from 'react-bootstrap';

export default class Header extends Component {
    render() {
        return (
            <div className="header">
                <Navs/>
                <Container className="header__text">
                    <h1 className="header__heading">Welcome</h1>
                    <h2 className="header__intro">Some Introductory Line</h2>
                </Container>
            </div>
        )
    }
}