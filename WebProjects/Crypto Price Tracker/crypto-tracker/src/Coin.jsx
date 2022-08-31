import React from 'react'
import './Coin.css'

const Coin = ({name, image, symbol, price, volume, priceChange, marketcap}) => {
  return (
    <div className='coin-container'>
        <div className='coin-row'>
            <div className='coin'>
                <img src={image} alt='crpto'/>
                <h1>{name}</h1>
                <p classname='coin-symbol'>{symbol}</p>
            </div>
            <div className="coin-data">
                <p classname="coin-price">£{price}</p>
                <p classname='cpom=volume'>£{volume.toLocaleString()}</p>
                {priceChange < 0 ? (
                 <p className="coin-percent red">{priceChange.toFixed(2)}%</p>
                ) : (
                <p className="coin-percent green">{priceChange.toFixed(2)}%</p>
                )}
                <p className="coin-marketcap">
                    Mkt Cap: £{marketcap.toLocaleString()}
                </p>
            </div>
        </div>
    </div>
  )
}
 
export default Coin;