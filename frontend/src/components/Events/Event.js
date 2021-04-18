import React, { useState, useEffect } from "react";
import {
  Button,
  Col,
  Container,
  Image,
  Jumbotron,
  Modal,
  Row,
  ButtonGroup,
  ButtonToolbar,
} from "react-bootstrap";
import "./Event.css";
import pupFiller from "../../pictures/pupFiller.jpeg";

const Event = (props) => {
  // Modal fields
  const [show, setShow] = useState(false);
  const modalOpen = () => setShow(true);
  const modalClose = () => setShow(false);
  // Event fields
  const [eventName, setName] = useState("");
  const [eventRso, setRso] = useState("");
  const [eventDesc, setDesc] = useState("S");
  const [eventDate, setDate] = useState("MM/DD/YYYY");
  const [eventID, setEventID] = useState("");
  const [eventDetails, setDetails] = useState({});

  useEffect(() => {
    // setName(props.event.name);
    // setRso(props.event.rso);
    // setDesc(props.event.desc);
    // setDate(props.event.date);
    getEventSingle();
  }, []);
  const getEventSingle = async () => {
    try {
      setEventID(props.e_id);
      var obj = { e_id: props.e_id };
      var js = JSON.stringify(obj);
      let response = await fetch("/api/getEventStudent", {
        method: "POST",
        // credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: js,
      });
      var res = JSON.parse(await response.text());
      if (response.status != 200) {
        throw new Error(response.status);
      } else {
        console.log(res);
        setDetails(res);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const formatDate = (param) => {
    if (param != null) {
      let returnVar = ";";
      returnVar +=
        param.substring(8, 9) +
        "/" +
        param.substring(5, 6) +
        "/" +
        param.substring(0, 3);
      return returnVar;
    } else return "No date";
  };
  // const goToPage = (async_ => {
  //   event.preventDefault();
  //   <PageTemplate page="singleEvent" event={props} />

  // }

  return (
    <div>
      <Container
        className="eventContainer"
        onClick={modalOpen}
        style={{ backgroundColor: "yellowgreen" }}
      >
        <h1>{eventDetails.e_name}</h1>
        {/* <h4>{eventDetails.}</h4> */}
        <Image className="previewImage" src={pupFiller} />
        {/* <p style={{ fontSize: "1.3rem" }}>{eventDesc}</p> */}
        <p style={{ fontSize: "1.3rem" }}> {formatDate(eventDetails.e_date)}</p>
      </Container>
      {/* Event Modal */}
      <Modal show={show} onHide={modalClose}>
        <Container className="modalContainer">
          <Row>
            <Image className="modalImage" src={pupFiller} />
          </Row>
          <Row style={{ margin: ".5rem" }}>
            <Col>
              <Row>
                <b>Event Name:{"\xa0"}</b>
                {eventDetails.e_name}
              </Row>
              <Row>
                {/* <b>Hosted by:{"\xa0"}</b> */}
                {/* {eventRso} */}
              </Row>
              <Row>
                <b>Date:{"\xa0"}</b>
                {formatDate(eventDetails.e_date)}
              </Row>
              <Row>
                <b>Description:{"\xa0"}</b>
                {eventDetails.e_description}
              </Row>
            </Col>
          </Row>
          <Modal.Footer>
            <Row>
              <ButtonToolbar aria-label="Toolbar for event buttons">
                <ButtonGroup
                  className="ml-0"
                  aria-label="View Event"
                  // onClick={goToPage}
                >
                  <Button>View Event</Button>
                </ButtonGroup>
                <ButtonGroup className="ml-5" aria-label="Second group">
                  <Button>Add to Calendar</Button>{" "}
                  <Button onClick={modalClose}> Close </Button>
                </ButtonGroup>
              </ButtonToolbar>
            </Row>
          </Modal.Footer>
        </Container>
      </Modal>
    </div>
  );
};

export default Event;
