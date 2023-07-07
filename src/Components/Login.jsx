// Import required libraries and components
import React, { useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Container, Col, Row, Form } from 'react-bootstrap';

// Define API base URL
const API_URL = 'http://localhost:8000';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [token, setToken] = useState('');
  
    const handleLogin = async (e) => {
      e.preventDefault();
  
      try {
        await axios.post(`${API_URL}/api/v1/auth/login`, { email, password })
        .then((response) => {
          // Handle successful login, e.g., store token in localStorage
          
          localStorage.setItem('authData', JSON.stringify(response.data));
          console.log(response.data);
          navigate('/');
        })
        .catch((error) => {
          // Handle login error
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
                    <Col><h3>Login</h3></Col>
                </Row>
                <Row>
                    <Col><Form.Control size="lg" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /></Col>
                </Row>
                <Row>
                    <Col><Form.Control size="lg" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /></Col>
                </Row>
                <Row>
                    <Col><Button variant="primary" onClick={handleLogin}>Login</Button>{' '}<p>Don't have an account? Go to <Link to="/register">Register</Link></p></Col>
                </Row>
            </Container>
      </div>
    );
  };

export default Login;
