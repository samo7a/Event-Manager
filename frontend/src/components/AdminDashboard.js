import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MyCalendar from './MyCalendar';
import SideMenu from './SideMenu';
import ApproveEvents from './ApproveEvents';
import { MdEmail, MdContactPhone } from 'react-icons/md';
import './AdminDashboard.css';
import 'react-calendar/dist/Calendar.css';
import { getUnequalProps } from '@fullcalendar/react';

const AdminDashboard = (props) => {
    
    const [eventsByDate, setEventsByDate] = useState([]);
    const [singleEvent, setSingleEvent] = useState( {} );

    const handleDateClick = events => {
        setEventsByDate(events);
    }

    const handleEventClick = event => {
        setSingleEvent(event);
    }

    const eventsDiv = eventsByDate.length > 0 ? (
        <div className="event-div">
            {eventsByDate.map(e => 
                (
                    <div>
                        <div className="event-title">
                            {e.title}
                        </div>
                        <span>{e.date} {e.time}</span>
                    </div>
                )
            )}
        </div>
    ) : (
        <div className="event-div event-title">
            Select a date to see all events for that date
        </div>
    );

    const singleEventDiv = singleEvent.length > 0 ? (
        <div className="event-div">
            <div className="event-title">
                {singleEvent[0].e_name}
            </div>
            <span>{singleEvent[0].e_date} {singleEvent.e_time}</span>
            <p>
                {singleEvent[0].e_description}
            </p>
            <div>
                {MdEmail} {singleEvent[0].e_contactEmail}   {MdContactPhone} {singleEvent[0].e_contactPhone}
            </div>
        </div>
    ) : (
        <div className="event-div event-title">
            Select an event to see the event details
        </div>
    );

    return (
        <Container fluid >
            <Row>
                <Col xs={3}>
                    <ApproveEvents />
                    {singleEventDiv}
                    {eventsDiv}
                </Col>
                <Col>
                    <div className="calendar-div">
                        <MyCalendar 
                            dateClick={(tempEvents) => {
                                handleDateClick(tempEvents);
                                console.log("tempEvents: ", tempEvents);
                            }}
                            eventClick={event => {
                                handleEventClick(event);
                                console.log("event: ", event);
                            }}
                        />
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default AdminDashboard;