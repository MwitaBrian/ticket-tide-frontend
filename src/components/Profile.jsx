import React, { useState, useContext, useEffect} from 'react'
import { EventsContext } from './context/EventContext';
import Swal from "sweetalert2"
import { useNavigate } from 'react-router-dom';

function Profile() {
 const navigate = useNavigate()
    const access = sessionStorage.getItem("level");

  
  const { events } = useContext(EventsContext)
 
  const [data, setData] = useState({});
const bookings = data.bookings;

  const last_name = data.last_name
  const first_name = data.first_name
  const email = data.email
  const phone = data.phone
  const image = data.image
  const level = data.level

// handle update
  // const id = sessionStorage.getItem('user_id')
  // console.log(id)
  function handleSubmit(e) {
    e.preventDefault();
    const id = sessionStorage.getItem('user_id')
    fetch(`https://ticket-rjnl.onrender.com/users/${id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${sessionStorage.token}`
      }, body: JSON.stringify({
        first_name,last_name,email,phone,level,image
      })
    })
      .then(res => res.json())
      .then(data => {
      console.log(data)
    })
  }

  
  // user details
const id = sessionStorage.getItem('user_id')
  // function userInfo() {
  useEffect(() => {
    fetch(`https://ticket-rjnl.onrender.com/users/${id}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${sessionStorage.jwtToken}`,
			},
		})
			.then((res) => res.json())
			.then((response) => {
        // console.log(response);
        setData(response)
        //  console.log(response);
				// navigate('/profile')

				// do something with the user info here
			})
			.catch((error) => console.error(error));
  },[id])
		
	// }
  
  // end
