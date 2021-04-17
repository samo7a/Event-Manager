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
            {eventsByDate.forEach(e => {
                return (
                    <div>
                        <div className="event-title">
                            {e.title}
                        </div>
                        <span>{e.date} {e.time}</span>
                    </div>
                )
            })}
        </div>
    ) : (
        <div className="event-div event-title">
            Select a date to see all events for that date
        </div>
    );

    const singleEventDiv = singleEvent.length > 0 ? (
        <div className="event-div">
            <div className="event-title">
                {singleEvent.e_name}
            </div>
            <span>{singleEvent.e_date} {singleEvent.e_time}</span>
            <p>
                {singleEvent.e_description}
            </p>
            <div>
                {MdEmail} {singleEvent.e_contactEmail}   {MdContactPhone} {singleEvent.e_contactPhone}
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
                                console.lot("tempEvents: ", tempEvents);
                            }}
                            eventClick={event => {
                                handleEventClick("event: ", event);
                                console.log(event);
                            }
                        />
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default AdminDashboard;