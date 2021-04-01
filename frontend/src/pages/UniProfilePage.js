import React from 'react';
import Container from 'react-bootstrap/Container';
import FileUpload from '../components/FileUpload';
import Banner from '../components/Banner';

const UniProfilePage = () => {
    return (
        <Container fluid>
            <Banner type="loggedin" />
            <FileUpload type="university" value="University" />
        </Container>
    )
};

export default UniProfilePage;