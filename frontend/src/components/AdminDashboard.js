import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MyCalendar from './MyCalendar';
import SideMenu from './SideMenu';
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
                <Col xs={3}>This will be events that need approval</Col>
                <Col>
                    <MyCalendar />
                </Col>
            </Row>
        </Container>
    );
};

export default AdminDashboard;