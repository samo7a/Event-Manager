// CHECK FORMAT OF INPUT
// ADD LOCAL STORAGE FOR s_id
// ADD RSO tab for rso_id

import React, { useState, useEffect } from "react";
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
import Event from "./Event";
import EventContainer from "./EventContainer";
// import pupFiller from "../pictures/pupFiller.jpeg";

const MyEvents = (props) => {
  let check = localStorage.getItem("user_data");
  const user = check ? JSON.parse(check) : null;
  const s_id = user ? user.id : 0;
  const group = {
    name: "Group Name",
    rso: "rso name",
    desc: "THis is the description area",
    date: "MM/DD/YYYY",
  };
  const [createShow, setCreateShow] = useState(false);
  const createEventClose = () => setCreateShow(false);
  const createEventOpen = () => setCreateShow(true);
  const [allEvents, setAllEvents] = useState([
    {
      e_id: 0,
      e_name: "e_name",
      e_date: "e_date",
      e_type: "private",
    },
  ]);
  // MSG field
  const [message, setMessage] = useState("");
  var createEventObj = {
    rso_id: 0,
    e_name: "",
    e_description: "",
    e_contactEmail: "",
    e_contactPhone: "",
    e_type: "",
    locationName: "",
    address: "",
    e_category: "",
    e_time: "",
    e_date: "",
    e_profilePicture: "",
    s_id: s_id,
  };
  // newEvent fields
  var eventHR;
  var eventMIN;
  var eventDay;
  var eventMonth;
  var eventYear;
  var rsoEventOwner;
  // const createEvent  = async (event) => {
  //   event.preventDefault();
  //   setMessage("");
  // getAllevents
  useEffect(() => {
    getAllEvents();
  }, []);
  const getAllEvents = async () => {
    try {
      let js = JSON.stringify({ s_id: s_id, from: 0, to: 2 });
      console.log(js);
      const response = await fetch("/api/getAllEventsStudent", {
        method: "POST",
        // credentials: "include",
        body: js,
        headers: { "Content-Type": "application/json" },
      });
      var res = JSON.parse(await response.text());
      if (response.status !== 200) {
        console.log(res.error);
      } else {
        console.log(res);
        setAllEvents(res);
      }
    } catch (e) {
      console.log(e.toString());
      return;
    }
  };
  // Create event
  const createEvent = async (event) => {
    event.preventDefault();
    setMessage("");
    if (createEventObj.e_name.value.length == 0) {
      setMessage("Please include event name");
      return;
    }
    if (createEventObj.e_name.value.length > 45) {
      setMessage("Event Name exceed limit of 45 Characters");
      return;
    }
    if (createEventObj.e_description == null) {
      setMessage("Please fill all fields");
      return;
    }
    if (createEventObj.e_description.value.length > 1000) {
      setMessage("Over max");
      return;
    }
    if (createEventObj.e_contactEmail == null) {
      setMessage("Please enter an email");
      return;
    }
    var expression = /\S+@\S+/;
    if (!expression.test(createEventObj.e_contactEmail.value.toLowerCase())) {
      setMessage("Please enter a valid email address");
      return;
    }
    if (createEventObj.e_contactPhone == null) {
      setMessage("Please fill all fields");
      return;
    }
    if (createEventObj.e_contactPhone.value.length != 12) {
      setMessage("Enter valid phone #");
      return;
    }
    if (eventHR == null) {
      setMessage("Please fill all fields");
      return;
    }
    if (eventMIN == null) {
      setMessage("Please fill all fields");
      return;
    }
    if (eventHR >= 24) {
      setMessage("Please enter a valid hour (0 - 23)");
      return;
    }
    if (eventMIN >= 60) {
      setMessage("Please enter a valid minute (0 - 59)");
      return;
    }
    if (eventDay == null) {
      setMessage("Please fill all fields");
      return;
    }
    if (eventMonth == null) {
      setMessage("Please fill all fields");
      return;
    }
    if (eventYear == null) {
      setMessage("Please fill all fields");
      return;
    }
    var formatTime = eventHR.value + ":" + eventMIN.value;
    console.log("event time : " + formatTime);
    var formatDate =
      "20" + eventYear.value + "/" + eventMonth.value + "/" + eventDay.value;
    try {
      var newEvent = {
        rso_id: createEventObj.rso_id,
        s_id: createEventObj.s_id,
        e_name: createEventObj.e_name,
        e_description: createEventObj.e_description,
        e_contactEmail: createEventObj.e_contactEmail,
        e_contactPhone: createEventObj.e_contactPhone,
        e_type: createEventObj.e_type,
        locationName: createEventObj.locationName,
        address: createEventObj.address,
        e_category: createEventObj.e_category,
        e_time: formatTime,
        e_date: formatDate,
        e_profilePicture: createEventObj.e_profilePicture,
        // isApproved: 1,
      };
      console.log(newEvent);
      var js = JSON.stringify(newEvent);

      if (createEventObj.e_type == "rso") {
        const response = await fetch("/api/createEventRso", {
          method: "POST",
          // credentials: "include",
          body: js,
          headers: { "Content-Type": "application/json" },
        });
        var res = JSON.parse(await response.text());
        if (response.status !== 200) {
          console.log(res.error);
        } else {
          console.log("Rso Created event");
          console.log(res);
        }
      } else {
        const response = await fetch("/api/createEventStudent", {
          method: "POST",
          // credentials: "include",
          body: js,
          headers: { "Content-Type": "application/json" },
        });
        var res = JSON.parse(await response.text());
        if (response.status !== 200) {
          console.log(res.error);
        } else {
          console.log("Student created event");
          console.log(res);
        }
      }
    } catch (e) {
      console.log(e.toString());
      return;
    }
  };

  const generateAllEvents =
    allEvents.length == 0 ? (
      <span>Not apart of any groups</span>
    ) : (
      allEvents.map((e) => {
        // console.log(e.e_id);
        return e.e_id != null && e.e_id != "0" ? <Event e_id={e.e_id} /> : null;
      })
    );

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
          <EventContainer />
        </Container>
      </Row>
      <Row>
        <h3>Following these events</h3>
        <Container style={{ backgroundColor: "red" }}>
          Following these Events
          {generateAllEvents}
        </Container>
      </Row>
      <Row>
        <h3>Upcoming Events</h3>
        <Container style={{ backgroundColor: "red" }}>
          Upcoming Events
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
                    ref={(c) => (createEventObj.e_name = c)}
                  ></Form.Control>
                  <Form.Text>45 characters maximum</Form.Text>
                </Form.Group>
                <Form.Group controlID="eventDesc">
                  <Form.Label>Enter event description</Form.Label>{" "}
                  <Form.Control
                    placeholder="Please enter a description about the event"
                    style={{ marginRight: "1rem", width: "100%" }}
                    as="textarea"
                    ref={(c) => (createEventObj.e_description = c)}
                    rows="7"
                  />
                  <Form.Text>1000 characters maximum</Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label> Contact email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    ref={(c) => (createEventObj.e_contactEmail = c)}
                  />
                  <Form.Text className="text-muted"></Form.Text>
                </Form.Group>
                <Form.Group controlID="eventName">
                  <Form.Label>Enter contact phone number</Form.Label>
                  <Form.Control
                    type="text"
                    ref={(c) => (createEventObj.e_contactPhone = c)}
                  />
                  <Form.Text>Please enter in the form: XXX-XXX-XXXX</Form.Text>
                </Form.Group>
                <Form.Group controlId="createEventObj.e_type">
                  <Form.Label>Select event type</Form.Label>
                  <Form.Control as="select" value={createEventObj.e_type}>
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                    <option value="rso">RSO</option>
                  </Form.Control>
                  <Form.Label>If RSO was chosen, enter it here</Form.Label>
                  <Form.Control type="text" ref={(c) => (rsoEventOwner = c)} />
                </Form.Group>
                <Form.Label>Enter event location</Form.Label>
                <Form.Control
                  type="text"
                  ref={(c) => (createEventObj.locationName = c)}
                />

                <Form.Label>Enter event address</Form.Label>
                <Form.Control
                  type="text"
                  ref={(c) => (createEventObj.address = c)}
                />

                <Form.Label>Enter event category</Form.Label>
                <Form.Control
                  type="text"
                  ref={(c) => (createEventObj.e_category = c)}
                />
                <Form.Label>Enter event time in 24Hr format</Form.Label>
                <InputGroup className="mb-3">
                  <FormControl placeholder="Hour" ref={(c) => (eventHR = c)} />
                  <FormControl
                    placeholder="Minutes"
                    ref={(c) => (eventMIN = c)}
                  />
                </InputGroup>
                <Form.Label>Enter event date</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text>DD/MM/YY</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl ref={(c) => (eventDay = c)} />
                  <FormControl ref={(c) => (eventMonth = c)} />
                  <FormControl ref={(c) => (eventYear = c)} />
                </InputGroup>
                <Form.Group controlID="rsoPic">
                  <Form.Label>Upload event profile picture</Form.Label>
                  <Form.File
                    ref={(c) => (createEventObj.e_profilePicture = c)}
                    label=""
                  />
                  <Form.Text>5MB maximum</Form.Text>
                </Form.Group>
              </Form>
            </Modal.Body>
            {message != "" ? (
              <span id="errorMSG">
                <span style={{ color: "red" }}>Error : </span>
                {message}
              </span>
            ) : null}
            <Modal.Footer
              className="modalFooter"
              style={{ marginBottom: "1rem", marginRight: "1rem" }}
            >
              <Button variant="primary" type="submit" onClick={createEvent}>
                Create Event
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
