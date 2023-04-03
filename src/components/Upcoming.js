import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import './css/upcoming.css'
function Upcoming() {
      const [events, setEvents] = useState([]);
     useEffect(() => {
    // Fetch data from the backend
    fetch(`https://ticket-rjnl.onrender.com/events`)
			.then((res) => res.json())
			.then((data) => {
				// Map over the events and format the dates and times
				const formattedEvents = data.map((event) => ({
					...event,
					start_time: new Date(event.start_time).toLocaleTimeString([], {
						hour: "numeric",
						minute: "2-digit",
					}),
					end_time: new Date(event.end_time).toLocaleTimeString([], {
						hour: "numeric",
						minute: "2-digit",
					}),
					event_date: new Date(event.event_date).toLocaleDateString([], {
						day: "numeric",
						weekday: "short",
						month: "short",
						year: "numeric",
					}),
				}));
				setEvents(formattedEvents);
			})
			.catch((error) => console.error(error));
     }, []);
    const upcomingEvents = events.slice(0, 3)
  return (
		<div>
			<div className='events-section'>
				<div className='container-md'>
					<h1
						className='section-header'
						style={{
							color: "#1E90FF",
							fontSize: "20px",
							textTransform: "uppercase",
							fontWeight: "900",
							marginTop: "20px",
						}}
					>
						Upcoming Events
					</h1>
					<div className='row'>
						{upcomingEvents.map((event) => (
							<div className='col' key={event.id}>
								<div className='event-poster'>
									<div className='event-date'>
										<p>{event.event_date}</p>
									</div>
									<img
										src={event.poster_url}
										alt='Event'
										style={{  height: "400px" }}
									/>
									<div className='event-details'>
										<h3 style={{fontSize:"20px", fontWeight:"900"}}>{event.event_name}</h3>
										<p>{event.event_location}</p>
										<Link to={`/details/${event.id}`} className='ms-auto'>
											View Details
										</Link>
									</div>
								</div>
							</div>
						))}
					</div>
					<div
						className='btn-container'
						style={{
							display: "grid",
							justifyItems: "center",
							marginBottom: "30px",
							marginTop: "20px",
						}}
					>
						<button
							style={{
								padding: "5px",
								borderRadius: "30px",
								background: "#1E90FF",
								border: "none",
								width: "auto",
								justifySelf: "center",
							}}
						>
							<Link
								to='/events'
								style={{ color: "#fff", textDecoration: "none" }}
							>
								SEE ALL UPCOMING EVENTS
							</Link>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
export default Upcoming