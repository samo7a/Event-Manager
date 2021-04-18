import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Image,
  Jumbotron,
  Modal,
  Form,
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
  // Local data
  var user = JSON.parse(localStorage.getItem("user_data"));
  var student_id = user ? user.id : "X";
  // create rso
  const [createShow, setCreateShow] = useState(false);
  const createRSOClose = () => setCreateShow(false);
  const createRSOOpen = () => setCreateShow(true);
  // MSG
  const [message, setMessage] = useState("");
  // getJoinedGroups
  const [joinedGroups, setJoinedGroups] = useState({});
  // New Rso fields
  var newRsoName;
  var newRsoDesc;
  var newRsoPic;
  useEffect(() => {
    getJoinedGroups();
  }, []);
  const getJoinedGroups = async () => {
    try {
      var sID = { s_id: student_id };
      var js = JSON.stringify(sID);
      const response = await fetch("/api/getJoinedGroups", {
        method: "POST",
        // credentials: "include",
        body: js,
        headers: { "Content-Type": "application/json" },
      });
      var res = JSON.parse(await response.text());
      if (response.status !== 200) {
        console.log(res.error);
      } else {
        console.log("GetJoinedGroups success");
        setJoinedGroups(res);
        console.log(joinedGroups);
      }
    } catch (e) {
      console.log(e.toString());
      return;
    }
  };

  const createNewRso = async (event) => {
    event.preventDefault();
    setMessage("");
    // Check if form is valid
    // Check if Rso name is taken?
    // Check length of desc
    // console.log(newRsoDesc.value.length);
    // console.log(newRsoDesc.value);
    if (newRsoName.value.length > 45) {
      console.error("nameErr");
      setMessage("The RSO name is over the maximum limit");
      return;
    }
    if (newRsoDesc.value.length > 1000) {
      console.error("Size to big");
      setMessage(
        "Description is " + (newRsoDesc.value.length - 1000) + "over the max"
      );
      return;
    }

    try {
      var newRso = {
        rso_name: newRsoName.value,
        rso_description: newRsoDesc.value,
        rso_profilePicture: newRsoPic.value,
        s_id: student_id,
      };
      var js = JSON.stringify(newRso);
      const response = await fetch("/api/createRso", {
        method: "POST",
        // credentials: "include",
        body: js,
        headers: { "Content-Type": "application/json" },
      });
      var res = JSON.parse(await response.text());
      if (response.status !== 200) {
        console.log(res.error);
      } else {
        console.log("RSO created");
      }
    } catch (e) {
      console.log(e.toString());
      return;
    }
  };
  return (
    <Container>
      <h1 style={{ marginLeft: "-1rem" }}> RSOs </h1>

      <Row>
        <Col xs="9" style={{ padding: 0 }}>
          <h3> Admin of these RSOs </h3>
        </Col>
        <Col xs="3">
          <Button variant="primary" onClick={createRSOOpen}>
            Create RSO
          </Button>
        </Col>
        <Container style={{ backgroundColor: "red" }}>
          ADMIN OF THESE GROUPS
          <GroupContainer />
        </Container>
      </Row>
      <Row>
        <h3>Member of these RSOs</h3>
        <Container style={{ backgroundColor: "red" }}>
          Member OF THESE GROUPS
        </Container>
      </Row>
      <Row>
        <h3>Other RSOs at your university</h3>
        <Container style={{ backgroundColor: "red" }}>
          Member OF THESE GROUPS
        </Container>
      </Row>
      <div>
        {/* CREATE RSO MODAL */}
        <div>
          <Modal
            class="modal-lg"
            style={{
              marginTop: "1.75rem",
            }}
            show={createShow}
            onHide={createRSOClose}
          >
            <Modal.Header>
              <Modal.Title>Create RSO Page</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlID="rsoName">
                  <Form.Label>Enter RSO name</Form.Label>

                  <Form.Control type="text" ref={(c) => (newRsoName = c)} />
                  <Form.Text>45 characters maximum</Form.Text>
                </Form.Group>
                <Form.Group controlID="rsoPic">
                  <Form.Label>Upload RSO profile picture</Form.Label>
                  <Form.File label="" ref={(c) => (newRsoPic = c)} />
                  <Form.Text>5 MB maximum</Form.Text>
                </Form.Group>
                <Form.Group controlID="rsoName">
                  <Form.Label>Enter RSO description</Form.Label>{" "}
                  <Form.Control
                    style={{ marginRight: "1rem", width: "100%" }}
                    as="textarea"
                    ref={(c) => (newRsoDesc = c)}
                    rows="7"
                  />
                  <Form.Text>1000 characters maximum</Form.Text>
                  <Form.Text>
                    {" "}
                    {message != "" ? (
                      <span id="errorMSG">
                        <span style={{ color: "red" }}>Error : </span>
                        {message}
                      </span>
                    ) : null}
                  </Form.Text>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer
              className="modalFooter"
              style={{ marginBottom: "1rem", marginRight: "1rem" }}
            >
              <Button variant="primary" type="submit" onClick={createNewRso}>
                Create RSO
              </Button>
              <Button variant="primary" type="submit" onClick={createRSOClose}>
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </Container>
  );
};

export default MyGroups;
