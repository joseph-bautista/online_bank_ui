import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
const API_URL = 'http://localhost:8000';

const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [mobile, setMobile] = useState('');
  
    const handleRegister = async (e) => {
      e.preventDefault();
  
      try {
        await axios.post(`${API_URL}/api/v1/auth/register`, { name, email, password, password_confirmation: confirmPassword, mobile })
        .then((response) => {
          navigate('/login');
        })
        .catch((error) => {
          console.error(error);
        });
  
      } catch (error) {
        console.error(error);
      }
    };
  
    return (
        <div className='auth-container'>
        <Container fluid>
          <Row>
            <Col><h1>Online Bank</h1></Col>
          </Row>
          <Row>
            <Col><h3>Registration</h3></Col>
          </Row>
          <Row>
            <Col><Form.Control size="lg" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} /></Col>
          </Row>
          <Row>
            <Col><Form.Control size="lg" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /></Col>
          </Row>
          <Row>
            <Col><Form.Control size="lg" type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} /></Col>
          </Row>
          <Row>
            <Col><Form.Control size="lg" type="password" value={confirmPassword} placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} /></Col>
          </Row>
          <Row>
            <Col><Form.Control size="lg" type="text" placeholder="Mobile (optional)" value={mobile} onChange={(e) => setMobile(e.target.value)} /></Col>
          </Row>
          <Row>
            <Col><Button variant="success" onClick={handleRegister}>Register</Button>{' '}<p>Already have an account? Go to <Link to="/login">Login</Link></p></Col>
          </Row>
          
        </Container>
      </div>
    );
  };

export default Register;