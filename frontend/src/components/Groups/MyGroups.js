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
import Group from "./Group";
// import "./GroupContainer.css";
import GroupContainer from "./GroupContainer";
// import pupFiller from "../pictures/pupFiller.jpeg";

const MyGroups = (props) => {
  let check = localStorage.getItem("user_data");
  const user = check ? JSON.parse(check) : null;
  const s_id = user ? user.id : 0;
  const group = {
    name: "Group Name",
    rso: "rso name",
    desc: "THis is the description area",
    date: "MM/DD/YYYY",
  };
  // Local data

  // create rso
  const [createShow, setCreateShow] = useState(false);
  const createRSOClose = () => setCreateShow(false);
  const createRSOOpen = () => setCreateShow(true);
  // MSG
  const [message, setMessage] = useState("");
  // getJoinedGroups
  const [joinedGroups, setJoinedGroups] = useState([
    {
      rso_id: 0,
      rso_name: "",
      status: "",
      rso_description: "",
    },
  ]);
  const [adminGroups, setAdminGroups] = useState([
    {
      rso_id: 0,
      rso_name: "",
      status: "",
      rso_description: "",
    },
  ]);
  const [allGroups, setAllGroups] = useState([
    {
      rso: {
        rso_id: 0,
        rso_name: "",
        status: "",
        rso_description: "",
      },
      admin: {
        s_id: 0,
        s_firstName: "",
        s_lastName: "",
      },
    },
  ]);
  // New Rso fields
  var newRsoName;
  var newRsoDesc;
  var newRsoPic;
  const getAllGroups = async () => {
    console.log(s_id);
    console.log(user);
    let js = JSON.stringify({ s_id: s_id });
    try {
      const response = await fetch("/api/getAllRsosStudent", {
        method: "POST",
        // credentials: "include",
        body: js,
        headers: { "Content-Type": "application/json" },
      });
      console.log(js);
      var res = JSON.parse(await response.text());
      if (response.status !== 200) {
        // console.log(response.status);
        throw new Error(response.status);
      } else {
        console.log("GetAllGroups success");
        setAllGroups(res);
      }
    } catch (e) {
      console.log(e.toString());
      return;
    }
  };
  const getJoinedGroups = async () => {
    console.log(s_id);
    console.log(user);
    let js = JSON.stringify({ s_id: s_id });
    try {
      const response = await fetch("/api/getJoinedGroups", {
        method: "POST",
        // credentials: "include",
        body: js,
        headers: { "Content-Type": "application/json" },
      });
      console.log(js);
      var res = JSON.parse(await response.text());
      if (response.status !== 200) {
        // console.log(response.status);
        throw new Error(response.status);
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
  const getAllAdminGroups = async () => {
    console.log(s_id);
    console.log(user);
    let js = JSON.stringify({ s_id: s_id });
    try {
      const response = await fetch("/api/getAllMyRsosStudent", {
        method: "POST",
        // credentials: "include",
        body: js,
        headers: { "Content-Type": "application/json" },
      });
      console.log(js);
      var res = JSON.parse(await response.text());
      if (response.status !== 200) {
        // console.log(response.status);
        throw new Error(response.status);
      } else {
        console.log("GetADMIN GROUPS success");
        setAdminGroups(res);
        console.log(joinedGroups);
      }
    } catch (e) {
      console.log(e.toString());
      return;
    }
  };

  useEffect(() => {
    // setUserID();
    getJoinedGroups();
    getAllGroups(); //generateAllMyEvents
    getAllAdminGroups();
  }, []);

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
        s_id: s_id,
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
  // const generateAdminGroups =
  //   joinedGroups.length == 0 ? (
  //     <span>Not apart of any groups</span>
  //   ) : (
  //     joinedGroups.map((e) => {
  //       console.log(e.rso_id);
  //       return e.admin.s_id === s_id ? <Group rso_id={e.rso_id} /> : null;
  //     })
  //   );
  const generateAdminGroups =
    adminGroups.length == 0 ? (
      <span>Not apart of any groups</span>
    ) : (
      adminGroups.map((e) => {
        console.log(e.rso_id);
        return e.rso_id != "0" ? (
          <div style={{ marginTop: ".5rem", marginBottom: ".5rem" }}>
            <Group
              rso_id={e.rso_id}
              style={{ marginTop: ".5rem", marginBottom: ".5rem" }}
            />
          </div>
        ) : null;
      })
    );
  const generateAllGroups =
    allGroups.length == 0 ? (
      <span>Not apart of any groups</span>
    ) : (
      allGroups.map((e) => {
        console.log(e.rso.rso_id);
        return e.rso.rso_id != "0" ? (
          <div style={{ marginTop: ".5rem", marginBottom: ".5rem" }}>
            <Group
              rso_id={e.rso.rso_id}
              style={{ marginTop: ".5rem", marginBottom: ".5rem" }}
            />
          </div>
        ) : null;
      })
    );
  const generateJoinedGroups =
    joinedGroups.length == 0 ? (
      <span>Not apart of any groups</span>
    ) : (
      joinedGroups.map((e) => {
        console.log(e.rso_id);
        return e.rso_id != "0" ? (
          <div style={{ marginTop: ".5rem", marginBottom: ".5rem" }}>
            <Group
              rso_id={e.rso_id}
              style={{ marginTop: ".5rem", marginBottom: ".5rem" }}
            />
          </div>
        ) : null;
      })
    );

  return (
    <Container style={{ backgroundColor: "rgba(255,255,255,.3)" }}>
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
        <Container style={{}}>
          ADMIN OF THESE GROUPS
          {generateAdminGroups}{" "}
          {window.location.href == "http://localhost:3000/my-groups" ? (
            <div>
              <div style={{ marginTop: ".5rem", marginBottom: ".5rem" }}>
                <Group />
              </div>
              <div style={{ marginTop: ".5rem", marginBottom: ".5rem" }}>
                <Group />
              </div>
            </div>
          ) : null}
        </Container>
      </Row>
      <Row>
        <h3>Member of these RSOs</h3>
        <Container style={{ backgroundColor: "red" }}>
          {generateJoinedGroups}
        </Container>
      </Row>
      <Row>
        <h3>All RSOs at your university</h3>
        <Container style={{ backgroundColor: "red" }}>
          {generateAllGroups}
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
