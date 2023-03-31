import { createContext,  useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"

export const EventsContext = createContext();

export default function EventsProvider({children}) 
{
    const navigate = useNavigate()
    const [events, setEvents] = useState()
    const [change, setOnChange] = useState(false)

    // Adding questions
    const addEvent = (event_name,event_date,event_location,event_description, poster_url,event_price,total_tickets,start_time,end_time,contact,age_restriction,ticket_info,lineup,category) =>{
        fetch("/events",{
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                'Authorization': `Bearer ${sessionStorage.token}`
            },
            body: JSON.stringify({
                event_name, event_date, event_location, event_description,
                poster_url, event_price, total_tickets, start_time,
                end_time, contact, age_restriction, ticket_info, lineup, category
            })
        }
        )
        .then(res=>res.json())
        .then(response=>{
            
            if(response.errors)
            {
                 
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: response.errors,
                    })
            }
            else if(response.success)
            {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: response.success,
                    showConfirmButton: false,
                    timer: 1500
                })
                navigate('/events')
                  setOnChange(!change)
                 

            }
            else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: "Something went wrong!",
                })

            }
            
        })
    }

   
    // Fetch questions
    useEffect(()=>{
        fetch("/events",{
            method: "GET",
            headers:{
                "Content-Type": "application/json"
            },
        }
        )
        .then(res=>res.json())
            .then(response => {
              // Map over the events and format the dates and times
        const formattedEvents = response.map(event => ({
          ...event,
          start_time: new Date(event.start_time).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
          end_time: new Date(event.end_time).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
          event_date: new Date(event.event_date).toLocaleDateString([], {day: 'numeric', weekday: 'short', month: 'short', year: 'numeric'}),
        }));
            setEvents(formattedEvents)
            
        }
        )
    }, [change])

    const contextData = {
      events,
      addEvent
    //   
    }

  return (
    <>
     <EventsContext.Provider value={contextData}>
        {children}
     </EventsContext.Provider>
    </>
  )
}
