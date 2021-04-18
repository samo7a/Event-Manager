import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MyCalendar from './MyCalendar';
import ApproveEvents from './ApproveEvents';
import FileUpload from './FileUpload';
import { MdEmail, MdContactPhone } from 'react-icons/md';
import { AiFillClockCircle, AiFillCalendar } from 'react-icons/ai';
import RSODiv from './RSODiv';
import moment from 'moment';
import './AdminDashboard.css';
import 'react-calendar/dist/Calendar.css';
import { getUnequalProps } from '@fullcalendar/react';

const AdminDashboard = (props) => {
    
    const [eventsByDate, setEventsByDate] = useState([]);
    const [singleEvent, setSingleEvent] = useState( [] );
    const [showEvent, setShowEvent] = useState(false);

    const handleDateClick = events => {
        setEventsByDate(events);
    }

    const handleEventShow = async (e_id) => {
        var js = { e_id: e_id };
        var res;

        try {
            const response = await fetch("/api/getEvent", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(js),
            })

            if (response.status != 200) {
                throw new Error(response.status);
            } else {
                res = JSON.parse(await response.text());
                console.log(res);
                setSingleEvent(res);
                //setShowEvent(true);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    const handleEventClose = () => {
        setShowEvent(false);
    }

    const eventsDiv = eventsByDate.length > 0 ? (
        <div className="event-div">
            <div className="div-title">
                Events by date
            </div>
            {eventsByDate.map(e => 
                (
                    <div>
                        <div onClick={() => handleEventShow(e.id)} className="event-title clickable">
                            {e.title}
                        </div>
                        <span>{e.date} {e.time}</span>
                    </div>
                )
            )}
        </div>
    ) : (
        <div className="event-div">
            <div className="div-title">
                Events by date
            </div>
            Select a date to see all events for that date
        </div>
    );

    const renderFileUpload = (
        <div className="opaque-div">
            <FileUpload value="university" />
        </div>
    );

    return (
        <Container fluid >
            <Row>
                <Col xs={3}>
                    {renderFileUpload}
                    <RSODiv />
                    <ApproveEvents />
                    {eventsDiv}
                </Col>
                <Col>
                    <div className="calendar-div">
                        <MyCalendar 
                            dateClick={tempEvents => handleDateClick(tempEvents)}
                            eventClick={id => handleEventShow(id)}
                        />
                    </div>
                </Col>
            </Row>
            <Modal show={showEvent} onHide={handleEventClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{singleEvent[0].e_name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <MdContactPhone />
                            {singleEvent[0].e_contactPhone}
                        </Col>
                        <Col>
                            <MdEmail />
                            {singleEvent[0].e_contactEmail}
                        </Col>
                        <Col>
                            <AiFillClockCircle />
                            {moment(singleEvent[0].e_time, 'HH:mm').format('h:mm a')}
                        </Col>
                        <Col>
                            <AiFillCalendar />
                            {moment(singleEvent[0].e_date.slice(0, 10), "YYYY-MM-DD").format("dddd, MMMM Do YYYY")}
                        </Col>
                    </Row>
                    <Row>
                        <p>{singleEvent[0].e_description}</p>
                    </Row>
                    <Row>
                        <Col>
                            <Row>
                                <span>Location:</span>
                                {singleEvent[0].locationName}
                            </Row>
                            <Row>
                                {singleEvent[0].address}
                            </Row>
                        </Col>
                        <Col>
                            <img src={`https://maps.googleapis.com/maps/api/staticmap?zoom=13&size=200x200&markers=color:blue%7C${singleEvent[0].latitude},${singleEvent[0].longitude}&key=${process.env.REACT_APP_GOOGLE_STATIC_MAPS_API_KEY}`} />
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleEventClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default AdminDashboard;