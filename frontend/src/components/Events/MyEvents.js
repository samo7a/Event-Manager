import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  Image,
  Jumbotron,
  Modal,
  Form,
  Row,
  InputGroup,
  FormControl,
} from "react-bootstrap";
// import "./GroupContainer.css";
import EventContainer from "./EventContainer";
// import pupFiller from "../pictures/pupFiller.jpeg";

const MyEvents = (props) => {
  const group = {
    name: "Group Name",
    rso: "rso name",
    desc: "THis is the description area",
    date: "MM/DD/YYYY",
  };
  const [createShow, setCreateShow] = useState(false);
  const createEventClose = () => setCreateShow(false);
  const createEventOpen = () => setCreateShow(true);
  //
  return (
    <Container>
      <h1 style={{ marginLeft: "-1rem" }}> My Events </h1>

      <Row>
        <Col xs="9" style={{ padding: 0 }}>
          <h3> Owner of these Events </h3>
        </Col>
        <Col xs="3">
          <Button variant="primary" onClick={createEventOpen}>
            Create Event
          </Button>
        </Col>
        <Container style={{ backgroundColor: "red" }}>
          ADMIN OF THESE GROUPS
          {/* <EventContainer /> */}
        </Container>
      </Row>
      <Row>
        <h3>Following these events</h3>
        <Container style={{ backgroundColor: "red" }}>
          Following these Events
        </Container>
      </Row>
      <div>
        {/* CREATE Event MODAL */}
        <div>
          <Modal
            class="modal-lg"
            style={{
              marginTop: "1.75rem",
            }}
            show={createShow}
            onHide={createEventClose}
          >
            <Modal.Header>
              <Modal.Title>Create Event</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlID="eventName">
                  <Form.Label>Enter event name</Form.Label>
                  <Form.Control
                    placeholder="Event Name"
                    type="text"
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlID="eventDesc">
                  <Form.Label>Enter event description</Form.Label>{" "}
                  <Form.Control
                    placeholder="Please enter a description about the event"
                    style={{ marginRight: "1rem", width: "100%" }}
                    as="textarea"
                    rows="7"
                  />
                  <Form.Text>1000 characters maximum</Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label> Contact email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                  <Form.Text className="text-muted"></Form.Text>
                </Form.Group>
                <Form.Group controlID="eventName">
                  <Form.Label>Enter contact phone number</Form.Label>
                  <Form.Control type="text" />
                  <Form.Text>Please enter in the form: XXX-XXX-XXXX</Form.Text>
                </Form.Group>
                <Form.Group controlId="eventType">
                  <Form.Label>Select event type</Form.Label>
                  <Form.Control as="select">
                    <option>Public</option>
                    <option>Private</option>
                    <option>RSO</option>
                  </Form.Control>
                </Form.Group>
                <Form.Label>Enter event location</Form.Label>
                <Form.Label>Enter event addr</Form.Label>

                <InputGroup className="mb-3">
                  <FormControl placeholder="Hour" />
                  <FormControl placeholder="Minutes" />
                  <FormControl placeholder="a.m./p.m." />
                </InputGroup>
                <Form.Label>Enter event date</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text>DD/MM/YY</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl />
                  <FormControl />
                  <FormControl />
                </InputGroup>
                <Form.Group controlID="rsoPic">
                  <Form.Label>Upload event profile picture</Form.Label>
                  <Form.File id="exampleFormControlFile1" label="" />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer
              className="modalFooter"
              style={{ marginBottom: "1rem", marginRight: "1rem" }}
            >
              <Button variant="primary" type="submit">
                Create RSO
              </Button>
              <Button
                variant="primary"
                type="submit"
                onClick={createEventClose}
              >
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </Container>
  );
};

export default MyEvents;
