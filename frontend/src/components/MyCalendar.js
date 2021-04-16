import React, { useState } from 'react'
import FullCalendar, { isPropsEqual } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"; 

const MyCalendar = (props) => {
  const user = localStorage.getItem("user_data");
  const sa_id = user ? JSON.parse(user).id : 0;
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

    let js = { sa_id: sa_id, start: start, end: end };

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
        let res = JSON.parse(await response.text());
        let tempEvents = [];
        res.forEach(d => {
          let other = {
            id: d.e_id,
            title: d.e_name,
            date: d.e_date.slice(0,10) + "T" + d.e_time,
          };
          tempEvents.push(other);
        })
        setEvents(tempEvents);
        console.log(`Success: ${res}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const handleDateClick = async (args) => {
    let start = args.dateStr;
    let end = args.dateStr;

    let js = { sa_id: sa_id, start: start, end: end };

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
        let res = JSON.parse(await response.text());
        let tempEvents = [];
        res.forEach(d => {
          let other = {
            id: d.e_id,
            title: d.e_name,
            date: d.e_date.slice(0,10),
            time: d.e_time,
          };
          tempEvents.push(other);
        })
        props.dateClick(tempEvents);
      }
    } catch (error) {
      console.error("Error:", error);
    }
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