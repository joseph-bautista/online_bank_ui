// Import required libraries and components
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Outlet, redirect, Routes, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Container, Col, Row} from 'react-bootstrap';

// Define API base URL
const API_URL = 'http://localhost:8000';

const Dashboard = () => {
    const navigate = useNavigate();
    const [balance, setBalance] = useState('');
    
    useEffect(() => {
      let localStorageData = JSON.parse(localStorage.getItem('authData'));
      let token = '';
      if(localStorageData){
        token = localStorageData.data.token;
      }
      
      const fetchAccountBalance = async () => {
        try {
          await axios.get(`${API_URL}/api/v1/account_details`, { 
            headers: {
              Authorization: `Bearer ${token}`,
            }
           })
          .then((response) => {
            // Handle successful login, e.g., store token in localStorage
            setBalance(response.data.data.account.balance);
          })
          .catch((error) => {
            navigate('/login')
            // Handle login error
            console.error(error);
          });
          
  
          
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchAccountBalance();
    }, []);
  
    const handleSendToUser = () => {
      navigate('/send-to-user');
  
      // return redirect('/send-to-user');
    };
  
    const handleSendToBank = () => {
      navigate('/send-to-bank');
      // return redirect('/send-to-bank');
    };
  
    return (
        <div className='auth-container'>
            <Container fluid>
                <Row>
                    <Col><h3>Account Balance: <span id="balance">{balance}</span></h3></Col>
                </Row>
                <Row>
                    <Col>
                        <div className='d-grid gap-2'><Button variant="primary" size='lg' onClick={handleSendToUser}>Send To User</Button></div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className='d-grid gap-2'><Button variant="success" size='lg' onClick={handleSendToBank}>Send To Bank</Button></div>
                    </Col>
                </Row>
            </Container>
      </div>
    );
  };
export default Dashboard;