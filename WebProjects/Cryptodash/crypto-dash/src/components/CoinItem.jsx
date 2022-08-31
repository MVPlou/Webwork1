import React from 'react'
import CoinSearch from './CoinSearch';
import { AiOutlineStar } from 'react-icons/ai'
import { Sparklines, SparklinesLines } from 'react-sparklines';

export const CoinItem = ({coin}) => {
  return (
    <tr>
    <td>
      <AiOutlineStar />
    </td>
    <td>{coin.market_cap_rank}</td>
    <td>
      <div>
        <img src={coin.image} alt={coin.id} /> 
        <p>{coin.name}</p>
      </div>
    </td>
    <td>{coin.symbol}</td>
    <td>{coin.current_price}</td>
    <td>{coin.price_change_percentage_24h}</td>
    <td>{coin.total_volume}</td>
    <td>{coin.market_cap}</td>
    <td>
      <Sparklines data={coin.sparkline_in_7d.price}>
        <SparklinesLines color='green' />
      </Sparklines>
    </td>
</tr>
  );
};

export default CoinItem;