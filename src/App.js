// Components
import Navbar from './components/Navbar';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Explore from './components/Explore';
import Contact from './pages/Contact';


function App() {
  return (
    <>

      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Explore/>}/>
          <Route path='/contact' element={<Contact/>}/>
        </Routes>
      </BrowserRouter>
      <h1>klkl</h1>
    </>
  );
}

export default App;
