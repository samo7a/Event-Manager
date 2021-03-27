import React, { useState, useEffect } from "react";
import {
  Button,
  Col,
  Container,
  Image,
  Jumbotron,
  Modal,
  Row,
} from "react-bootstrap";
import "./EventContainer.css";
import pupFiller from "../pictures/pupFiller.jpeg";

const Event = (props) => {
  const [eventName, setName] = useState("");
  const [eventRso, setRso] = useState("");
  const [eventDesc, setDesc] = useState("S");
  const [eventDate, setDate] = useState("MM/DD/YYYY");
  useEffect(() => {
    console.log("UseEffect");
    console.log(props);

    setName(props.event.name);
    console.log(props.event.name);
    setRso(props.event.rso);
    setDesc(props.event.desc);
    setDate(props.event.date);
  }, []);

  const eventModal = (props) => {
    <Modal show={true}>
      <Container style={{ padding: "2rem" }}>
        <Row>
          <Image className="modalImage" src={pupFiller} />
        </Row>
        <Row>
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
    <Container style={{ backgroundColor: "yellowgreen" }}>
      <h1>{eventName}</h1>
      <h4>{eventRso}</h4>
      <Image className="previewImage" src={pupFiller} />
      <p style={{ fontSize: "1.3rem" }}>{eventDesc}</p>
    </Container>
  );
};
export default Event;
