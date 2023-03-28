import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
function Events() {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);
  useEffect(() => {
    // Fetch data from the backend
    fetch(`/events`)
      .then(res => res.json())
      .then(data => {
        // Map over the events and format the dates and times
        const formattedEvents = data.map(event => ({
          ...event,
          start_time: new Date(event.start_time).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
          end_time: new Date(event.end_time).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
          event_date: new Date(event.event_date).toLocaleDateString([], {day: 'numeric', weekday: 'short', month: 'short', year: 'numeric'}),
        }));
        setEvents(formattedEvents);
      })
      .catch(error => console.error(error));
  }, []);
useEffect(() => {
  // Filter events based on search query
  if (events.length > 0) {
    const filteredEvents = events.filter(event => {
      const eventName = event.event_name || '';
      const location = event.location || '';
      const search = searchQuery;
      return eventName.includes(search) || location.includes(search);
    });
    setFilteredEvents(filteredEvents);
  }
}, [searchQuery, events]);
  const handleSearch = event => {
    setSearchQuery(event.target.value);
  };
  return (
    <div style={{ minHeight: '100vh', marginTop: '70px' }}>
      <div className='container-md'>
                <div>
          <div className='form-container d-flex' style={{background:"#F0F0F0", justifyContent:"center", padding:"15px"}}>
            <div>
              <label htmlFor="event-name">Searching htmlFor...</label>
              <input type="text" id="event-name" name="event-name" placeholder='Event Name' style={{width:"90%"}} value={searchQuery} onChange={handleSearch} />
            </div>
            <div>
              <label htmlFor="location">Where it should be?</label>
              <input type="text" id="location" name="location" placeholder="Event Location"style={{width:"90%"}} value={searchQuery} onChange={handleSearch} />
            </div>
            <div>
              <label htmlFor="date">On Which Date?</label>
              <input type="date" id="date" name="date" placeholder='Pick a day' style={{width:"90%"}} value={searchQuery} onChange={handleSearch} />
            </div>
          </div>
        </div>
        <div className='row'>
          {/* Map over events array and create a card for each item */}
          {filteredEvents.map((event, index) => (
            <div className='card' key={index} style={{ maxWidth:"350px", margin:"auto", marginBottom:"10px", Height:"350px"}}>
              <img className='card-img-top' src={event.poster_url} alt={event.event_name} />
              <div className='card-body'>
                <p>{event.event_date} {event.start_time}</p>
                <h4 className='card-title'>{event.event_name}</h4>
                <p>{event.category}</p>
                <div className='d-flex'>
                  <p>
                    <i className='bi bi-heart-fill' style={{ fontSize: '1rem', color: 'red' }}></i>
                    likes
                  </p>
                  <Link to={`/details/${event.id}`} className='ms-auto'>
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Events;