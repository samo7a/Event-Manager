import React, { useState } from "react";
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
  const [createShow, setCreateShow] = useState(false);
  const createRSOClose = () => setCreateShow(false);
  const createRSOOpen = () => setCreateShow(true);
  //
  return (
    <Container>
      <h1 style={{ marginLeft: "-1rem" }}> My RSOs </h1>

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
                  <Form.Control type="text"></Form.Control>
                </Form.Group>
                <Form.Group controlID="rsoPic">
                  <Form.Label>Upload RSO profile picture</Form.Label>
                  <Form.File id="exampleFormControlFile1" label="" />
                </Form.Group>
                <Form.Group controlID="rsoName">
                  <Form.Label>Enter RSO name</Form.Label>{" "}
                  <Form.Control
                    style={{ marginRight: "1rem", width: "100%" }}
                    as="textarea"
                    rows="7"
                  />
                  <Form.Text>1000 characters maximum</Form.Text>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer
              className="modalFooter"
              style={{ marginBottom: "1rem", marginRight: "1rem" }}
            >
              <Button variant="primary" type="submit">
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
