import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './LOGIN.css';
import Login from './LOGIN.jsx'; 
import Home from './HOME.jsx'; 
import Mencari from './MENCARI.jsx'; 
import Menemukan from './MENEMUKAN.jsx';
import SearchResults from './components/SearchResults';
import Register from './Register.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/mencari" element={<Mencari />} />
        <Route path="/menemukan" element={<Menemukan />} />
        <Route path="/results" element={<SearchResults />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  </StrictMode>,
);