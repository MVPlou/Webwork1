import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import { ThemeProvider } from './context/ThemeContext';
import Home from './pages/Home';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Account from './pages/Account';
import axios from 'axios';

function App() {
    const [coins, setCoins] = useState([]);
  
    useEffect(() => {
      axios.get(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=gbp&order=market_cap_desc&per_page=100&page=1&sparkline=true'
        )
        .then(res => {
          setCoins(res);
          console.log(res.data);
        })
        .catch(error => console.log(error));
    }, []);
  



  return <ThemeProvider>
    <Navbar />
    <Routes>
  <Route path='/' element={<Home coins={coins} />} />
  <Route path='/signin' element={<Signin />} />
  <Route path='/signup' element={<Signup />} />
  <Route path='/account' element={<Account />} />
    </Routes>
    </ThemeProvider>;
}

export default App;
