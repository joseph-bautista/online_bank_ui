// Import required libraries and components
import React, { useState, useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Modal, Container, Col, Row, Form } from 'react-bootstrap';

// Define API base URL
const API_URL = 'http://localhost:8000';

const SendToUser = () => {
    
    const navigate = useNavigate();
    
    const [email, setEmail] = useState('');
    const [amount, setAmount] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showEmailError, setShowEmailError] = useState(false);
    const [showAmountError, setShowAmountError] = useState(false);
    
    const [token, setToken] = useState('');
    useEffect(()=>{
        let localStorageData = JSON.parse(localStorage.getItem('authData'));
        if(localStorageData){
            console.log(localStorageData.data.token)
            setToken(localStorageData.data.token);
        }else{
            navigate('/');
        }
    });
  
    const handleSendMoney = async () => {
  
      try {

        await axios.post(`${API_URL}/api/v1/transactions`, {type:'user',email, amount}, { 
            headers: {
              Authorization: `Bearer ${token}`,
            }
           })
          .then((response) => {
            // Handle successful login, e.g., store token in localStorage
            // setBalance(response.data.data.account.balance);
            navigate('/');
          })
          .catch((error) => {
            navigate('/')
            // Handle login error
            console.error(error);
          });
        // Show success alert
        alert('Transaction successful');
        // Redirect to dashboard page
        // navigate('/');
  
        // return redirect('/');
      } catch (error) {
        console.error(error);
        // Show error alert
        alert('Transaction failed');
      }
    };
  
    const handleModalClose = () => {
      setShowModal(false);
    };
  
    const handleModalProceed = () => {
      setShowModal(false);
      handleSendMoney();
    };

    const handleModalShow = () => {
        if(email === ''){
            setShowEmailError(true);
        }else{
            setShowEmailError(false);
        }
        if(amount === ''){
            setShowAmountError(true);
        }else{
            setShowAmountError(false);
        }
        if (email !== '' && amount !== ''){
            setShowModal(true);
        }
        
    }

    const handleCancel = () =>{
        navigate('/');
    }
  
    return (
        <div className='auth-container'>
            <Container fluid>
                <Row>
                    <Col><h3>Send Money To User</h3></Col>
                </Row>
                <Row>
                    <Col><Form.Control size="lg" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    {showEmailError&&<p className='errorMsg'><span>Email is required</span></p>}</Col>
                </Row>
                <Row>
                    <Col><Form.Control size="lg" type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
                    {showAmountError && <p className='errorMsg'><span>Amount is required</span></p>}</Col>
                </Row>
                <Row>
                    <Col>
                        <div className='d-grid gap-2'><Button variant="primary" size='lg' onClick={handleModalShow}>Send</Button></div>
                    </Col>
                </Row>
                
                <Row>
                    <Col>
                        <div className='d-grid gap-2'><Button variant="danger" size='lg' onClick={handleCancel}>Cancel</Button></div>
                    </Col>
                </Row>
            </Container>
            
            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    You are about to send {amount} to {email}. Do you want to continue?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>
                    Cancel
                    </Button>
                    <Button variant="primary" onClick={handleModalProceed}>
                    Proceed
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    
    );
  };
export default SendToUser;