import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ForgotPasswordPage from './components/ForgotPasswordPage'
import Homepage from './components/Homepage';
import HomepageAdmin from './assets/HomepageAdmin';
import CarDetails from './assets/CarDetails';
import AddCarPage from './components/AddCarPage';

function App() {
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        <Route path="/home" element={<Homepage />} />
        <Route path="/HomepageAdmin" element={<HomepageAdmin />} />
        <Route path="/details/:carId" element={<CarDetails />} />
        <Route path="/add-car" element={<AddCarPage />} />
        

        
      </Routes>
    </Router>
  );
}

export default App;
