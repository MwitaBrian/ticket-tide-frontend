import './App.css';
import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './components/Home';
import Layout from './components/layout/Layout';
import Login from './components/Login';
import Events from './components/Events';
import Register from './components/Register';
import Details from './components/Details';
import New from './components/New';
import Payment from './components/Payment';
import AuthProvider from './components/context/AuthContext';



function App() {
 
  return (

		<BrowserRouter>
			<AuthProvider>
				<Routes>
					<Route path='/' element={<Layout />}>
						<Route index element={<Home />} />
						<Route path='/login' element={<Login />} />
						<Route path='/register' element={<Register />} />
						<Route path='/events' element={<Events />} />
						<Route path='/details/:id' element={<Details />} />
						<Route path='/new' element={<New />} />
						<Route path='/Payment' element={<Payment />} />
					</Route>
				</Routes>
			</AuthProvider>
		</BrowserRouter>
	);


}

export default App;
