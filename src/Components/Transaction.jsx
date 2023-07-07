import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';

const API_URL = 'http://localhost:8000';

const Transaction = () => {

  const navigate = useNavigate();
    const [transactions, setTransactions] = useState([]);
    
    useEffect(() => {
      let localStorageData = JSON.parse(localStorage.getItem('authData'));
      let token = '';
      if(localStorageData){
        token = localStorageData.data.token;
      }
      const fetchTransactions = async () => {
        try {
          await axios.get(`${API_URL}/api/v1/transactions`,{ 
                  headers: {
                  Authorization: `Bearer ${token}`,
                  }
              })
              .then((response) => {
                  setTransactions(response.data.data.transactions)
              })
              .catch((error) => {
                  navigate('/')
                  console.error(error);
              });
        } catch (error) {
          console.error(error);
          navigate('/');
        }
      };
  
      fetchTransactions();
    }, []);
  
    return (
      <div className='auth-container'>
        <Container fluid>
            <Row>
                <Col><h3>Transactions</h3></Col>
            </Row>
            <hr />
            <Row>
                <Col id='transaction-list'>
                {transactions.map((item) => (
                  <Row className='transaction-item' key={item.id}>
                    <Col>
                      <h4>{item.name}</h4>
                      <Row>
                        <Col>
                          <p>{item.description}</p>
                          <p>{(item.type == 'withdraw') ? '-'+(item.amount).toFixed(2) : '+'+(item.amount).toFixed(2)}</p>
                        </Col>
                        <Col>
                          <p>Last Balance: {(item.last_current_balance).toFixed(2)}</p>
                          <p>{item.created_at}</p>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                ))}
                </Col>
            </Row>
            
        </Container>
      </div>
    );
  };
export default Transaction;