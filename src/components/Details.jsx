import React, {useEffect, useState } from 'react'
import { useParams ,useNavigate} from "react-router-dom";
import './css/details.css'
import Swal from "sweetalert2"

function Details() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [event, setEvent] = useState("")
    const [showSection, setShowSection] = useState(false);

  function toggleSection() {
    setShowSection(!showSection);
  }
 
  const isLoggedIn = sessionStorage.getItem("jwtToken") ? true : false;

  useEffect(() => {
    fetch(`https://ticket-rjnl.onrender.com/events/${id}`)
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
// booking logic

  const [amount, setAmount] = useState(0);
  const [total,setTotal] = useState(0)
  
 const event_id = event.id
  function handleSubmit(event) {
  event.preventDefault();
    const user_id = sessionStorage.getItem('user_id')
   
    const tickets = amount
    const total = totalPrice
    console.log(event_id)
 
  
console.log(user_id,event_id, tickets, total)
  fetch(`https://ticket-rjnl.onrender.com/bookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${sessionStorage.token}`,
    },
    body: JSON.stringify({user_id,event_id, tickets, total}),
  })
    .then((response) => response.json())
    .then((response) => {
      // Show success message to the user
      console.log(response)
      if (response.error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: response.error,
        });
      } else if (response.status==='created') {
        // show success message
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Booking is Successfully!',
          showConfirmButton: false,
          timer: 1500,
          
        });
        navigate('/events')
        window.location.reload()
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
      }
    });
}
    const handleAmountChange = (e) => {
    const value = parseInt(e.target.value);
    setAmount(value);
  };

  const totalPrice = event.event_price * amount; 


// handle likes 
  
   const [liked, setLiked] = useState(false);

  const handleLike = () => {
    // Send a request to the server to save the like data in the database
    fetch(`https://ticket-rjnl.onrender.com/events/${id}`, {
      method: 'POST',
      body: JSON.stringify({ id }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        // If the like was successfully saved, update the state variable to reflect that the item has been liked
        if (data.success) {
          setLiked(true);
        }
      });
  }
  
  
  // end of likes

  return (
    <div style={{ minHeight: '100vh', marginTop: '11vh', marginBottom:"5vh" }}>
      <div className='container'>
      <div style={{ background: "grey", height: "15vh", marginBottom:"10px", justifyContent:"center", display: "flex", alignItems: "center" }}>
  <h2 style={{ textTransform:"uppercase", fontSize:"35px" }}>{event.event_name}</h2>
</div>

    <div className="row">
      <div className="col">
        <div className="image-wrapper">
          <img src={event.poster_url} alt={ event.event_name} />
          <button className="like-button" onClick={handleLike} ><i className="bi bi-heart">{liked ? 'Liked' : 'Like'}</i></button>
        </div>
      </div>
      <div className="col">
          <label htmlFor='description' style={{ fontWeight: 'bold' }}>Description</label>
        <p>{ event.event_description }</p>
        <label htmlFor='time' style={{ fontWeight: 'bold' }}>Date and Time:</label>
        <p>{ event.event_date }</p>
        <p>{ event.start_time } to { event.end_time }</p>
        <label htmlFor='location' style={{ fontWeight: 'bold' }}>Location:</label>
        <p>{ event.event_location }</p>
        <label htmlFor='contact' style={{ fontWeight: 'bold' }}>Contact:</label>
            <p>{event.contact}</p>
           <button type="button" 
    class="btn btn-primary" 
    data-toggle="modal" 
    data-target={isLoggedIn ? "#bookModal" : "#loginModal"}
   onClick={() => {
  if (!isLoggedIn) {
    window.location.href = "/login";
    localStorage.setItem("lastLocation", window.location.href);
    console.log(localStorage.getItem("lastLocation"));
  } else {
    
  }
}}
    style={{
        backgroundColor: "#007bff",
        color: "#fff",
        padding: "5px",
        borderRadius: "5px",
        border: "none",
        marginRight: "10px",
    }}
>
    Book Your Ticket
</button>

            
        
        <br />
        <label htmlFor='share' style={{ fontWeight: 'bold', marginBottom: '5px', marginTop: '10px' }}>Share with friends:</label>
        <div className='d-flex'>
          <i className="bi bi-facebook" style={{ marginRight: '10px' }}></i>
          <i className="bi bi-twitter" style={{ marginRight: '10px' }}></i>
          <i className="bi bi-instagram" style={{ marginRight: '10px' }}></i>
          <i className="bi bi-whatsapp" style={{ marginRight: '10px' }}></i>
        </div>
            <p><i className="bi bi-heart-fill" style={{ color: 'red', marginRight: '5px' }}></i> {event.likes} Likes</p>
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
      <form onSubmit={(event) => handleSubmit(event, event.id)}>

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
      
    </div>
        </div>
</div>
</div>

  )
}

export default Details