const [bryan, setBryan] = useState({})
  function showDetail(id) {

    fetch(`https://ticket-rjnl.onrender.com/events/${id}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${sessionStorage.token}`
      }
     })
    .then(res => res.json())
    .then(response => {
      setBryan(response)
      
  })
  }
 function handleUserDelete() {
  const id = sessionStorage.getItem('user_id');
  
  Swal.fire({
    title: 'Are you sure?',
    text: "This action cannot be undone!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(`https://ticket-rjnl.onrender.com/users/${id}`, {
        method: 'DELETE'
      })
        .then(response => response.json())
        .then(data => {
          if (data.errors) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: data.errors,
            });
          } else {
            // Clear session storage
            sessionStorage.clear();
            // Navigate to register page
            window.location.replace('/register');
          }
        })
        .catch(error => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          });
        });
    }
  });
}


  
function handleDelete(id) {
  fetch(`https://ticket-rjnl.onrender.com/events/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.token}`,
    }
  })
    .then(response => response.json())
    .then(data => {
      // show success alert
      Swal.fire({
        title: 'Removed from collection!',
        icon: 'success',
      });
      document.location.reload()
    })
    .catch(error => {
      // handle error
      console.error(error);
      Swal.fire({
        title: 'Error',
        text: 'Failed to remove bryan',
        icon: 'error',
      });
    });
}

  const event_name = bryan.event_name
  const start_time = bryan.start_time
  const end_time = bryan.end_time
  const age_restriction = bryan.age_restriction
  const category = bryan.category
  const event_date = bryan.event_date
  const total_tickets = bryan.total_tickets
  const event_description = bryan.event_description
  const event_location = bryan.event_location
  const event_price = bryan.event_price
  const lineup = bryan.lineup
  const poster_url = bryan.poster_url
  const ticket_info = bryan.ticket_info
  const contact = bryan.contact
 
  function handleUpdate(e) {
    e.preventDefault();
    const id= bryan.id
    console.log({
      event_date, event_name, start_time, end_time, age_restriction,
      event_location, category, ticket_info, total_tickets, event_price,
      event_description, poster_url, lineup, contact
    })
 
    fetch(`https://ticket-rjnl.onrender.com/events/${id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${sessionStorage.token}`
      },
      body: JSON.stringify({
        event_date, event_name, start_time, end_time, age_restriction,
        event_location, category, ticket_info, total_tickets, event_price,
        event_description,poster_url,lineup,contact
      })
    })
    .then(res=> res.json())
      .then(response => {
        console.log(response)
        if (response.status === 'success') {
            // show success message 
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Event updated Successfully!',
                    showConfirmButton: false,
                    timer: 1500
                    })
        } else {
          Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Event could not be updated!',
                  })
        }
    })
}
 const userId = sessionStorage.getItem('user_id');

  
  // fetch bookings where user id 
 fetch(`https://ticket-rjnl.onrender.com/user/${userId}/bookings`, {
  method: 'GET',
  headers: {
    "Content-Type": "application/json",
    'Authorization': `Bearer ${sessionStorage.token}`
  }
})
.then(res => res.json())
.then(response => {
  console.log(response)
})
.catch(error => {
  console.error('Error:', error);
});

    return (
      
        <div style={{ marginTop: "10vh" }}>
            <div className='container-md'>
                <div>
                    <div className='row'>
                        <div className='col'>
                            <h5>My Profile</h5>
                            <div className='data'>
                          <form onSubmit={handleSubmit}>
  <div>
    <label htmlFor="first-name">First Name</label><br/>
    <input
      type="text"
      id="first-name"
      name="first_name"
     onChange={(e) =>
													setData({ ...data, first_name: e.target.value })
												}
                        value={data.first_name}
                      
    />
  </div>
  <div>
    <label htmlFor="last-name">Last Name</label><br/>
    <input
                        type="text"
                        id="last-name"
                        name='last_name'
     
                        
                        onChange={(e) =>
                          setData({ ...data, last_name: e.target.value })}
                        value={data.last_name}
    />
  </div>
  <div>
    <label htmlFor="email">Email</label><br/>
    <input
      type="text"
      id="email"
      name="email"
                        onChange={(e) =>
                          setData({ ...data, email: e.target.value })}
      value={data.email}
    />
  </div>
  <div>
    <label htmlFor="phone">Phone</label><br/>
    <input
      type="tel"
      id="phone"
      name="phone"
     onChange={(e) =>
													setData({ ...data, phone: e.target.value })}
      value={data.phone}
    />
  </div>
  <div>
    <label htmlFor="image">Image</label><br/>
    <input
      type="file"
      id="image"
                        name="image"
                       onChange={(e) =>
                         setData({ ...data, image: e.target.files[0] })}
                        
    />
  </div>
  <div className='d-flex gap-4'>
    <button type='submit'>Update</button>
    <button type='button' onClick={handleUserDelete}>Delete</button>
  </div>
</form>

                            </div>
                        </div>
                        <div className='col'>
                            {access === "admin" ?
                                    (
                                        <>
                      <div>
                        <div className='d-flex gap-5'>
                          <h5>EVENTS</h5>
                          <button type='button'>Create new bryan</button>
                        </div>
                        <div>
                          {events && events.map((bryan, index) => (
                            <card className='d-flex gap-4' style={{margin:"7px"}} key={index}>
                            <img style={{width:"200px", height:"120px"}} src={bryan.poster_url} alt=''/>
                            <div>
                                <p>{bryan.event_name}</p>
                                <p>{bryan.event_date} {bryan.start_time}</p>
                                <div className='d-flex gap-5'>
                                    <button type="button" onClick={(e) => showDetail(bryan.id)} className="btn btn-primary" data-toggle="modal" data-target="#bookModal"><i className='bi bi-pencil-square'></i></button>
                                <button type='submit' onClick={(e)=> handleDelete(bryan.id)}><i className='bi bi-trash'></i></button>
                                </div>
                            </div>
                            </card>
                             ))}
                        </div>
                                        </div>
                                        </>
                                    ) : (
                                        <>
                      <div>
                        <h5>my bookings</h5>

                                        <div>
      <h3>Bookings</h3>
      {bookings && bookings.map(booking => (
        <div key={booking.id}>
          {/* <p>Event: {booking.event.event_name}</p> */}
          <p>Tickets: {booking.tickets}</p>
          <p>Total Price: {booking.total}</p>
        </div>
      ))}
    </div>


                      </div> 
                                        </>
                                    )
                            }
                        </div>
            </div>
            <div className="modal fade" id="bookModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLongTitle"></h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
              	<form className='bryan-form m-1' onSubmit={handleUpdate}>
					<div className='row'>
						<div className='col-md-6'>
							<div className='form-group'>
								
		<label htmlFor='bryan-name'>Event Name</label>
		<input
			type='text'
			className='form-control'
                              id='event_name'
                              name='event_name'
		onChange={(e) =>
													setBryan({ ...bryan, event_name: e.target.value })}
      value={bryan.event_name}
		/>
	</div>
	<div className='form-group'>
		<label htmlFor='bryan-date'>Event Date</label>
		<input
			type='date'
			className='form-control'
			id='event_date'
			onChange={(e) =>
													setBryan({ ...bryan, event_date: e.target.value })}
      value={bryan.event_date}
		/>
	</div>
	<div className='form-group'>
		<label htmlFor='bryan-location'>Event Location</label>
		<input
			type='text'
			className='form-control'
			id='event_location'
			onChange={(e) =>
													setBryan({ ...bryan, event_location: e.target.value })}
      value={bryan.event_location}
		/>
	</div>
							<div className='form-group'>
								<label htmlFor='bryan-description'>Event Description</label>
								<textarea
  className='form-control'
  id='eventdescription'
                              rows='3'
                              
  value={bryan.event_description}
  onChange={(e) => setBryan({ ...bryan, event_description: e.target.value })}
></textarea>
							</div>
							<div className='form-group'>
								<label htmlFor='poster-url'>Poster URL</label>
								<input
									type='text'
									className='form-control'
									id='poster-url'
									onChange={(e) =>
													setBryan({ ...bryan, poster_url: e.target.value })}
      value={bryan.poster_url}
								/>
							</div>
							<div className='form-group'>
								<label htmlFor='bryan-price'>Event Price</label>
								<input
									type='number'
									className='form-control'
									id='bryan-price'
									onChange={(e) =>
													setBryan({ ...bryan, event_price: e.target.value })}
      value={bryan.event_price}
								/>
							</div>
						</div>
						<div className='col-md-6'>
							<div className='form-group'>
								<label htmlFor='total-tickets'>Total Tickets</label>
								<input
									type='number'
									className='form-control'
									id='total-tickets'
									onChange={(e) =>
													setBryan({ ...bryan, total_tickets: e.target.value })}
      value={bryan.total_tickets}
								/>
							</div>
							<div className='form-group'>
								<label htmlFor='start-time'>Start Time</label>
								<input
									type='text'
									className='form-control'
									id='start-time'
									onChange={(e) =>
													setBryan({ ...bryan, start_time: e.target.value })}
      value={bryan.start_time}
								/>
							</div>
							<div className='form-group'>
								<label htmlFor='endTime'>End Time:</label>
								<input
									type='text'
									id='endTime'
									className='form-control'
									onChange={(e) =>
													setBryan({ ...bryan, end_time: e.target.value })}
      value={bryan.end_time}
								/>
							</div>
							<div className='form-group'>
								<label htmlFor='contact'>Contact:</label>
								<input
									type='text'
									id='contact'
									className='form-control'
									onChange={(e) =>
													setBryan({ ...bryan, contact: e.target.value })}
      value={bryan.contact}
								/>
							</div>
							<div className='form-group'>
								<label htmlFor='contact'>Category:</label>
								<input
									type='text'
									id='contact'
									className='form-control'
								onChange={(e) =>
													setBryan({ ...bryan, cotegory: e.target.value })}
      value={bryan.category}
								/>
							</div>
							<div className='form-group'>
								<label htmlFor='ageRestriction'>Age Restriction:</label>
								<input
									type='number'
									id='ageRestriction'
									className='form-control'
									onChange={(e) =>
													setBryan({ ...bryan, age_restriction: e.target.value })}
      value={bryan.age_restriction}
								/>
							</div>
						
							<div className='form-group'>
								<label htmlFor='ticketInfo'>Ticket Info:</label>
							<textarea
  id='ticketInfo'
  className='form-control'
  value={bryan.ticket_info}
  onChange={(e) => setBryan({ ...bryan, ticket_info: e.target.value })}
></textarea>
							</div>
							<div className='form-group'>
								<label htmlFor='lineup'>Lineup:</label>
								<textarea
  id='lineup'
  className='form-control'
  value={bryan.lineup}
  onChange={(e) => setBryan({ ...bryan, event_lineup: e.target.value })}
></textarea>
							</div>
						</div>
                      </div>
                      <button type='submit'>Update</button>
    </form>
      </div>
    </div>
  </div>
</div>
                </div>
            </div>
           
    </div>
   
  )
}

export default Profile