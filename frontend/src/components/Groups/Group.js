import React, { useState, useEffect } from "react";
import {
  Card,
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
import "./Group.css";
import GroupThumbnail from "../../pictures/GroupThumbnail.jpg";

const Group = (props) => {
  // Modal fields
  const [show, setShow] = useState(false);
  const modalOpen = () => setShow(true);
  const modalClose = () => setShow(false);
  // Group fields
  const [rsoName, setName] = useState("");
  const [isActive, toggleActive] = useState(false);
  //   const [eventDesc, setDesc] = useState("S");
  const [totalMembers, setTotM] = useState("NaN");
  const [totalAdmins, setTotA] = useState("NaN");
  //   const [groupTN, setThumbnail] = useState("");

  useEffect(() => {
    setName(props.group.name);
    toggleActive(props.group.isActive);
    setTotM(props.group.totalMembers);
    setTotA(props.group.totalAdmins);
    // setThumbnail(props.group.groupTN);
  }, []);

  // const activeStatus = {isActive ?
  // {<span>}"active" : "not active"};
  return (
    <div>
      <Card style={{ maxHeight: "8.12rem" }}>
        <Row id="cardRow" style={{ padding: 0 }}>
          <Col id="ThumbnailIMGCol" xs="auto" style={{ maxHeight: "10%" }}>
            {/* <Card.Img
              className="groupThumbnailImage"
              src={GroupThumbnail}
              // thumbnail
              roundedCircle
              style={{ margin: ".1rem" }}
            /> */}
            <Image
              src={GroupThumbnail}
              roundedCircle
              className="groupThumbnailImage"
            />
            {/* {console.log(group)} */}
          </Col>
          <Col id="cardInfo" style={{ paddingLeft: ".1rem" }}>
            {/* <Card> */}
            <Row style={{ marginLeft: "0" }}>
              <h4>{rsoName}</h4>
              <Card.Text style={{ marginLeft: "10rem", marginTop: ".25rem" }}>
                {/* <h4>RSO NAME</h4> */}
                {/* This group is{" "} */}
                {isActive ? (
                  <span style={{ color: "green", fontWeight: "bold" }}>
                    Active
                  </span>
                ) : (
                  <span style={{ color: "red", fontWeight: "bold" }}>
                    ot active
                  </span>
                )}
              </Card.Text>
            </Row>
            {/* <Card.Text>
              <span>Total Members: {totalMembers} </span>
              <span style={{ marginLeft: "1.5rem" }}>
                Total Admins: {totalAdmins}
              </span>
              <div>Next event: Fun day at the park!</div>
            </Card.Text> */}
            <Card.Text overflow="hidden">
              I go to loud places To search for someone To be quiet with Who
              will take me home You go to loud places To find someone who Will
              take you higher than I took you Didn't I take you to higher places
              you can't reach without me?
            </Card.Text>
            <Row
              style={{
                width: "100%",
                marginLeft: 0,
                // display: "flex",
                // alignItems: "flex-end",
              }}
            >
              {/* <Card.Link>Click here to view options</Card.Link> */}
              <Card.Link
                style={{
                  // marginLeft: "10rem",
                  // display: "flex",
                  // alignItems: "inherit",
                  marginRight: "-1rem",
                }}
                href="/single-group"
              >
                View Group Page
              </Card.Link>
            </Row>
            {/* </Card> */}
          </Col>

          {/* <Col></Col> */}
        </Row>
      </Card>
    </div>
  );
};
export default Group;
