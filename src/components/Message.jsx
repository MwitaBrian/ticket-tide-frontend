import React, { useEffect, useState } from 'react'

function Message() {
const[messages, setMessages] = useState()
    useEffect = (() => {
    fetch(`https://ticket-rjnl.onrender.com/messages`)
        .then(res => res.json())
        .then(response => {
            console.log(response)
        setMessages(response)
    })
},[])
    
  return (
      <div style={{ marginTop: "10vh" }}>
          <div className='container-md'>
              <h5>MESSAGES</h5>
              <div>
                  {messages && messages.map(message => (
                   <div key= {message.id}>
              <p>{message.name}</p>
            <p>{message.email}</p> 
               
            <p> {message.message}</p>
                 
            </div>
          ))}
              </div>
          </div> 
      </div>
  )
}

export default Message