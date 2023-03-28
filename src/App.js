import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './components/Home';
import Layout from './components/layout/Layout';
import Register from './components/Register';
import Login from './components/Login';

function App() {
  return (
    <BrowserRouter >
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
      </Route>
    </Routes>
      
    </BrowserRouter>
  );
}

export default App;
