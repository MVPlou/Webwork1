import React, { useContext } from 'react'
import {HiSun, HiMoon} from 'react-icons/hi'
import { ThemeContext } from '../context/ThemeContext'

export const ThemeToggle = () => {
const {theme, setTheme} = useContext(ThemeContext)


// Ternary operator to check if the theme is light or dark

  return (
    <div className='p-2'>
        {theme === 'dark' ? (
            <div className='flex items-center cursor-pointer' onClick={()=> setTheme(theme === 'dark' ? 'light' : 'dark')}>
                <HiSun className='text-primary text-2xl mr-2' /> Light Mode
            </div>
        ) : (
            <div onClick={()=> setTheme(theme === 'dark' ? 'light' : 'dark')}>
            <HiMoon className='text-primary text-2xl mr-2' /> Dark Mode
            </div>)}
    </div>
  )
}
export default ThemeToggle;