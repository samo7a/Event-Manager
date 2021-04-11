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
// import "./GroupContainer.css";
import GroupContainer from "./GroupContainer";
// import pupFiller from "../pictures/pupFiller.jpeg";

const MyGroups = (props) => {
  const group = {
    name: "Group Name",
    rso: "rso name",
    desc: "THis is the description area",
    date: "MM/DD/YYYY",
  };
  const [showEvent, setShowEvent] = useState(false);
  const eventClose = () => setShowEvent(false);
  const eventOpen = () => setShowEvent(true);

  return (
    <Container>
      <h1> My Groups </h1>

      <Row>
        <h3> Admin of these groups </h3>
        <Container style={{ backgroundColor: "red" }}>
          ADMIN OF THESE GROUPS
          <GroupContainer />
        </Container>
      </Row>
      <Row>
        <h3>Member of these groups</h3>
        <Container style={{ backgroundColor: "red" }}>
          Member OF THESE GROUPS
        </Container>
      </Row>
    </Container>
    // <Jumbotron style={{ backgroundColor: "red" }}>
    //   {/* <Group group={group} /> */}S{/* {console.log(group)} */}
    // </Jumbotron>
  );
};

export default MyGroups;
