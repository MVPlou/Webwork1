import React from 'react'
import { Link } from 'react-router-dom'
import { ThemeToggle } from './ThemeToggle'
import { AiOutlineMenu } from 'react-icons/ai'

const Navbar = () => {
  return (
    <div className='rounded-div flex items-center justify-between h-20'>
        <Link to='/'>
            <h1>Digital Dash</h1>
        </Link>
        <div> 
            <ThemeToggle />
        </div>
        <div>
          <Link to='/signin'>Sign In</Link>
          <Link to='/signup'>Sign Up</Link>
        </div>
        {/*menu Icon*/}
        <div>
          <AiOutlineMenu />
        </div>
        {/* Mobile Menu */}
        <div>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li> 
            <li>
              <Link to='/'>Account</Link>
            </li> 
              <ThemeToggle />
          </ul>
          <div>
            <Link to='signin'>
              <button>Sign In</button>
            </Link>
            <Link to='signup'>
              <button>Sign Up</button>
            </Link>
          </div>
        </div>
    </div>
  )
}

export default Navbar;
