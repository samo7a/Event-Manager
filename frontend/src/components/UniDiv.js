import React, { useState, useEffect } from 'react';
import {Row, Col, Button, Modal} from 'react-bootstrap';
import './UniDiv.css';

const UniDiv = () => {
    let check = localStorage.getItem("user_data");
    const user = check ? JSON.parse(check) : null;
    const sa_id = user ? user.id : 0;

    const [uniContent, setUniContent] = useState( {} );
    const [showUniModal, setShowUniModal] = useState(false);

    const loadUniHandler = async () => {
        var js = {sa_id: sa_id};
        var res;

        try {
            const response = await fetch("/api/getUniversity", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(js),
              })
            
            res = JSON.parse(await response.text());
            if (response.status != 200) {
                throw new Error(response.status);
            } else {
                console.log(res);
                setUniContent(res);
            }
        } catch (error) {
            console.log("Error: ", error);
            return;
        }
    }

    useEffect(() => loadUniHandler(), [showUniModal]);

    const handleUniShow = () => {
        setShowUniModal(true);
    }
    const handleUniClose = () => {
        setShowUniModal(false);
    };

    const renderUniDiv = uniContent ? (
        <div className="opaque-div">
            <div className="div-title">
                University <Button onClick={handleUniShow}>Update University</Button>
            </div>
            <div>
                <div><strong>University: </strong>{uniContent.u_name}</div>
                <div><strong>Student count: </strong>{uniContent.u_noOfStudents}</div>
                <div><strong>Description: </strong>{uniContent.u_description}</div>
                <div><strong>Location: </strong>{uniContent.u_locationName}</div>
            </div>
        </div>
    ) : (
        <div className="opaque-div">
            <div className="div-title">
                University
            </div>
            There was an error loading this content
        </div>
    );

    const updateUniContent = (e, type) => {
        let val = e.target.value;
        let content = uniContent;

        switch (type) {
            case 0:
                content.u_name = val;
                break;
            case 1: 
                content.u_description = val;
                break;
            case 2:
                content.address = val;
                break;
            case 3: 
                content.locationName = val;
                break;
        }

        setUniContent(content);
    }

    const updateUniHandler = async (e) => {
        e.preventDefault();

        var js = {u_id: uniContent.u_id, universityName: uniContent.u_name, address: uniContent.address, u_profilePicture: uniContent.u_profilePicture, u_description: uniContent.u_description };
        var res;

        try {
            const response = await fetch("/api/updateUniversity", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(js),
              })
            
            res = JSON.parse(await response.text());
            if (response.status != 200) {
                throw new Error(response.status);
            } else {
                setShowUniModal(false);
            }
        } catch (error) {
            console.log("Error: ", error);
            return;
        }
    }

    return (
        <div>
            {renderUniDiv}
            <Modal show={showUniModal} onHide={handleUniClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{uniContent.u_name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row}>
                            <Form.Label column sm="2">
                                University name
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="input" value={uniContent.u_name} onChange={e => updateUniContent(e, 0)} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column sm="2">
                                Description
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="input" value={uniContent.u_description} onChange={e => updateUniContent(e, 1)} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column sm="2">
                                Address
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="input" value={uniContent.address} onChange={e => updateUniContent(e, 2)} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column sm="2">
                                Location name
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="input" value={uniContent.locationName} onChange={e => updateUniContent(e, 3)} />
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <ButtonGroup>
                        <Button variant="primary" type="submit" onClick={updateUniHandler}>
                                Update
                        </Button>
                        <Button variant="secondary" onClick={handleRsoClose}>
                            Close
                        </Button>
                    </ButtonGroup>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default RSODiv;