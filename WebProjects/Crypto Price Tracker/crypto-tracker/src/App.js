import { NextUIProvider } from '@nextui-org/react';
import React, { useState, useEffect } from 'react';
import DarkMode from "./DarkMode";
import axios from 'axios';
import './App.css';
import Coin from './Coin';
import { Navbar, Button, Link, Text } from "@nextui-org/react";




function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios
      .get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=GBP&order=market_cap_desc&per_page=1000&page=1&sparkline=false'
      )
      .then(res => {
        setCoins(res.data);
        console.log(res.data);
      })
      .catch(error => console.log(error));
  }, []);

  const handleChange = e => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className='coin-app'>
      <nav>
      <NextUIProvider>
      <Navbar />
      <Button />
      <Link />
      <Text />
        <DarkMode />
        </NextUIProvider>
      </nav>
<div id="image"></div>
      <div className='coin-search'>
        
        <h1 className='coin-text'></h1>
        <form>
          <input
            className='coin-input'
            type='text'
            onChange={handleChange}
            placeholder='Search'
          />
        </form>
      </div>

      <div className='heading'>
        <p>Coin Price 24hVolume MktCap</p>
      </div>

      {filteredCoins.map(coin => {
        return (
          <Coin
            key={coin.id}
            name={coin.name}
            price={coin.current_price}
            symbol={coin.symbol}
            marketcap={coin.total_volume}
            volume={coin.market_cap}
            image={coin.image}
            priceChange={coin.price_change_percentage_24h}
          />
        );
      })}
    </div>
  );
}

export default App;