// TODO
// Leave RSO
// Remove Admin List
// Add event list
// Add rest of edits
// Add Contact info for single admin

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
  Table,
  Form,
} from "react-bootstrap";
import "./SngGroup.css";
// import Table from "react-bootstrap/Table";
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
  // Local data
  var user = JSON.parse(localStorage.getItem("user_data"));
  console.log(user);
  const s_id = user ? user.id : null;
  // Modal fields
  var rnameEdit;
  var descEdit;
  var cnameEdit;
  var emailEdit;
  // member/admin list modals
  const [showMem, setMemShow] = useState(false);
  const [showContactInfo, setAdmShow] = useState(false);
  const handleMClose = () => setMemShow(false);
  const handleMOpen = () => setMemShow(true);
  const handleCIClose = () => setAdmShow(false);
  const handleCIOpen = () => setAdmShow(true);
  // edit modal
  const [showEdit, setEditShow] = useState(false);
  const handleEditClose = () => setEditShow(false);
  const handleEditOpen = () => setEditShow(true);
  // leave modal
  const [showLeave, setLeaveShow] = useState(false);
  const handleLeaveClose = () => setLeaveShow(false);
  const handleLeaveOpen = () => setLeaveShow(true);
  // Group fields
  const rsoNameDEBUG = "Florida Outdoor Adventure Club";
  const isActive = true;
  const totalMembers = 19;
  const totalAdmins = 5;
  // Message
  const [message, setMessage] = useState("");

  // Rso Details
  const [rsoID, setRsoID] = useState("");
  const [rsoName, setRsoName] = useState("");
  const [rsoDesc, setRsoDesc] = useState("");
  const [rsoDetails, setDetails] = useState({
    admin: {},
    members: [{}],
    events: [{}],
  });

  const debugGroup = {
    rso_name: "DebugName",
    status: "inactive",
    rso_description: "rso Desc",
    no_of_members: 11,
    admin: {
      s_id: 0,
      s_name: "s_name",
      s_email: "email",
    },
    members: [
      {
        s_id: 1,
        s_firstName: "sFname",
        s_lastName: "sLname",
        s_profilePicture: null,
      },
    ],
    events: [
      {
        e_id: 99,
        e_name: "eName",
        e_description: "eDesc",
        e_date: "2012/12/30",
      },
    ],
  };

  useEffect(() => {
    getRsoDetails();
  }, []);
  const getRsoDetails = async () => {
    try {
      setRsoID(props.rso_id);
      // setRsoID(13);

      var obj = { rso_id: 13 };
      var js = JSON.stringify(obj);
      let response = await fetch("/api/getRsoDetails", {
        method: "POST",
        // credentials: "include",

        headers: {
          "Content-Type": "application/json",
        },
        body: js,
      });
      var res = JSON.parse(await response.text());
      if (response.status != 200) {
        throw new Error(response.status);
      } else {
        setDetails(res);
        console.log(res);
        setRsoDesc(res.rso_description);
        setRsoName(res.rso_name);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const leaveRSO = async () => {
    try {
      setRsoID(props.rso_id);
      // setRsoID(13);
      var obj = {
        rso_id: 13,
        s_id: s_id,
      };
      console.log(obj);

      var js = JSON.stringify(obj);

      let response = await fetch("/api/leaveRso", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },
        body: js,
      });
      if (response.status != 200) {
        throw new Error(response.status);
      } else {
        setMessage("Left Successfully!");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  // Join RSO
  const joinRSO = async () => {
    // preventDefault();
    try {
      var obj = {
        rso_id: 13,
        s_id: s_id,
      };
      console.log(obj);

      var js = JSON.stringify(obj);

      let response = await fetch("/api/joinRso", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },
        body: js,
      });
      if (response.status != 200) {
        throw new Error(response.status);
      } else {
        setMessage("Joined Successfully!");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  // edit rso
  const editRSO = async () => {
    // preventDefault();
    console.log(rsoName);
    console.log(rsoDesc);
    console.log(rnameEdit.value);
    console.log(descEdit.value);
    rnameEdit == "" ? setRsoName(rsoName) : setRsoName(rnameEdit.value);
    descEdit == "" ? setRsoDesc(rsoDesc) : setRsoDesc(descEdit.value);
    try {
      var obj = {
        rso_id: 13,
        rso_name: rsoName,
        rso_description: rsoDesc,
      };
      console.log(obj);

      var js = JSON.stringify(obj);

      let response = await fetch("/api/updateRso", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },
        body: js,
      });
      if (response.status != 200) {
        throw new Error(response.status);
      } else {
        setMessage("Updated Successfully!");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const generateMembers =
    rsoDetails.members != null ? (
      rsoDetails.members.length == 0 ? (
        <span>No members!</span>
      ) : (
        rsoDetails.members.map((e, i) => {
          <tr>
            <td className="tableNumCol">{i}</td>
            <td className="tableCol">
              <Image
                src={GroupThumbnail}
                roundedCircle
                className="groupThumbnailImage"
                style={{ maxWidth: "2rem" }}
              />
              {e.s_firstName + " " + e.s_lastName}
            </td>
          </tr>;
        })
      )
    ) : null;

  return (
    <div style={{ margin: "auto", minWidth: "40%" }}>
      <Card className="rsoCard">
        <Row id="cardRow" style={{ padding: 0, width: "auto" }}>
          <Col id="thumbnailIMG" xs="5" style={{ maxWidth: "22rem" }}>
            <Card.Img className="thumbnailImage" src={GroupThumbnail} />
            {/* <Card.Link
              onClick={handleEditOpen}
              style={{
                marginLeft: "25%",
                marginRight: "25%",
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              Click here to edit page
            </Card.Link> */}
          </Col>
          <Col xs="7" id="cardInfo" style={{ marginTop: "1rem" }}>
            <Card className="rsoCard2">
              <Card.Title center className="rsoTitle">
                <h4>{rsoDetails.rso_name}</h4>
              </Card.Title>
              <Row style={{ marginLeft: "0" }}>
                <Card.Subtitle
                  style={{ marginLeft: ".0rem", marginTop: "-1.5rem" }}
                >
                  This group is{" "}
                  {rsoDetails.status == "active" ? (
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
                <Row
                  style={{
                    height: "15rem",
                    marginRight: ".5rem",
                    overflowY: "auto",
                  }}
                >
                  {rsoDetails.rso_description}
                </Row>
              </Card.Text>
            </Card>
          </Col>
        </Row>
        <Row style={{}}>
          <Col xs="4">
            <Card.Link
              onClick={handleEditOpen}
              style={{
                marginLeft: "20%",
                // marginRight: "25%",
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              Click here to edit page
            </Card.Link>
          </Col>
          <Col xs="2">
            <Row>
              <div style={{ fontWeight: "bold" }}>Total Members</div>:{" "}
              {rsoDetails.members.length}{" "}
            </Row>
            <Row>
              <Card.Link onClick={handleMOpen} style={{ cursor: "pointer" }}>
                View Members
              </Card.Link>
            </Row>
          </Col>
          <Col xs="4">
            <Row>
              <div style={{ fontWeight: "bold" }}>Admin</div>:{" "}
              {rsoDetails.admin.s_name}{" "}
            </Row>
            <Row>
              <Card.Link onClick={handleCIOpen} style={{ cursor: "pointer" }}>
                Contact Info
              </Card.Link>
            </Row>
          </Col>
        </Row>
        <Row>
          {message != "" ? (
            <span id="errorMSG">
              <span style={{ color: "blue" }}> Alert!: </span>
              {message}
            </span>
          ) : null}
        </Row>
        <Row style={{ marginLeft: "1rem" }}>
          <Button variant="danger" onClick={handleLeaveOpen}>
            Leave RSO
          </Button>
          <Button
            style={{ marginLeft: "1rem" }}
            variant="primary"
            onClick={joinRSO}
          >
            Join RSO
          </Button>
        </Row>
        <Card style={{ margin: "1rem" }}>
          <Card.Title className="upComingETitle">
            <div className="upComingETitle">Upcoming Events</div>
          </Card.Title>
          <Card.Body>{/* <EventContainer /> */}</Card.Body>
        </Card>
      </Card>
      {/* LEAVE RSO MODAL */}
      <div>
        <Modal
          style={{ textAlign: "center" }}
          show={showLeave}
          onHide={handleLeaveClose}
        >
          <Modal.Title>Leaving Confirmation</Modal.Title>
          <Modal.Body style={{ marginLeft: "0rem" }}>
            Are you sure you would like to leave this RSO? You can rejoin at any
            time.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={leaveRSO}>
              Leave RSO
            </Button>
            <Button variant="primary" onClick={handleLeaveClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      {/* MEMBER LIST MODAL*/}
      <div>
        <Modal show={showMem} onHide={handleMClose}>
          <Modal.Header>
            <Modal.Title>Member List</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table striped bordered hover style={{ display: "block" }}>
              <thread>
                <tr>
                  <th className="tableNumCol">#</th>
                  <th className="tableCol">Member</th>
                  {/* <th className="tableCol">Email</th> */}
                </tr>
              </thread>
              <tbody>{generateMembers}</tbody>
            </Table>
            <Modal.Footer className="modalFooter">
              <Button onClick={handleMClose}>Close</Button>
            </Modal.Footer>
          </Modal.Body>
        </Modal>
      </div>
      {/* Contact info MODAL */}
      <div>
        <Modal show={showContactInfo} onHide={handleCIClose}>
          <Modal.Header style={{ justifyContent: "center" }}>
            <Modal.Title>Admin Contact Info</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row className="row justify-content-center">
              {rsoDetails.admin.s_name}{" "}
            </Row>
            <Row className="row justify-content-center">
              {rsoDetails.admin.s_email}
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleCIClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
      {/* Edit page Modal */}
      <div>
        <Modal
          class="modal-lg"
          style={{
            // marginLeft: "30%",
            // marginRight: "auto",
            // width: "200%",
            marginTop: "1.75rem",
          }}
          show={showEdit}
          onHide={handleEditClose}
          // style={{ margin: 0 }}
          // contentClassName="modal1"
          // flex
        >
          <Modal.Header style={{ textAlign: "center", margin: "auto" }}>
            <Modal.Title>Edit RSO Page</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form style={{ textAlign: "center" }}>
              {/* <Row className="center" style={{ textAlign: "center" }}>
                <Col sm="4">Confirm Edit(s)</Col>
              </Row> */}
              <Row>
                {/* <Col sm="4" className="">
                  <Form.Check
                    type="checkbox"
                    className="editCol"
                    label="Edit Name"
                  />
                </Col> */}
                <Col>
                  <Form.Group style={{ textAlign: "center" }}>
                    <Form.Label>
                      RSO Name
                      <Form.Control
                        ref={(c) => (rnameEdit = c)}
                        style={{ width: "100%" }}
                        type="text"
                        // rows="10"
                      />
                      <Form.Text>XXX character maximum</Form.Text>
                    </Form.Label>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                {/* <Col sm="4" className="">
                  <Form.Check
                    type="checkbox"
                    className="editCol"
                    label="Edit Description"
                  />
                </Col> */}
                <Col>
                  <Form.Group style={{ marginLeft: "0rem", textAlign: "none" }}>
                    <Form.Label>
                      RSO description
                      <Form.Control
                        style={{ margin: "auto", width: "140%" }}
                        as="textarea"
                        rows="5"
                        // onSubmit={setRsoDesc(descEdit)}
                        ref={(c) => (descEdit = c)}
                      />
                      <Form.Text>256 character maximum</Form.Text>
                    </Form.Label>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="centerText" style={{ textAlign: "center" }}>
                <h5 style={{ margin: "auto" }}> Contatct Information</h5>
              </Row>
              <Row>
                {/* <Col sm="4" className="">
                  <Form.Check
                    type="checkbox"
                    className="editCol"
                    label="Edit Name"
                  />
                </Col> */}
                <Col>
                  <Form.Group style={{ margin: "auto", textAlign: "none" }}>
                    <Form.Label>
                      Name
                      <Form.Control
                        ref={(c) => (cnameEdit = c)}
                        style={{ margin: "auto", width: "100%" }}
                        type="text"
                      />
                    </Form.Label>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                {/* <Col sm="4" className="">
                  <Form.Check
                    type="checkbox"
                    className="editCol"
                    label="Edit Email"
                  />
                </Col> */}
                <Col>
                  <Form.Group
                    style={{
                      margin: "auto",
                      alignItems: "center",
                      // textAlign: "none",
                    }}
                  >
                    <Form.Label>
                      Email
                      <Form.Control
                        ref={(c) => (emailEdit = c)}
                        style={{
                          alignItems: "center",
                          margin: "auto",
                          width: "140%",
                        }}
                        type="email"
                      />
                    </Form.Label>
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer
            className="modalFooter"
            style={{ marginBottom: "1rem", marginRight: "1rem" }}
          >
            <Button variant="primary" onClick={editRSO}>
              Make changes
            </Button>
            <Button variant="primary" onClick={handleEditClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default SngGroup;
