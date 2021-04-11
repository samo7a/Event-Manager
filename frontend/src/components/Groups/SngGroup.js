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
import GroupContainer from "./GroupContainer";
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
    // <Container>
    //   <h1> My Groups </h1>

    //   <Row>
    //     <h3> Admin of these groups </h3>
    //     <Container style={{ backgroundColor: "red" }}>
    //       ADMIN OF THESE GROUPS
    //       <GroupContainer />
    //     </Container>
    //   </Row>
    //   <Row>
    //     <h3>Member of these groups</h3>
    //     <Container style={{ backgroundColor: "red" }}>
    //       Member OF THESE GROUPS
    //     </Container>
    //   </Row>
    // </Container>
    // <Jumbotron style={{ backgroundColor: "red" }}>
    //   {/* <Group group={group} /> */}S{/* {console.log(group)} */}
    // </Jumbotron>
    <Card className="rsoCard">
      <Row id="cardRow" style={{ padding: 0 }}>
        <Col id="thumbnailIMG" xs="6">
          <Card.Img
            className="thumbnailImage"
            src={GroupThumbnail}
            // thumbnail
            // style={{ margin: ".1rem" }}
          />
          {/* {console.log(group)} */}
        </Col>
        <Col xs="6" id="cardInfo" style={{ paddingLeft: ".1rem" }}>
          <Card className="rsoCard2">
            <Card.Title center className="rsoTitle">
              <h4>{rsoName}</h4>
            </Card.Title>
            <Row style={{ marginLeft: "0" }}>
              {/* <Card.Text style={{ marginLeft: "10rem" }}>
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
              </Card.Text> */}
            </Row>
            <Card.Text>
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
              <Card.Link>Click here to view options</Card.Link>
              <Card.Link href="#">View Group Page</Card.Link>
            </Row>
          </Card>
        </Col>
      </Row>
    </Card>
  );
};

export default SngGroup;
