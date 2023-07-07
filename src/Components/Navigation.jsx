import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Nav, Navbar, Container } from 'react-bootstrap';

const API_URL = 'http://localhost:8000';

const Navigation = () => {
    const [token, setToken] = useState('');
    const navigate = useNavigate(); 
    useEffect(()=>{
        let localStorageData = JSON.parse(localStorage.getItem('authData'));
        if(localStorageData){
            setToken(localStorageData.data.token);
        }
    });
    
    const handleLogout = async () => {
        try {
            await axios.get(`${API_URL}/api/v1/account_details`, { 
                headers: {
                  Authorization: `Bearer ${token}`,
                }
            })
            .then((response) => {
                localStorage.clear();
                navigate('/login');
                setToken('');
            })
            .catch((error) => {
                console.error(error);
            });
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div id='navigation' >
            {token &&<Navbar >
                <Container>
                    <Navbar.Brand href="/">
                        <h1>Online Banking</h1>
                    </Navbar.Brand>
                    <Nav variant='underline' className="justify-content-end">
                        <Nav.Link href="/"><h2>Dashboard</h2></Nav.Link>
                        <Nav.Link href="/transactions"><h2>Transactions</h2></Nav.Link>
                        <Nav.Link href="#" onClick={handleLogout}><h2>Logout</h2></Nav.Link>
                    </Nav>
                </Container>
            </Navbar>}
        </div>
    );
  };
  
export default Navigation;
  