import React, {useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import './css/details.css'
import Swal from "sweetalert2"

function Details() {
  const { id } = useParams();
  const [event, setEvent] = useState("")
 
  const isLoggedIn = sessionStorage.getItem("jwtToken") ? true : false;

  useEffect(() => {
    fetch(`events/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const formattedEvent = {
          ...data,
          start_time: new Date(data.start_time).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
          end_time: new Date(data.end_time).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
          event_date: new Date(data.event_date).toLocaleDateString([], {day: 'numeric', weekday: 'short', month: 'short', year: 'numeric'}),
        };
        setEvent(formattedEvent);
      });
  }, [id]);

  const [amount, setAmount] = useState(0);
  const [total,setTotal] = useState(0)
  
 const event_id = event.id
  function handleSubmit(event) {
  event.preventDefault();
    const user_id = sessionStorage.getItem('user_id')
   
    const tickets = amount
    const total = totalPrice
   
 
  
console.log(user_id,event_id, tickets, total)
  fetch(`http://localhost:3000/bookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.token}`,
    },
    body: JSON.stringify({user_id,event_id, tickets, total}),
  })
    .then((response) => response.json())
    .then((response) => {
      // Show success message to the user
   if(response.error){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: response.error,
                  })
            }
            else if (response.booking) {
                // show success message 
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Booking in Successfully!',
                    showConfirmButton: false,
                    timer: 1500
                    })

            }
            else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                  })
            }
    })
    
}


  const handleAmountChange = (e) => {
    const value = parseInt(e.target.value);
    setAmount(value);
  };

  const totalPrice = event.event_price * amount; 


  return (
    <div style={{ minHeight: '100vh', marginTop: '70px' }}>
  <div className='container'>
    <h2 style={{ textAlign: 'left', marginBottom: '20px' }}>Details</h2>
    <div className="row">
      <div className="col">
        <div className="image-wrapper">
          <img src={event.poster_url} alt={ event.event_name} />
          <button className="like-button"><i className="bi bi-heart"></i></button>
        </div>
      </div>
      <div className="col">
        <h2>{ event.event_name }</h2>
        <p>{ event.event_description }</p>
        <label htmlFor='time' style={{ fontWeight: 'bold' }}>Date and Time:</label>
        <p>{ event.event_date }</p>
        <p>{ event.start_time } to { event.end_time }</p>
        <label htmlFor='location' style={{ fontWeight: 'bold' }}>Location:</label>
        <p>{ event.event_location }</p>
        <label htmlFor='contact' style={{ fontWeight: 'bold' }}>Contact:</label>
            <p>{event.contact}</p>
            {isLoggedIn ? (
              <>
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#bookModal"
                
            style={{ backgroundColor: '#007bff', color: '#fff', padding: '5px', borderRadius: '5px', border: 'none', marginRight: '10px' }}
            >
            Book Your Ticket
            </button>
              </>
            ) : (
                <>
                  <h5>PLease login first to access this</h5>
                </>
              )
              
            }
            
        
        <br />
        <label htmlFor='share' style={{ fontWeight: 'bold', marginBottom: '5px', marginTop: '10px' }}>Share with friends:</label>
        <div className='d-flex'>
          <i className="bi bi-facebook" style={{ marginRight: '10px' }}></i>
          <i className="bi bi-twitter" style={{ marginRight: '10px' }}></i>
          <i className="bi bi-instagram" style={{ marginRight: '10px' }}></i>
          <i className="bi bi-whatsapp" style={{ marginRight: '10px' }}></i>
        </div>
        <p><i className="bi bi-heart-fill" style={{ color: 'red', marginRight: '5px' }}></i>Likes</p>
      </div>
    </div>
      </div>
      
<div class="modal fade" id="bookModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">{ event.event_name}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
           <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col"></div>
        <div className="col"></div>
                </div>
        <h5>{event.id}</h5>
      <h5>Ticket Price: ${event.event_price}</h5>
      <h5>Tickets left: {parseInt(event.total_tickets)}</h5>
      <label htmlFor="amount">Number of tickets: </label>
      <input
        type="number"
        id="amount"
        value={amount}
        onChange={handleAmountChange}
      />
      <label htmlFor="total">Total: </label>
      <input
        type="number"
        id="total"
                  value={totalPrice}
                  onChange={(event) =>
													setTotal( event.target.value )}
                 
        disabled
      />
      <button type="submit">Buy Tickets</button>
    </form>
      </div>
      <div class="modal-footer">
        <button type="submit" class="btn btn-secondary" data-dismiss="modal" onClick={() => {alert("Booking confirmed!");}}>BOOK</button>
        <button type="button" class="btn btn-primary">Cancel</button>
      </div>
    </div>
  </div>
</div>
</div>

  )
}

export default Details