import React from 'react'
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink
} from './NavbarElements'

const Navbar = () => {
  return (
    <>
     <Nav>
      <NavLink to="/">
        <img src="" alt=""></img>
        Home
      </NavLink>
      <Bars />
      <NavMenu>
        <NavLink to ="/About" activeStyle>
          About
        </NavLink>
        <NavLink to ="/Product" activeStyle>
          Product
        </NavLink>
        <NavLink to ="/Contact" activeStyle>
          Contact
        </NavLink>
        <NavLink to ="/Sign Up" activeStyle>
          Sign Up
        </NavLink>
      </NavMenu>
      <NavBtn>
        <NavBtnLink to ='/signin'>Sign In</NavBtnLink> 
      </NavBtn>
     </Nav>
    </>
  );
};

export default Navbar;
