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

function Event(props) {
  console.log("1");
  const eventName = props.name;
  console.log(props);
  console.log(eventName);
  console.log("2");
  //   const event = {
  //     name: props.name,
  //     rso: props.rso,
  //     desc: props.desc,
  //     date: props.date,
  //   };
  //   const eventName;
  //   const rsoName;
  //   const eventDesc;
  //   const eventDate;
  // const [eventName, setName] = useState("");
  const [eventRso, setRso] = useState("");
  const [eventDesc, setDesc] = useState("S");
  const [eventDate, setDate] = useState("MM/DD/YYYY");
  useEffect(() => {
    console.log("UseEffect");
    console.log(props);

    // setName(props.name);
    console.log(props.name);
    setRso(props.rso);
    setDesc(props.desc);
    setDate(props.date);
  }, []);
  // constructor = (props) => {
  //   super(props);
  //   console.log("TRY");
  //   console.log(this.props);
  // };

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
      {/* {useEffect()} */}
      {/* <h1>{eventName}</h1>
      <h4>{eventRso}</h4> */}
      <h1>{props.name}</h1>
      {/* <h4>{eventRso}</h4> */}
      <Image className="previewImage" src={pupFiller} />
      {/* <div style={{ position: "absolute", zIndex: 2 }}></div> */}
      <p style={{ fontSize: "1.3rem" }}>{eventDesc}</p>
    </Container>
  );
}
export default Event;
