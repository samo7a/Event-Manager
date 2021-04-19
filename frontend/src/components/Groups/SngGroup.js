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
  InputGroup,
  FormControl,
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
  // console.log(user);
  const s_id = user ? user.id : null;
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMember, setIsMember] = useState(false); // Modal fields
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
  // create event modal
  const [createShow, setCreateShow] = useState(false);
  const createEventClose = () => setCreateShow(false);
  const createEventOpen = () => setCreateShow(true);
  var createEventObj = {
    rso_id: 0,
    e_name: "",
    e_description: "",
    e_contactEmail: "",
    e_contactPhone: "",
    e_type: "",
    locationName: "",
    address: "",
    e_category: "",
    e_time: "",
    e_date: "",
    e_profilePicture: "",
    s_id: s_id,
  };
  // newEvent fields
  var eventHR;
  var eventMIN;
  var eventDay;
  var eventMonth;
  var eventYear;
  // Create event
  const createEvent = async (event) => {
    event.preventDefault();
    setError("");
    console.log("Check before Validif. :: ");
    console.log(createEventObj);
    if (createEventObj.e_name.value.length == 0) {
      setError("Please include event name");
      return;
    }
    if (createEventObj.e_name.value.length > 45) {
      setError("Event Name exceed limit of 45 Characters");
      return;
    }
    if (createEventObj.e_description == null) {
      setError("Please fill all fields");
      return;
    }
    if (createEventObj.e_description.value.length > 1000) {
      setError("Over max");
      return;
    }
    if (createEventObj.e_contactEmail == null) {
      setError("Please enter an email");
      return;
    }
    var expression = /\S+@\S+/;
    if (!expression.test(createEventObj.e_contactEmail.value.toLowerCase())) {
      setError("Please enter a valid email address");
      return;
    }
    if (createEventObj.e_contactPhone == null) {
      setError("Please fill all fields");
      return;
    }
    // if (createEventObj.e_contactPhone.value.length != 12) {
    //   setError("Enter valid phone #");
    //   return;
    // }
    if (eventHR == null) {
      setError("Please fill all fields");
      return;
    }
    if (eventMIN == null) {
      setError("Please fill all fields");
      return;
    }
    if (eventHR >= 24) {
      setError("Please enter a valid hour (0 - 23)");
      return;
    }
    if (eventMIN >= 60) {
      setError("Please enter a valid minute (0 - 59)");
      return;
    }
    if (eventDay == null) {
      setError("Please fill all fields");
      return;
    }
    if (eventMonth == null) {
      setError("Please fill all fields");
      return;
    }
    if (eventYear == null) {
      setError("Please fill all fields");
      return;
    }
    var formatTime = eventHR.value + ":" + eventMIN.value;
    console.log("event time : " + formatTime);
    var formatDate =
      "20" + eventYear.value + "/" + eventMonth.value + "/" + eventDay.value;
    var rso_id = createEventObj.rso_id;
    var s_id = createEventObj.s_id;
    var e_name = createEventObj.e_name.value;
    var e_description = createEventObj.e_description.value;
    var e_contactEmail = createEventObj.e_contactEmail.value;
    var e_contactPhone = createEventObj.e_contactPhone.value;
    var e_type = createEventObj.e_type.value;
    var locationName = createEventObj.locationName.value;
    var address = createEventObj.address.value;
    var e_category = createEventObj.e_category.value;

    try {
      var newEvent = {
        // rso_id: props.rso_id,
        rso_id: props.rso_id,
        s_id: s_id,
        e_name: e_name,
        e_description: e_description,
        e_contactEmail: e_contactEmail,
        e_contactPhone: e_contactPhone,
        e_type: "rso",
        locationName: locationName,
        address: address,
        e_category: e_category,
        e_time: formatTime,
        e_date: formatDate,
        // e_profilePicture: null,
        // isApproved: 1,
      };
      console.log(newEvent);
      var js = JSON.stringify(newEvent);

      const response = await fetch("/api/createEventRso", {
        method: "POST",
        // credentials: "include",
        body: js,
        headers: { "Content-Type": "application/json" },
      });
      var res = JSON.parse(await response.text());
      if (response.status !== 200) {
        console.log(res.error);
      } else {
        console.log("Rso Created event");
        console.log(res);
      }
    } catch (e) {
      console.log(e.toString());
      return;
    }
  };
  // Group fields
  const rsoNameDEBUG = "Florida Outdoor Adventure Club";
  const isActive = true;
  const totalMembers = 19;
  const totalAdmins = 5;
  // Message
  const [message, setMessage] = useState("");
  const [errorMessage, setError] = useState("");

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

      var obj = { rso_id: props.rso_id };
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
        console.log(res.rso_id);

        s_id == res.admin.s_id ? setIsAdmin(true) : setIsAdmin(false);
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
        rso_id: props.rso_id,
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
        rso_id: props.rso_id,
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
        setIsMember(true);
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
    // rnameEdit.value == "" ? setRsoName(rsoName) : setRsoName(rnameEdit.value);
    // descEdit.value == "" ? setRsoDesc(rsoDesc) : setRsoDesc(descEdit.value);
    try {
      var objN = rnameEdit.value == "" ? rsoName : rnameEdit.value;
      var objD = descEdit.value == "" ? rsoDesc : descEdit.value;
      var obj = {
        rso_id: props.rso_id,
        rso_name: objN,
        rso_description: objD,
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
          return (
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
            </tr>
          );
        })
      )
    ) : null;
  const formatDate = (param) => {
    if (param != null) {
      let returnVar = "";
      returnVar +=
        param.substring(8, 10) +
        "/" +
        param.substring(5, 7) +
        "/" +
        param.substring(0, 4);
      return returnVar;
    } else return "No date";
  };
  return (
    <div style={{ margin: "auto", minWidth: "40%" }}>
      <Card className="rsoCard">
        <Row id="cardRow" style={{ padding: 0, width: "auto" }}>
          <Col id="thumbnailIMG" xs="5" style={{ maxWidth: "22rem" }}>
            <Card.Img className="thumbnailImage" src={GroupThumbnail} />
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
            {isAdmin ? (
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
            ) : null}
          </Col>
          <Col xs="4">
            <Row>
              <div style={{ fontWeight: "bold", marginRight: "1rem" }}>
                Total Members
              </div>
              : {rsoDetails.members.length}{" "}
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

        <Row style={{ marginLeft: "1rem" }}>
          {isAdmin || isMember ? (
            <Button variant="danger" onClick={handleLeaveOpen}>
              Leave RSO
            </Button>
          ) : null}
          {!isAdmin ? (
            <Button
              style={{ marginLeft: "1rem" }}
              variant="primary"
              onClick={joinRSO}
            >
              Join RSO
            </Button>
          ) : null}
          {isAdmin ? (
            <Button
              style={{ marginLeft: "1rem" }}
              variant="primary"
              onClick={createEventOpen}
            >
              Create Event
            </Button>
          ) : null}
        </Row>
        <Row style={{ width: "100%", justifyContent: "center" }}>
          {message != "" ? (
            <span id="errorMSG">
              <span style={{ color: "blue" }}> Alert!: </span>
              {message}
            </span>
          ) : null}
        </Row>
        <Card style={{ margin: "1rem" }}>
          <Card.Title className="upComingETitle">
            <div className="upComingETitle">Upcoming Events</div>
          </Card.Title>
          <Card.Body>
            {rsoDetails.events.map((e) => {
              return (
                <Container
                  style={{
                    marginLeft: "0",
                    marginBottom: ".5rem",
                    border: "1px solid black",
                  }}
                >
                  <Card.Text
                    style={{
                      margin: "0",
                    }}
                  >
                    <span>
                      <span
                        style={{
                          margin: "0",
                          fontWeight: "bold",
                          fontSize: "2rem",
                        }}
                      >
                        {e.e_name}
                      </span>
                    </span>
                  </Card.Text>
                  <Card.Text style={{ margin: "0" }}>
                    {e.e_description}
                  </Card.Text>
                  <Card.Text style={{ margin: "0" }}>
                    {formatDate(e.e_date)}
                  </Card.Text>
                </Container>
              );
            })}
          </Card.Body>
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
        {/* CREATE Event MODAL */}
        <div>
          <Modal
            class="modal-lg"
            style={{
              marginTop: "1.75rem",
            }}
            show={createShow}
            onHide={createEventClose}
          >
            <Modal.Header>
              <Modal.Title>Create Event</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlID="eventName">
                  <Form.Label>Enter event name</Form.Label>
                  <Form.Control
                    placeholder="Event Name"
                    type="text"
                    ref={(c) => (createEventObj.e_name = c)}
                  ></Form.Control>
                  <Form.Text>45 characters maximum</Form.Text>
                </Form.Group>
                <Form.Group controlID="eventDesc">
                  <Form.Label>Enter event description</Form.Label>{" "}
                  <Form.Control
                    placeholder="Please enter a description about the event"
                    style={{ marginRight: "1rem", width: "100%" }}
                    as="textarea"
                    ref={(c) => (createEventObj.e_description = c)}
                    rows="7"
                  />
                  <Form.Text>1000 characters maximum</Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label> Contact email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    ref={(c) => (createEventObj.e_contactEmail = c)}
                  />
                  <Form.Text className="text-muted"></Form.Text>
                </Form.Group>
                <Form.Group controlID="eventName">
                  <Form.Label>Enter contact phone number</Form.Label>
                  <Form.Control
                    type="text"
                    ref={(c) => (createEventObj.e_contactPhone = c)}
                  />
                  <Form.Text>Please enter in the form: XXX-XXX-XXXX</Form.Text>
                </Form.Group>

                <Form.Label>Enter event location</Form.Label>
                <Form.Control
                  type="text"
                  ref={(c) => (createEventObj.locationName = c)}
                />

                <Form.Label>Enter event address</Form.Label>
                <Form.Control
                  type="text"
                  ref={(c) => (createEventObj.address = c)}
                />

                <Form.Label>Enter event category</Form.Label>
                <Form.Control
                  type="text"
                  ref={(c) => (createEventObj.e_category = c)}
                />
                <Form.Label>Enter event time in 24Hr format</Form.Label>
                <InputGroup className="mb-3">
                  <FormControl placeholder="Hour" ref={(c) => (eventHR = c)} />
                  <FormControl
                    placeholder="Minutes"
                    ref={(c) => (eventMIN = c)}
                  />
                </InputGroup>
                <Form.Label>Enter event date</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text>DD/MM/YY</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl ref={(c) => (eventDay = c)} />
                  <FormControl ref={(c) => (eventMonth = c)} />
                  <FormControl ref={(c) => (eventYear = c)} />
                </InputGroup>
                {/* <Form.Group controlID="rsoPic">
                  <Form.Label>Upload event profile picture</Form.Label>
                  <Form.File
                    ref={(c) => (createEventObj.e_profilePicture = c)}
                    label=""
                  /> */}
                {/* <Form.Text>5MB maximum</Form.Text> */}
                {/* </Form.Group> */}
              </Form>
            </Modal.Body>
            {errorMessage != "" ? (
              <span id="errorMSG">
                <span style={{ color: "red" }}>Error : </span>
                {errorMessage}
              </span>
            ) : null}
            <Modal.Footer
              className="modalFooter"
              style={{ marginBottom: "1rem", marginRight: "1rem" }}
            >
              <Button variant="primary" type="submit" onClick={createEvent}>
                Create Event
              </Button>
              <Button
                variant="primary"
                type="submit"
                onClick={createEventClose}
              >
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default SngGroup;
