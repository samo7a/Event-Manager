import React from 'react';
import AdminDashboard from '../components/AdminDashboard';
import Banner from '../components/Banner';
import Container from 'react-bootstrap/Container';

const AdminPage = () => {
    return (
        <Container fluid={true}>
            <Banner type="loggedin" />
            <AdminDashboard type={true} />
        </Container>
    );
};

export default AdminPage;