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
  // Event fields
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

  return (
    <div>
      <Card>
        <Row id="cardRow" style={{ padding: 0 }}>
          <Col id="thumbnailIMG" xs="auto" style={{ maxHeight: "100%" }}>
            <Card.Img
              className="thumbnailImage"
              src={GroupThumbnail}
              thumbnail
              style={{ margin: ".1rem" }}
            />
            {/* {console.log(group)} */}
          </Col>
          <Col id="cardInfo" style={{ paddingLeft: ".1rem" }}>
            {/* <Card> */}
            <Row style={{ marginLeft: "0" }}>
              <h4>{rsoName}</h4>
              <Card.Text style={{ marginLeft: "10rem" }}>
                {/* <h4>RSO NAME</h4> */}
                This group is {isActive ? "active" : "not active"}
              </Card.Text>
            </Row>
            <Card.Text>
              <span>Total Members: {totalMembers} </span>
              <span style={{ marginLeft: "1.5rem" }}>
                Total Admins: {totalAdmins}
              </span>
              {/* <span> Addt. info:# </span> */}
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
    </div>
  );
};
export default Group;
