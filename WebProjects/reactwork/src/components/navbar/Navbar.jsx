import React from 'react'
import {RiMenu3Line, RiCloseLin } from 'react-icons/ri'; 
import logo from '../../assets/cropped-worldofwordle_logo.webp';
import './navbar.css';



// BEM -> Block Element Modifier

const Navbar = () => {
  return (
    <div className="wow__navbar">
      <div className="wow__navbar-links">
        <div className="wow__navbar-links_logo">
          <img src={logo} alt="logo"/>
          </div>
          <div className="wow__navbar-links_container">
            <p><a href="#Home">Home</a></p>
            <p><a href="#RandomGame">Random Game</a></p>
            <p><a href="#Contact">Contact</a></p>

          </div>
        </div>
        <div className="wow__navbar-sign">
          <button type="button">Sign In</button>
        </div>

    </div>
  )
}

export default Navbar