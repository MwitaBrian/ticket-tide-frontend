import React, { useState, useContext, useEffect} from 'react'
import { EventsContext } from './context/EventContext';
import Swal from "sweetalert2"

function Profile() {
 
    const access = sessionStorage.getItem("level");

  
  const { events } = useContext(EventsContext)
 
  const [data, setData] = useState({});


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
    console.log(first_name, last_name, email, phone, level, image)
    fetch(`http://localhost:3000/users/${id}`, {
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
    fetch(`http://localhost:3000/users/${id}`, {
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
         console.log(response);
				// navigate('/profile')

				// do something with the user info here
			})
			.catch((error) => console.error(error));
  },[id])
		
	// }
  
  // end
const [bryan, setBryan] = useState({})
  function showDetail(id) {

    fetch(`http://localhost:3000/events/${id}`, {
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
  
function handleDelete(id) {
  fetch(`/events/${id}`, {
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
    console.log({
      event_date, event_name, start_time, end_time, age_restriction,
      event_location, category, ticket_info, total_tickets, event_price,
      event_description, poster_url, lineup, contact
    })
 
    fetch(`http://localhost:3000/events/${id}`, {
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
    })
}
 
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
     onChange={(bryan) =>
													setData({ ...data, first_name: bryan.target.value })
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
     
                        value={data.last_name}
                        onChange={(bryan) =>
                          setData({ ...data, last_name: bryan.target.value })}
    />
  </div>
  <div>
    <label htmlFor="email">Email</label><br/>
    <input
      type="text"
      id="email"
      name="email"
                        onChange={(bryan) =>
                          setData({ ...data, email: bryan.target.value })}
      value={data.email}
    />
  </div>
  <div>
    <label htmlFor="phone">Phone</label><br/>
    <input
      type="tel"
      id="phone"
      name="phone"
     onChange={(bryan) =>
													setData({ ...data, phone: bryan.target.value })}
      value={data.phone}
    />
  </div>
  <div>
    <label htmlFor="image">Image</label><br/>
    <input
      type="file"
      id="image"
                        name="image"
                       onChange={(bryan) =>
													setData({ ...data, image: bryan.target.files[0] })}
    />
  </div>
  <div className='d-flex gap-4'>
    <button type='submit'>Update</button>
    <button type='button' onClick={handleDelete}>Delete</button>
  </div>
</form>

                            </div>
                        </div>
                        <div className='col'>
                            {access === "admin" ?
                                    (
                                        <>
                      <div>
                        <div className='d-flex'>
                          <h5>EVENTS</h5>
                          <button>Create new bryan</button>
                        </div>
                        <div>
                          {events && events.map((bryan, index) => (
                            <card className='d-flex gap-4' style={{margin:"7px"}} key={index}>
                            <img style={{width:"200px", height:"120px"}} src={bryan.poster_url} alt=''/>
                            <div>
                                <p>{bryan.event_name}</p>
                                <p>{bryan.event_date} {bryan.start_time}</p>
                                <button type="button" onClick={(e) => showDetail(bryan.id)} class="btn btn-primary" data-toggle="modal" data-target="#bookModal"><i className='bi bi-pencil-square'></i></button>
                                <button type='submit' onClick={(e)=> handleDelete(bryan.id)}><i className='bi bi-trash'></i></button>
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
                      </div> 
                                        </>
                                    )
                            }
                        </div>
            </div>
            <div class="modal fade" id="bookModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle"></h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
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
		onChange={(bryan) =>
													setBryan({ ...bryan, event_name: bryan.target.value })}
      value={bryan.event_name}
		/>
	</div>
	<div className='form-group'>
		<label htmlFor='bryan-date'>Event Date</label>
		<input
			type='date'
			className='form-control'
			id='event_date'
			onChange={(bryan) =>
													setBryan({ ...bryan, event_date: bryan.target.value })}
      value={bryan.event_date}
		/>
	</div>
	<div className='form-group'>
		<label htmlFor='bryan-location'>Event Location</label>
		<input
			type='text'
			className='form-control'
			id='event_location'
			onChange={(bryan) =>
													setBryan({ ...bryan, event_location: bryan.target.value })}
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
									onChange={(bryan) =>
													setBryan({ ...bryan, poster_url: bryan.target.value })}
      value={bryan.poster_url}
								/>
							</div>
							<div className='form-group'>
								<label htmlFor='bryan-price'>Event Price</label>
								<input
									type='number'
									className='form-control'
									id='bryan-price'
									onChange={(bryan) =>
													setBryan({ ...bryan, event_price: bryan.target.value })}
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
									onChange={(bryan) =>
													setBryan({ ...bryan, total_tickets: bryan.target.value })}
      value={bryan.total_tickets}
								/>
							</div>
							<div className='form-group'>
								<label htmlFor='start-time'>Start Time</label>
								<input
									type='text'
									className='form-control'
									id='start-time'
									onChange={(bryan) =>
													setBryan({ ...bryan, start_time: bryan.target.value })}
      value={bryan.start_time}
								/>
							</div>
							<div className='form-group'>
								<label htmlFor='endTime'>End Time:</label>
								<input
									type='text'
									id='endTime'
									className='form-control'
									onChange={(bryan) =>
													setBryan({ ...bryan, end_time: bryan.target.value })}
      value={bryan.end_time}
								/>
							</div>
							<div className='form-group'>
								<label htmlFor='contact'>Contact:</label>
								<input
									type='text'
									id='contact'
									className='form-control'
									onChange={(bryan) =>
													setBryan({ ...bryan, contact: bryan.target.value })}
      value={bryan.contact}
								/>
							</div>
							<div className='form-group'>
								<label htmlFor='contact'>Category:</label>
								<input
									type='text'
									id='contact'
									className='form-control'
								onChange={(bryan) =>
													setBryan({ ...bryan, cotegory: bryan.target.value })}
      value={bryan.category}
								/>
							</div>
							<div className='form-group'>
								<label htmlFor='ageRestriction'>Age Restriction:</label>
								<input
									type='number'
									id='ageRestriction'
									className='form-control'
									onChange={(bryan) =>
													setBryan({ ...bryan, age_restriction: bryan.target.value })}
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
  value={bryan.event_lineup}
  onChange={(e) => setBryan({ ...bryan, event_lineup: e.target.value })}
></textarea>
							</div>
						</div>
                      </div>
                      <button type='submit'>Update</button>
    </form>
      </div>
      <div class="modal-footer">
        <button type="submit" class="btn btn-secondary" data-dismiss="modal">Update</button>
        <button type="button" class="btn btn-primary">Cancel</button>
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