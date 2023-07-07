import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Outlet, Routes } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import Login from './Components/Login';
import Register from './Components/Register';
import SendToBank from './Components/SendToBank';
import SendToUser from './Components/SendToUser';
import Transaction from './Components/Transaction';
import Navigation from './Components/Navigation';
import './App.css';

const App = () => {

  return (
    <Router>
      <Navigation />
      <Outlet />
      <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register  />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/transactions" element={<Transaction />} />
          <Route path="/send-to-user" element={<SendToUser />} />
          <Route path="/send-to-bank" element={<SendToBank />} />
        </Routes>
    </Router>
  );
};

export default App;
