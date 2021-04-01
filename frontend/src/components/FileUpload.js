import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SideMenu from './SideMenu';

const FileUpload = (props) => {
    return (
        <Container fluid>
            <Row>
                <Col xs={1}>
                    <SideMenu type={props.type} />
                </Col>
                <Col xs={2}>
                    <form>
                        <div className="custom-file">
                            <input type="file" className="custom-file-input mt-4" id="customFile" />
                            <label className="custom-file-label" htmlFor="customFile">Choose {props.value} Picture</label>
                        </div>
                        <input type="submit" value="Upload" className="btn btn-primary btn-block" />
                    </form>
                </Col>
            </Row>
        </Container>
    )
}

export default FileUpload;