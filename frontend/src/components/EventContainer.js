import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  Image,
  Jumbotron,
  Modal,
  Row,
} from "react-bootstrap";
import pupFiller from "../pictures/pupFiller.jpeg";

const EventContainer = (props) => {
  const event = {
    name: "Event Name",
    rso: "rso name",
    desc: "THis is the description area",
    date: "MM/DD/YYYY",
  };
  const [showEvent, setShowEvent] = useState(false);
  const eventClose = () => setShowEvent(false);
  const eventOpen = () => setShowEvent(true);

  const eventModal = (props) => {
    <Modal show={true}>
      <Container style={{ padding: "2rem" }}>
        <Row>
          <Image
            src={pupFiller}
            style={{
              overflow: "hidden",
              maxWidth: "40rem",
              maxHeight: "10%",
              // overflow: "hidden",
              // position: "absolute",
              // zIndex: 1,
            }}
          />
        </Row>
        <Row>
          <Col>
            <Row>
              <b>Event Name:{"\xa0"}</b>
              {event.name}
            </Row>
            <Row>
              <b>Hosted by:{"\xa0"}</b>
              {event.rso}
            </Row>
            <Row>
              <b>Date:{"\xa0"}</b>
              {event.date}
            </Row>
            <Row>
              <b>Description:{"\xa0"}</b>
              {event.desc}
            </Row>
          </Col>
          <Col>
            <Row>
              <Button> Add to calendar</Button>
              <Button> Close </Button>
            </Row>
          </Col>
        </Row>
      </Container>
    </Modal>;
  };

  return (
    <Jumbotron style={{ backgroundColor: "red" }}>
      <Container style={{ backgroundColor: "yellowgreen" }}>
        <h1>{event.name}</h1>
        <h4>{event.rso}</h4>

        <Image
          src={pupFiller}
          style={{
            maxWidth: "40rem",
            maxHeight: "10%",
            // overflow: "hidden",
            // position: "absolute",
            // zIndex: 1,
          }}
        />
        {/* <div style={{ position: "absolute", zIndex: 2 }}></div> */}
        <p style={{ fontSize: "1.3rem" }}>{event.desc}</p>
      </Container>

      {/* {showEvent ? ( */}

      {/* ) : null} */}
    </Jumbotron>
  );
};

export default EventContainer;
