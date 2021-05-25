import React from 'react';
import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../../actions";
import './style.css';

const Header = () => {

    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(signout());
    }

    const renderLoggedInLinks = () => {
        return (
            <Nav>
                <li>
                    <span style={{ cursor: 'pointer' }} className="nav-link" onClick={logout} >Signout</span>
                </li>
            </Nav>
        )
    }

    const renderNonLoggedInLinks = () => {
        return (
            <Nav>
                <li className="nav-item">
                    <NavLink to="signin" className="nav-link">Signin</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="signup" className="nav-link">Signup</NavLink>
                </li>
            </Nav>
        )
    }

    return (
        <div>
            <Navbar
                collapseOnSelect
                fixed="top"
                expand="lg"
                variant="light"
                style={{
                    zIndex: 1,
                    background: ' #fff ',
                    boxShadow: '0px 0px 4px 0px',
                }}
            >
                <Container fluid>
                    <Link to="/" className="navbar-brand">Admin</Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">

                        </Nav>
                        {auth.authenticate ? renderLoggedInLinks() : renderNonLoggedInLinks()}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div >
    )
}

export default Header;