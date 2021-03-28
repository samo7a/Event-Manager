import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"; 

const MyCalendar = () => {

  const handleDateClick = (args) => {
    alert(args.dateStr);
  }
  return (
    <FullCalendar
      plugins={[ dayGridPlugin, interactionPlugin ]}
      initialView="dayGridMonth"
      events={[
        { title: 'event 1', date: '2021-04-01' },
        { title: 'event 2', date: '2021-04-02' }
      ]}
      dateClick={(args) => handleDateClick(args)}
    />
  )
};

export default MyCalendar;