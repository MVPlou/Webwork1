import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import Main from './Main'


function App() {
  return (
    <div className="App bg-gradient-to-r from-green-500 via-blue-500 to-white-100">
      <Navbar />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
