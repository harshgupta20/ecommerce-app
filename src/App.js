
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import Explore from './components/Explore';
import Contact from './pages/Contact';
import WishList from './pages/WishList';
import Cart from './pages/Cart';
import Account from './pages/Account';
import { Component } from 'react';


function App() {
  return (
    <>

      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Explore/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/wish-list' element={<WishList/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/account' element={<Account/>}/>
        </Routes>
      </BrowserRouter>
      <h1>klkl</h1>
    </>
  );
}

export default App;
