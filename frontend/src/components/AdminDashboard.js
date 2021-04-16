import React from 'react';
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
                        <MyCalendar />
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default AdminDashboard;