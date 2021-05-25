import React from 'react';
import Header from "../Header";
import './style.css'
import { Jumbotron, Row, Col, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Layout = (props) => {
    return (
        <div>
            <Header />
            {
                props.sidebar ?
                    <Container fluid>
                        <Row>
                            <Col md={2} className="sidebar">
                                <ul>
                                    <li><NavLink exact to={'/'} >Home</NavLink></li>
                                    <li><NavLink to={'/page'} >Page</NavLink></li>
                                    <li><NavLink to={'/category'} >Category</NavLink></li>
                                    <li><NavLink to={'/products'} >Product</NavLink></li>
                                    <li><NavLink to={'/orders'} >Order</NavLink></li>
                                </ul>
                            </Col>
                            <Col md={10} style={{ marginLeft: 'auto', paddingTop: '60px' }}>
                                {props.children}
                            </Col>
                        </Row>
                    </Container>
                    :
                    props.children
            }
        </div>
    )
}

export default Layout;