import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './components/Home';
import Layout from './components/layout/Layout';
import Login from './components/Login';
import Tickets from './components/Tickets';
import Register from './components/Register';
import Events from './components/Events';

function App() {
  return (
    <BrowserRouter >
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/tickets' element={<Tickets />}/>
        <Route path='/events' element={<Events />}/>

      </Route>
    </Routes>
      
    </BrowserRouter>
  );
}

export default App;
