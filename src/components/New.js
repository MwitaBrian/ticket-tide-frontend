import React, { useState,useContext } from 'react';
import { EventsContext } from './context/EventContext';

function New() {
  const { addEvent } = useContext(EventsContext);
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [posterUrl, setPosterUrl] = useState('');
  const [eventPrice, setEventPrice] = useState(0);
  const [totalTickets, setTotalTickets] = useState(0);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [eventContact, setEventContact] = useState('');
  const [ageRestriction, setAgeRestriction] = useState(0);
  const [ticketInfo, setTicketInfo] = useState('');
  const [eventLineup, setEventLineup] = useState('');
  const [eventCategory, setEventCategory] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    // Do something with form data
    const event_name = eventName
    const event_date = eventDate
    const event_location = eventLocation
    const event_description = eventDescription
    const poster_url = posterUrl
    const event_price = eventPrice
    const total_tickets = totalTickets
    const start_time = startTime
    const end_time = endTime
    const contact = eventContact
    const age_restriction = ageRestriction
    const ticket_info = ticketInfo
    const lineup = eventLineup
    const category = eventCategory
    addEvent(
			event_name,
			event_date,
			event_location,
			event_description,
			poster_url,
			event_price,
			total_tickets,
			start_time,
			end_time,
			contact,
			age_restriction,
			ticket_info,
			lineup,
			category
		);
  };
    return (
			<div className='mt-5'>
				<form className='event-form m-1' onSubmit={handleSubmit}>
					<div className='row'>
						<div className='col-md-6'>
							<div className='form-group'>
								<label htmlFor='event-name'>Event Name</label>
								<input
									type='text'
									className='form-control'
									id='event-name'
									value={eventName}
									onChange={(e) => setEventName(e.target.value)}
								/>
							</div>
							<div className='form-group'>
								<label htmlFor='event-date'>Event Date</label>
								<input
									type='date'
									className='form-control'
									id='event-date'
									value={eventDate}
									onChange={(e) => setEventDate(e.target.value)}
								/>
							</div>
							<div className='form-group'>
								<label htmlFor='event-location'>Event Location</label>
								<input
									type='text'
									className='form-control'
									id='event-location'
									value={eventLocation}
									onChange={(e) => setEventLocation(e.target.value)}
								/>
							</div>
							<div className='form-group'>
								<label htmlFor='event-description'>Event Description</label>
								<textarea
									className='form-control'
									id='event-description'
									rows='3'
									value={eventDescription}
									onChange={(e) => setEventDescription(e.target.value)}
								></textarea>
							</div>
							<div className='form-group'>
								<label htmlFor='poster-url'>Poster URL</label>
								<input
									type='text'
									className='form-control'
									id='poster-url'
									value={posterUrl}
									onChange={(e) => setPosterUrl(e.target.value)}
								/>
							</div>
							<div className='form-group'>
								<label htmlFor='event-price'>Event Price</label>
								<input
									type='number'
									className='form-control'
									id='event-price'
									value={eventPrice}
									onChange={(e) => setEventPrice(e.target.value)}
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
									value={totalTickets}
									onChange={(e) => setTotalTickets(e.target.value)}
								/>
							</div>
							<div className='form-group'>
								<label htmlFor='start-time'>Start Time</label>
								<input
									type='time'
									className='form-control'
									id='start-time'
									value={startTime}
									onChange={(e) => setStartTime(e.target.value)}
								/>
							</div>
							<div className='form-group'>
								<label htmlFor='endTime'>End Time:</label>
								<input
									type='time'
									id='endTime'
									className='form-control'
									value={endTime}
									onChange={(e) => setEndTime(e.target.value)}
								/>
							</div>
							<div className='form-group'>
								<label htmlFor='contact'>Contact:</label>
								<input
									type='text'
									id='contact'
									className='form-control'
									value={eventContact}
									onChange={(e) => setEventContact(e.target.value)}
								/>
							</div>
							<div className='form-group'>
								<label htmlFor='contact'>Category:</label>
								<input
									type='text'
									id='contact'
									className='form-control'
									value={eventCategory}
									onChange={(e) => setEventCategory(e.target.value)}
								/>
							</div>
							<div className='form-group'>
								<label htmlFor='ageRestriction'>Age Restriction:</label>
								<input
									type='number'
									id='ageRestriction'
									className='form-control'
									value={ageRestriction}
									onChange={(e) => setAgeRestriction(e.target.value)}
								/>
							</div>
						
							<div className='form-group'>
								<label htmlFor='ticketInfo'>Ticket Info:</label>
								<textarea
									id='ticketInfo'
									className='form-control'
									value={ticketInfo}
									onChange={(e) => setTicketInfo(e.target.value)}
								></textarea>
							</div>
							<div className='form-group'>
								<label htmlFor='lineup'>Lineup:</label>
								<textarea
									id='lineup'
									className='form-control'
									value={eventLineup}
									onChange={(e) => setEventLineup(e.target.value)}
								></textarea>
							</div>
						</div>
					</div>
					<button
						style={{
							margin: "20px",
							padding: "7px",
							borderRadius: "20px",
							color: "#FBFBFF",
							background: "#1E90FF",
							border: "none",
						}}
					>
						Create An Event
					</button>
				</form>
			</div>
		);
          }
export default New;