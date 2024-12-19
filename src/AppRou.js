import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import Shop from './Shop';

const Home = () => <h1>Accueil</h1>;
const About = () => <h1>À propos</h1>;
const Contact = () => <h1>Contact</h1>;
const Login = () => <h1>Login Page</h1>;
const Signup = () => <h1>Inscription Page</h1>;

const AppRou = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/shop" element={<Shop />} />
      </Routes>
    </Router>
  );
};

export default AppRou;
