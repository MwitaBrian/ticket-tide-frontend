import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Navbar from './Navbar'

function Layout() {
  return (
		<section>
			<Navbar />
			<div className='display' style={{ minHeight: "80vh" }}>
				<Outlet />
			</div>
			<Footer />
		</section>
	);
}

export default Layout