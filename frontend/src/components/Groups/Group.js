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
  // Rso Details
  const [rsoDetails, setDetails] = useState({});
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
    // setName(props.group.name);
    // toggleActive(props.group.isActive);
    // setTotM(props.group.totalMembers);
    // setTotA(props.group.totalAdmins);

    getRsoDetails();
    // setThumbnail(props.group.groupTN);
  }, []);
  const getRsoDetails = async () => {
    try {
      var obj = {
        rso_id: props.rso_id,
      };
      var js = JSON.stringify(obj);
      const response = await fetch("/api/getRsoDetails", {
        method: "POST",
        credentials: "include",
        body: js,
        headers: { "Content-Type": "application/json" },
      });
      var res = JSON.parse(await response.text());
      console.log(res);
      if (response.status !== 200) {
        console.log(response.status);
      } else {
        console.log("RSO created");
        setDetails(res);
      }
    } catch (e) {
      console.log(e.toString());
      return;
    }
  };
  return (
    <div>
      <Card style={{ maxHeight: "8.12rem" }}>
        <Row id="cardRow" style={{ padding: 0 }}>
          <Col id="ThumbnailIMGCol" xs="auto" style={{ maxHeight: "10%" }}>
            <Image
              src={GroupThumbnail}
              roundedCircle
              className="groupThumbnailImage"
            />
            {/* {console.log(group)} */}
          </Col>
          <Col id="cardInfo" style={{ paddingLeft: ".1rem" }}>
            <Row style={{ marginLeft: "0" }}>
              <h4>{rsoDetails.rso_name}</h4>
              <Card.Text style={{ marginLeft: "10rem", marginTop: ".25rem" }}>
                {rsoDetails.status == "active" ? (
                  <span style={{ color: "green", fontWeight: "bold" }}>
                    Active
                  </span>
                ) : (
                  <span style={{ color: "red", fontWeight: "bold" }}>
                    Not active
                  </span>
                )}
              </Card.Text>
            </Row>

            <Card.Text overflow="hidden">
              {rsoDetails.rso_description}
            </Card.Text>
            <Row
              style={{
                width: "100%",
                marginLeft: 0,
              }}
            >
              <Card.Link
                style={{
                  marginRight: "-1rem",
                }}
                href="/single-group"
              >
                View Group Page
              </Card.Link>
            </Row>
          </Col>
        </Row>
      </Card>
    </div>
  );
};
export default Group;
