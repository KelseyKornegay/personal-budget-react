import React from 'react';
import './App.scss';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Menu from './Menu/Menu';
import Hero from './Hero/Hero';
import HomePage from './HomePage/HomePage';
import Footer from './Footer/Footer';
import LoginPage from './LoginPage/LoginPage';
import DashboardPage from './DashboardPage/DashboardPage';
import ConfigureBudget from './ConfigureBudget/ConfigureBudget';

export default function App() {
  return (
  <Router>
    <Menu/>
    <Hero/>
    <div className="mainContainer">
    <Routes>
    <Route path="/configureBudget" element={<ConfigureBudget />}/>
    <Route path="/login" element={<LoginPage />}/>
    <Route path="/dashboard" element={<DashboardPage />}/>
    <Route path="/" element={<HomePage />}/>
    </Routes>
    </div>
    <Footer/>
  </Router>

  );
}

// export default App;


