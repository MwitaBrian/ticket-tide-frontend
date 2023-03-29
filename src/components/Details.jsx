import React, {useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import './css/details.css'

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

    const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [description, setDescription] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(`/events/${event.id}/payments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
      },
      body: JSON.stringify({ payment: { amount, currency, description }})
    });

    if (response.ok) {
      // Payment created successfully
    } else {
      // Handle payment error
    }
  };

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
                  <h1>PLease login first to access this</h1>
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
                <div className='row'>
                  <div className='col'></div>
                   <div className='col'></div>
                </div>
                <h5>Ticket: ${ event.event_price}</h5>
      <label htmlFor="amount">Amount</label>
      <input type="text" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} />

      <label htmlFor="currency">Currency</label>
      <select id="currency" value={currency} onChange={(e) => setCurrency(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
        <option value="KES">KES</option>
        <option value="CAD">CAD</option>
      </select>

      <label htmlFor="description">Description</label>
      <input type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />

      <button type="submit">Pay Now</button> 
      <button type="button" >Cancel</button>
    </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">BOOK</button>
        <button type="button" class="btn btn-primary">Cancel</button>
      </div>
    </div>
  </div>
</div>
</div>

  )
}

export default Details