import React from 'react'
import Layout from "../../components/Layout";
import { Jumbotron, Row, Col, Container } from "react-bootstrap";
import "./style.css";
import { NavLink } from "react-router-dom";

const Home = (props) => {
    return (
        <Layout sidebar>
            


            <Jumbotron style={{ margin: '5rem', background: '#fff' }} className="text-center">
                <h1>Welcome to Dashboard</h1>
                <p>Ecommerce, also known as electronic commerce or internet commerce, refers to the buying and selling of goods or services using the internet, and the transfer of money and data to execute these transactions. Ecommerce is often used to refer to the sale of physical products online, but it can also describe any kind of commercial transaction that is facilitated through the internet. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search. </p>
            </Jumbotron>
        </Layout>
    )
}

export default Home;