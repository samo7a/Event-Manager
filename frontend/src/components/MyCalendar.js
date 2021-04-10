import React, { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"; 

const MyCalendar = () => {
  const user = localStorage.getItem('user');
  const [events, setEvents] = useState([
    {
      id: 0,
      title: "",
      date: ""
    }
  ]);

  const getCalendarEventsHandler = async (dateInfo) => {
    let start = dateInfo.start.toLocaleDateString('en-CA');
    let end = dateInfo.end.toLocaleDateString('en-CA');
    let id = user.id ? user.id : 0;

    let js = { id: id, start: start, end: end };
    console.log(js);

    try {
      let response = await fetch("/api/getAllEvents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(js),
      })

      if (response.status != 200) {
        throw new Error(response.status);
      } else {
        let data = response.json();
        let tempEvents = [];
        data.forEach(d => {
          let other = {
            id: d.e_id,
            title: d.e_name,
            date: d.e_date
          };
          tempEvents.push(other);
        })
        setEvents(tempEvents);
        console.log(`Success: ${data}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const handleDateClick = (args) => {
    alert(args.dateStr);
  }
  return (
    <FullCalendar
      datesSet={getCalendarEventsHandler}
      plugins={[ dayGridPlugin, interactionPlugin ]}
      initialView="dayGridMonth"
      showNonCurrentDates={false}
      events={events}
      dateClick={(args) => handleDateClick(args)}
    />
  )
};

export default MyCalendar;