import React, { useState, useEffect } from 'react';
import {Row, Col, Button, Modal, Form, FormGroup, ButtonGroup} from 'react-bootstrap';
import './UniDiv.css';

const UniDiv = () => {
    let check = localStorage.getItem("user_data");
    const user = check ? JSON.parse(check) : null;
    const sa_id = user ? user.id : 0;

    const [uniContent, setUniContent] = useState( {} );
    const [showUniModal, setShowUniModal] = useState(false);
    const [uName, setUName] = useState("");
    const [uDescription, setUDescription] = useState("");
    const [uAddress, setUAddress] = useState("");
    const [uLocationName, setULocationName] = useState("");

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
                <div><strong>Location: </strong>{uniContent.locationName}</div>
                <div><strong>Address: </strong>{uniContent.address}</div>
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

    const updateUniHandler = async (e) => {
        e.preventDefault();

        var js = {u_id: uniContent.u_id, universityName: uName, address: uAddress, u_profilePicture: uniContent.u_profilePicture, u_description: uDescription };
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

    const updateUName = (event) => {
        setUName(event.target.value);
    };

    const updateUDescription = (event) => {
        setUDescription(event.target.value);
    };

    const updateULocationName = (event) => {
        setULocationName(event.target.value);
    };

    const updateUAddress = (event) => {
        setUAddress(event.target.value);
    };

    return (
        <div>
            {renderUniDiv}
            <Modal show={showUniModal} onHide={handleUniClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update {uniContent.u_name} Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row}>
                            <Form.Label column sm="2">
                                University name
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="input" value={uName} onChange={updateUName} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column sm="2">
                                Description
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="input" value={uDescription} onChange={updateUDescription} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column sm="2">
                                Address
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="input" value={uAddress} onChange={updateUAddress} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column sm="2">
                                Location name
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="input" value={uLocationName} onChange={updateULocationName} />
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <ButtonGroup>
                        <Button variant="primary" type="submit" onClick={updateUniHandler}>
                                Update
                        </Button>
                        <Button variant="secondary" onClick={handleUniClose}>
                            Close
                        </Button>
                    </ButtonGroup>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default UniDiv;