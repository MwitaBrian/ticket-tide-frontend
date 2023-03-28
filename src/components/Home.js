import React from 'react'

function Home() {
  return (
    <div className='text-white'>
      <div className="flex flex-row justify-between mt-8 px-8">
        <h1 className="text-2xl">Events</h1>
        <input className='bg-gray-200 py-2 px-3 rounded-full' placeholder='Search for events...' type='text' />
        <button className='rounded rounded-none hover:rounded-full text-green-600 bg-sky-900'>Search</button>
      </div>

    </div>
  )
}

export default Home