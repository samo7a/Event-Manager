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
import SingleGroup from "./SngGroup";
const Group = (props) => {
  // Rso Details
  const [rsoDetails, setDetails] = useState({});
  // Modal fields
  const [show, setShow] = useState(false);
  const modalOpen = () => setShow(true);
  const modalClose = () => setShow(false);

  useEffect(() => {
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
            </Row>

            <Card.Text overflow="hidden">
              {rsoDetails.rso_description}
            </Card.Text>
            <Row
              style={{
                width: "100%",
                display: "flex",
                // alignItems:""
                // marginLeft: 0,
                position: "absolute",
                bottom: "0",
              }}
            >
              <Col>
                <Card.Link style={{}} onClick={modalOpen}>
                  View Group Page
                </Card.Link>
              </Col>
              <Col>
                <Card.Text style={{ right: "0" }}>
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
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
      <div>
        <Modal show={show} onHide={modalClose}>
          <Container className="modalContainer">
            <Modal.Header>
              <Button
                type="primary"
                style={{ position: "fixed", zIndex: "4", right: "10%" }}
                onClick={() => {
                  modalClose();
                }}
              >
                Close Event
              </Button>
            </Modal.Header>
            {/* CANT CLOSE MODAL, NEED TO FIND ALT way to size it */}
            <Modal.Body
              style={{
                position: "fixed",
                overflowX: "hidden",
                top: "0",
                right: "0",
                bottom: 0,
                left: 0,
              }}
            >
              {/* UNCOMMENT THIS ONE TO TEST */}
              <SingleGroup rso_id={props.rso_id} />
              {/* <EventInfoPage eID={eventID} /> */}
            </Modal.Body>
          </Container>
        </Modal>
      </div>
    </div>
  );
};
export default Group;
