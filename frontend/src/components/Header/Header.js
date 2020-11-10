import React,{ Component } from 'react';
import './Header.scss';
import Navs from '../Navbar/Navbar';
import { Container } from 'react-bootstrap';

export default class Header extends Component {
    render() {
        return (
            <div className="header">
                {/* <Navs/> */}
                <Container className="header__text">
                    <h1 className="header__heading">ClassPortal</h1>
                    <p className="header__intro">All Your Online Learning Essentials at One Place.</p>
                </Container>
            </div>
        )
    }
}