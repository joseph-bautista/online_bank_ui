import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Modal, Container, Col, Row, Form } from 'react-bootstrap';

const API_URL = 'http://localhost:8000';

const SendToBank = () => {
    const navigate = useNavigate();
    const [providerId, setProviderId] = useState('');
    const [bankId, setBankId] = useState('');
    const [providerName, setProviderName] = useState('');
    const [bankName, setBankName] = useState('');
    const [providerList, setProviderList] = useState([]);
    const [bankList, setBankList] = useState([]);
    const [accountNumber, setAccountNumber] = useState('');
    const [amount, setAmount] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showProviderError, setShowProviderError] = useState(false);
    const [showBankError, setShowBankError] = useState(false);
    const [showAccountNumberError, setShowAccountNumberError] = useState(false);
    const [showAmountError, setShowAmountError] = useState(false);
    const [token, setToken] = useState('');

    useEffect(()=>{
        let localStorageData = JSON.parse(localStorage.getItem('authData'));
        if(localStorageData){
            setToken(localStorageData.data.token);
        }else{
            navigate('/');
        }
        handleProvider(localStorageData.data.token);
    });

    const handleBankOnChange = (id) => {
      setBankId(id);
      const bank = bankList.find(bank => bank.id == id);
      setBankName(bank.name);
    }

    const handleProviderOnChange = async (id) => {
      setProviderId(id);
      const provider = providerList.find(provider => provider.id == id);
      setProviderName(provider.name);
      try {
        await axios.get(`${API_URL}/api/v1/banks?provider_id=${id}`, { 
            headers: {
            Authorization: `Bearer ${token}`,
            }
        })
        .then((response) => {
          let banks = response.data.data.banks;
            
          setBankList(banks);
            console.log(response.data)
        })
        .catch((error) => {
            console.error(error);
        });
           
      } catch (error) {
        console.error(error);
      }
    };

    const handleProvider = async (api_token) => {
      try {
        await axios.get(`${API_URL}/api/v1/providers`, { 
            headers: {
            Authorization: `Bearer ${api_token}`,
            }
        })
        .then((response) => {
            let providers = response.data.data.providers;
            setProviderList(providers);
        })
        .catch((error) => {
            console.error(error);
        });
      } catch (error) {
        console.error(error);
      }
    };
  
    const handleSendMoney = async () => {
      try {
        await axios.post(`${API_URL}/api/v1/transactions`,  
            { 
              type: 'bank',
              amount: amount,
              provider_id: providerId,
              bank_id: bankId,
              account_number: accountNumber
            }, { 
                headers: {
                Authorization: `Bearer ${token}`,
                }
            })
            .then((response) => {
                navigate('/');
                alert('Transaction successful');
            })
            .catch((error) => {
                navigate('/')
                console.error(error);
            });
      } catch (error) {
        console.error(error);
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
      if(providerId === ''){
          setShowProviderError(true);
      }else{
          setShowProviderError(false);
      }
      if(bankId === ''){
          setShowBankError(true);
      }else{
          setShowBankError(false);
      }
      if(accountNumber === ''){
          setShowAccountNumberError(true);
      }else{
          setShowAccountNumberError(false);
      }
      if(amount === ''){
          setShowAmountError(true);
      }else{
          setShowAmountError(false);
      }

      if (providerId !== '' && bankId !== '' && accountNumber !== '' && amount !== ''){
          setShowModal(true);
      }
        
    };
    const handleCancel = () =>{
        navigate('/');
    }
  
    return (
        <div className='auth-container'>
            <Container fluid>
                <Row>
                    <Col><h3>Send Money To Bank</h3></Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Select size="lg" aria-label="Default select example" value={providerId} onChange={(e) => handleProviderOnChange(e.target.value)}>
                          <option>Select Provider</option>
                          {providerList.map((provider) => (
                            <option key={provider.id} value={provider.id}>
                              {provider.name}
                            </option>
                          ))}
                          
                        </Form.Select>
                        {showProviderError&&<p className='errorMsg'><span>Provider is required</span></p>}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Select size="lg"  aria-label="Default select example" value={bankId} onChange={(e) => handleBankOnChange(e.target.value)}>
                          <option>Select bank</option>
                          {bankList.map((bank) => (
                            <option key={bank.id} value={bank.id}>
                              {bank.name}
                            </option>
                          ))}
                        </Form.Select>
                        {showBankError&&<p className='errorMsg'><span>Bank is required</span></p>}
                    </Col>
                </Row>
                <Row>
                    <Col>
                      <Form.Control size="lg" type="text" placeholder="Account Number" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} />
                      {showAccountNumberError&&<p className='errorMsg'><span>Account Number is required</span></p>}
                    </Col>
                </Row>
                <Row>
                    <Col>
                      <Form.Control size="lg" type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
                      {showAmountError&&<p className='errorMsg'><span>Amount is required</span></p>}
                    </Col>
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
                    You are about to send {amount} to a {bankName} with account number {accountNumber} and provider {providerName}. Do you want to continue?
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
export default SendToBank;