import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className='flex flex-row flex-wrap gap-4 justify-evenly py-4 bg-blue-600 text-white'>
      <div className='text-2xl font-semibold'>
        <h1>TicketTide</h1>
      </div>
      <div className='flex gap-8 text-white font-semibold'>
        <Link to ="/">Home</Link>
        <Link to ="/tickets">Tickets</Link>
        <Link to ="/">Login</Link>
        <Link to ="/">Signup</Link>
      </div>
    </nav>
  )
}

export default Navbar