import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MyCalendar from './MyCalendar';
import './AdminDashboard.css';
import 'react-calendar/dist/Calendar.css';

const AdminDashboard = () => {

    return (
        <Container fluid >
            <Row>
                <Col id="first-col" xs={1}>This will be the menu</Col>
                <Col xs={3}>This will be events that need approval</Col>
                <Col>
                    <MyCalendar />
                </Col>
            </Row>
        </Container>
    );
};

export default AdminDashboard;