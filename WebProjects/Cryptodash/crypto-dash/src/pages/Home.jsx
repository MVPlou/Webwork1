import React from 'react'
import CoinSearch from '../components/CoinSearch'

export const Home = ({coin}) => {
  return (
    <div>
      <CoinSearch coin={coin} />
    </div>
  )
}

export default Home
