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
  ButtonToolbar
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
  useEffect(() => {
    setName(props.event.name);
    setRso(props.event.rso);
    setDesc(props.event.desc);
    setDate(props.event.date);
  }, []);

  return (
    <div>
      <Container onClick={modalOpen} style={{ backgroundColor: "yellowgreen" }}>
        <h1>{eventName}</h1>
        <h4>{eventRso}</h4>
        <Image className="previewImage" src={pupFiller} />
        <p style={{ fontSize: "1.3rem" }}>{eventDesc}</p>
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
                {eventName}
              </Row>
              <Row>
                <b>Hosted by:{"\xa0"}</b>
                {eventRso}
              </Row>
              <Row>
                <b>Date:{"\xa0"}</b>
                {eventDate}
              </Row>
              <Row>
                <b>Description:{"\xa0"}</b>
                {eventDesc}
              </Row>
            </Col>
          </Row>
          <Modal.Footer>
            <Row>
              <ButtonToolbar aria-label="Toolbar for event buttons">
                <ButtonGroup className="ml-0" aria-label="View Event">
                  <Button>View Event</Button>
                </ButtonGroup>
                <ButtonGroup className="ml-5" aria-label="Second group">
                  <Button>Add to Calendar</Button> <Button onClick={modalClose}> Close </Button> 
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
