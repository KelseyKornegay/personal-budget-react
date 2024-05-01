import React from 'react';
import './App.scss';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Menu from './Menu/Menu.js';
import Hero from './Hero/Hero.js';
import HomePage from './HomePage/HomePage.js';
import Footer from './Footer/Footer.js';
import LoginPage from './LoginPage/LoginPage.js';
import DashboardPage from './DashboardPage/DashboardPage.js';
import ConfigureBudget from './ConfigureBudget/ConfigureBudget.js';

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


