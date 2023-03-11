
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

function App() {

  const [user] = useAuthState(auth);


  return (
    <>

      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Explore/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/wish-list' element={user ? <WishList/> : <Navigate to='/'/>}/>
          <Route path='/cart' element={user ? <Cart/> : <Navigate to='/'/>}/>
          <Route path='/account' element={user ? <Account/> : <Navigate to='/'/>}/>
          <Route path='/admin' element={user ? <Admin/> : <Navigate to='/'/>}/>
        </Routes>
      </Router>
      <h1>klkl</h1>
    </>
  );
}

export default App;
