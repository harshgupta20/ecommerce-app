
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import Explore from './components/Explore';
import Contact from './pages/Contact';
import WishList from './pages/WishList';
import Cart from './pages/Cart';
import Account from './pages/Account';
import Admin from "./pages/Admin";

import { auth } from './config/Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Footer from './components/Footer';

function App() {

  const [user] = useAuthState(auth);


  return (
    <>

      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Explore/>}/>
          <Route exact path='/contact' element={<Contact/>}/>
          <Route exact path='/wish-list' element={user ? <WishList/> : <Navigate to='/'/>}/>
          <Route exact path='/cart' element={user ? <Cart/> : <Navigate to='/'/>}/>
          <Route exact path='/account' element={user ? <Account/> : <Navigate to='/'/>}/>
          <Route exact path='/admin' element={user ? <Admin/> : <Navigate to='/'/>}/>
        </Routes>
        <Footer/>
      </Router>
    </>
  );
}

export default App;
