'use client';
import React from 'react';
import { Row, Container, Col } from 'react-bootstrap';
import Login from './Login';

const Authenticate = () => {
  return (
    <Container className="p-10">
      <Row className="justify-content-center align-items-center h-100">
        <Col md={6} className="text-center">
          <Login />
        </Col>
      </Row>
    </Container>
  );
};

export default Authenticate;
