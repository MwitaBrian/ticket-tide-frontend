import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { EventsContext } from './context/EventContext';

function Events() {
 const { events } = useContext(EventsContext);

const [searchQuery, setSearchQuery] = useState("");
const [categoryFilter, setCategoryFilter] = useState("All");
const [filteredEvents, setFilteredEvents] = useState([]);

const handleSearch = (event) => {
	const query = event.target.value.toLowerCase();
	setSearchQuery(query);
	if (events) {
		const filtered = events.filter(
			(event) =>
				event.event_name && event.event_name.toLowerCase().includes(query)
		);
		if (categoryFilter !== "All") {
			const filteredByCategory = filtered.filter(
				(event) => event.category === categoryFilter
			);
			setFilteredEvents(filteredByCategory);
		} else {
			setFilteredEvents(filtered);
		}
	}
};

const handleFilterChange = (event) => {
	const category = event.target.value;
	setCategoryFilter(category);
	if (events) {
		if (category !== "All") {
			const filteredByCategory = events.filter(
				(event) => event.category === category
			);
			const filteredByCategoryAndSearch = filteredByCategory.filter(
				(event) =>
					event.event_name &&
					event.event_name.toLowerCase().includes(searchQuery)
			);
			setFilteredEvents(filteredByCategoryAndSearch);
		} else {
			const filteredBySearch = events.filter(
				(event) =>
					event.event_name &&
					event.event_name.toLowerCase().includes(searchQuery)
			);
			setFilteredEvents(filteredBySearch);
		}
	}
};

useEffect(() => {
	if (events) {
		if (categoryFilter === "All") {
			const filteredBySearch = events.filter(
				(event) =>
					event.event_name &&
					event.event_name.toLowerCase().includes(searchQuery)
			);
			setFilteredEvents(filteredBySearch);
		} else {
			const filteredByCategory = events.filter(
				(event) => event.category === categoryFilter
			);
			const filteredByCategoryAndSearch = filteredByCategory.filter(
				(event) =>
					event.event_name &&
					event.event_name.toLowerCase().includes(searchQuery)
			);
			setFilteredEvents(filteredByCategoryAndSearch);
		}
	}
}, [events, searchQuery, categoryFilter]);


const categories = [  "All",  "Concerts",  "Festivals",  "Parties",  "Meetups",  "Workshops",  "Music",  "Community",  "Other"];


  return (
		<div style={{ minHeight: "100vh", marginTop: "70px" }}>
			<div className='container-md'>
				<div>
					<div
						className='form-container d-flex'
						style={{
							background: "#F0F0F0",
							justifyContent: "center",
							padding: "15px",
						}}
					>
						<div>
							<label htmlFor='event-name'>Search by Event Name:</label>
							<input
								type='text'
								id='event-name'
								name='event-name'
								value={searchQuery}
								placeholder='Event Name'
								onChange={handleSearch}
								style={{ width: "90%" }}
							/>
						</div>
						<div className='ms-4'>
							<label htmlFor='category-filter'>Filter by Category:</label>
							<br />
							<select
								style={{ padding: "10px", background: "#fbfbff" }}
								id='category-filter'
								value={categoryFilter}
								onChange={handleFilterChange}
							>
								{categories.map((category) => (
									<option key={category} value={category}>
										{category}
									</option>
								))}
							</select>
						</div>
					</div>
				</div>
				<div className='row' style={{ marginTop: "5vh", marginBottom: "3vh" }}>
					{/* Map over events array and create a card for each item */}
					{filteredEvents &&
						filteredEvents.map((event, index) => (
							<div
								className='col-lg-4'
								key={index}
								style={{
									width: "350px",
									marginRight: "4vh",
									marginTop: "3vh",
									boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
									marginBottom: "3vh",
								}}
							>
								<img
									className='card-img-top'
									style={{ height: "200px" }}
									src={event.poster_url}
									alt={event.event_name}
								/>
								<div className='card-body'>
									<p>
										{event.event_date} {event.start_time}
									</p>
									<h4 className='card-title'>{event.event_name}</h4>
									<p>{event.category}</p>
									<div className='d-flex'>
										<p>
											<i
												className='bi bi-heart-fill'
												style={{ fontSize: "1rem", color: "red" }}
											></i>
											likes
										</p>
										<Link
											to={`/details/${event.id}`}
											className='ms-auto'
											style={{
												backgroundColor: "#1E90FF",
												color: "white",
												padding: "5px 10px",
												borderRadius: "5px",
												textDecoration: "none",
											}}
											onMouseOver={(e) =>
												(e.target.style.backgroundColor = "blue")
											}
											onMouseOut={(e) =>
												(e.target.style.backgroundColor = "#1E90FF")
											}
										>
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
