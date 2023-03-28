import React, {useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import './css/details.css'

function Details() {
  const { id } = useParams();
  const [event, setEvent] = useState("")
  console.log(event)

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
        <p>{ event.contact }</p>
        <button style={{ backgroundColor: '#007bff', color: '#fff', padding: '5px', borderRadius: '5px', border: 'none', marginRight: '10px' }}>Book Your Ticket</button>
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
</div>

  )
}

export default Details