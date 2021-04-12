import React, { useState, useEffect } from "react";
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
import "./SngGroup.css";
import EventContainer from "../Events/EventContainer";
// import pupFiller from "../pictures/pupFiller.jpeg";
import GroupThumbnail from "../../pictures/GroupThumbnail.jpg";

const SngGroup = (props) => {
  const group = {
    name: "Group Name",
    rso: "rso name",
    desc: "THis is the description area",
    date: "MM/DD/YYYY",
  };
  const [showEvent, setShowEvent] = useState(false);
  const eventClose = () => setShowEvent(false);
  const eventOpen = () => setShowEvent(true);
  // Event fields
  const rsoName = "Florida Outdoor Adventure Club";
  const isActive = true;
  //   const [eventDesc, setDesc] = useState("S");
  const totalMembers = 19;
  const totalAdmins = 5;
  //   const [groupTN, setThumbnail] = useState("");

  return (
    <Card className="rsoCard">
      <Row id="cardRow" style={{ padding: 0, width: "auto" }}>
        <Col id="thumbnailIMG" xs="5">
          <Card.Img className="thumbnailImage" src={GroupThumbnail} />
        </Col>
        <Col xs="7" id="cardInfo" style={{ marginTop: "1rem" }}>
          <Card className="rsoCard2">
            <Card.Title center className="rsoTitle">
              <h4>{rsoName}</h4>
            </Card.Title>
            <Row style={{ marginLeft: "0" }}>
              <Card.Subtitle
                style={{ marginLeft: ".0rem", marginTop: "-1.5rem" }}
              >
                This group is{" "}
                {isActive ? (
                  <span style={{ color: "green", fontWeight: "bold" }}>
                    active
                  </span>
                ) : (
                  <span style={{ color: "red", fontWeight: "bold" }}>
                    not active
                  </span>
                )}
              </Card.Subtitle>
            </Row>
            <Card.Text>
              <Row style={{ height: "15rem", marginRight: ".5rem" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
                tincidunt, et lobortis eleifend, mauris urna molestie sem, et
                tincidunt mauris arcu non diam. Proin sit amet urna neque. In
                velit dolor, eleifend ac auctor et, vehicula ac orci. Vestibulum
                sodales, ex in condimentum gravida, est metus dignissim enim, id
                tristique enim nulla et neque. Aenean vulputate aliquam
                imperdiet. Suspendisse auctor mauris at tristique ultrices.
                Donec ultricies accumsan mauris, ut commodo elit. Fusce blandit
                velit in nisi elementum semper.
              </Row>
              <Row>
                <Col>
                  <div>Total Members: {totalMembers} </div>
                </Col>
                <Col>
                  <span style={{ marginLeft: "1.5rem" }}>
                    Total Admins: {totalAdmins}
                  </span>
                </Col>
              </Row>
              {/* <span>Total Members: {totalMembers} </span>
              <span style={{ marginLeft: "1.5rem" }}>
                Total Admins: {totalAdmins}
              </span> */}
              {/* <span> Addt. info:# </span> */}
              {/* <div>Next event: Fun day at the park!</div> */}
            </Card.Text>
            <Row style={{ marginLeft: 0 }}>
              <Card.Link>IF ADMIN Click here to view options</Card.Link>
              {/* <Card.Link href="#">View Group Page</Card.Link> */}
            </Row>
          </Card>
        </Col>
      </Row>

      <Card style={{ margin: "1rem" }}>
        <Card.Title className="upComingETitle">
          <div className="upComingETitle">Upcoming Events</div>
        </Card.Title>
        <Card.Body>{/* <EventContainer /> */}</Card.Body>
      </Card>
    </Card>
  );
};

export default SngGroup;
