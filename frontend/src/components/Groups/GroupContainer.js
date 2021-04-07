import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  Image,
  Jumbotron,
  Modal,
  Row,
  Card,
} from "react-bootstrap";
import "./GroupContainer.css";
import Group from "./Group";
import GroupThumbnail from "../../pictures/GroupThumbnail.jpg";

const GroupContainer = (props) => {
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
    <Jumbotron style={{ backgroundColor: "red" }}>
      {/* <Group group={group} /> */}
      <Card>
        <Row style={{ padding: 0 }}>
          <Col style={{ paddingLeft: "1rem" }}>
            <Image className="thumbnailImage" src={GroupThumbnail} thumbnail />
            {/* {console.log(group)} */}
          </Col>
          <Col xs="10" style={{ padding: 0 }}>
            {/* <Card> */}
            <Row style={{ marginLeft: "0" }}>
              <h4>RSO NAME</h4>
              <Card.Text style={{ marginLeft: "10rem" }}>
                {/* <h4>RSO NAME</h4> */}
                This group is active
              </Card.Text>
            </Row>
            <Card.Text>
              <span>Total Members:## </span>
              <span style={{ marginLeft: "1.5rem" }}>Total Admins:## </span>
              <span>:# </span>
              <div>Next event: Fun day at the park!</div>
            </Card.Text>
            <Row style={{ marginLeft: 0 }}>
              <Card.Link>Click here to view options</Card.Link>
            </Row>
            {/* </Card> */}
          </Col>

          {/* <Col></Col> */}
        </Row>
      </Card>
    </Jumbotron>
  );
};

export default GroupContainer;
