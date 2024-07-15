import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import BlogList from "../components/BlogList";

const Homepage = () => {
    
    return (
        <>
        <Container>
            <Row className="gy-4 d-flex flex-row">
            <Col lg={8}>
            <BlogList />
            </Col>
               
           <Col lg={4}>
           <Sidebar />
                
                </Col>
               
            </Row>
      
        </Container>
           
        </>

    );
};

export default Homepage;