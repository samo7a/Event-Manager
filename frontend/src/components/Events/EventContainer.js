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
import "./EventContainer.css";
import Event from "./Event";
// import pupFiller from "../pictures/pupFiller.jpeg";

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

  return (
    <Jumbotron style={{ backgroundColor: "red" }}>
      <Event event={event} />
      {console.log(event)}
    </Jumbotron>
  );
};

export default EventContainer;
