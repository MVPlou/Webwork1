import React, { useEffect, useRef } from 'react'
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages'
import About from './Pages/about'
import Contact from './Pages/contact'

function App() {

  useEffect(() => {
   console.log('hello')
  }, []);
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='About' element={<About/>} />
        <Route path='Contact' element={<Contact/>} />
      </Routes>
      </BrowserRouter>  
        
  );
  }

export default App;

