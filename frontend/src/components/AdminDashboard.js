import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MyCalendar from './MyCalendar';
import SideMenu from './SideMenu';
import ApproveEvents from './ApproveEvents';
import './AdminDashboard.css';
import 'react-calendar/dist/Calendar.css';
import { getUnequalProps } from '@fullcalendar/react';

const AdminDashboard = (props) => {
    
    const [eventsByDate, setEventsByDate] = useState([]);

    const handleDateClick = events => {
        setEventsByDate(events);
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

    return (
        <Container fluid >
            <Row>
                <Col xs={1}>
                    <SideMenu type={props.type} />
                </Col>
                <Col xs={3}>
                    <ApproveEvents />
                </Col>
                <Col>
                    <div className="calendar-div">
                        <MyCalendar dateClick={(tempEvents) => handleDateClick(tempEvents)}/>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col></Col>
                <Col></Col>
                <Col>
                    {eventsDiv}
                </Col>
            </Row>
        </Container>
    );
};

export default AdminDashboard;