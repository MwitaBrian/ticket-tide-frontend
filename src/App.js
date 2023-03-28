import './App.css';
import React,{useState} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './components/Home';
import Layout from './components/layout/Layout';
import Login from './components/Login';
import Events from './components/Events';
import Register from './components/Register';
import Details from './components/Details';
import AuthProvider from './components/context/AuthContext';



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
		sessionStorage.getItem("isLoggedIn") === "true"
	);
  return (
		<BrowserRouter>
			<AuthProvider>
				<Routes>
					<Route path='/' element={<Layout isLoggedIn={isLoggedIn} />}>
						<Route index element={<Home />} />
						<Route path='/login' element={<Login />} />
						<Route path='/register' element={<Register />} />
						<Route path='/events' element={<Events />} />
						<Route path='/details/:id' element={<Details />} />
					</Route>
				</Routes>
			</AuthProvider>
		</BrowserRouter>
	);
}

export default App;
