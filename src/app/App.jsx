import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from "../entities/LanguageContext";
import Home from '../pages/Home/Home';
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import About from "../pages/About/About";
import Contact from '../pages/Contact/Contact';
import Profile from '../pages/Profile/Profile';
import Description from '../pages/Description/Description';
import Card from '../pages/Card/Card';
import ForgotPassword from '../pages/Login/ForgotPassword';
import ResetPassword from '../pages/Login/ResetPassword';
const App = () => {
  return (
  <LanguageProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/contacts" element={<Contact />} />
        <Route path="/card" element={<Card />} />
        <Route path="/description/:id" element={<Description />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  </LanguageProvider>
  );
};

export default App;
