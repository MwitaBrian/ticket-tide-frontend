import React, { useState, useContext } from 'react'
import Swal from 'sweetalert2';
import { EventsContext } from '../context/EventContext';

function Listings() {
const { events } = useContext(EventsContext)

// my states  
  const [bryan, setBryan] = useState({})
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
    
    // fetch details of a particular event
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
  
    // Delete an event
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

    // Updating an event
  function handleUpdate(e) {
    e.preventDefault();
    const id= bryan.id
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
              {/* Display the events  */}

              <div>
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

              {/* End of events */}
              {/* popup modal */}
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
      <div className="modal-footer">
        <button type="submit" className="btn btn-secondary" data-dismiss="modal">Update</button>
        <button type="button" className="btn btn-primary">Cancel</button>
      </div>
    </div>
  </div>
</div>
              {/* end of popup modal */}
         </div>
      </div>
  )
}

export default Listings