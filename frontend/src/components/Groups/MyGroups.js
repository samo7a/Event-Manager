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
      admin: {},
      rso: {},
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
  const [newRsoName, setNewRsoName] = useState("");
  const [newRsoDesc, setNewRsoDesc] = useState("");
  const [newRsoDescLen, setNewRsoDescLen] = useState(1000);

  const updateNewRsoName = (e) => {
    setNewRsoName(e.target.value);
  };

  const updateNewRsoDesc = (e) => {
    let length = newRsoDesc.length + 1;
    if (length > 1000) {
      return;
    }
    setNewRsoDesc(e.target.value);
    setNewRsoDescLen(1000 - length);
  };
  // New Rso fields
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
        console.log(res);
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
    if (newRsoName.length > 45) {
      console.error("nameErr");
      setMessage("The RSO name is over the maximum limit");
      return;
    }
    if (newRsoDesc.length > 1000) {
      console.error("Size to big");
      setMessage(
        "Description is " + (newRsoDesc.length - 1000) + "over the max"
      );
      return;
    }

    try {
      let obj = {
        rso_name: newRsoName,
        rso_description: newRsoDesc,
        rso_profilePicture: null,
        s_id: s_id,
      };
      let js = JSON.stringify(obj);
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
        setNewRsoDesc("");
        setNewRsoName("");
        setNewRsoDescLen(1000);
        setCreateShow(false);
      }
    } catch (e) {
      console.log(e.toString());
      return;
    }
  };

  const generateAdminGroups =
    adminGroups.length == 0 || !adminGroups[0].rso.rso_name ? (
      <div>
        <span>You are not an admin of any groups yet</span>
      </div>
    ) : (
      adminGroups.map((e) => {
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
  const generateAllGroups =
    allGroups.length < 0 ? (
      <span>No groups found</span>
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
    joinedGroups.length < 0 ? (
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
    <Container style={{ backgroundColor: "rgba(255,255,255,.6)" }}>
      <h1 style={{ marginLeft: "-1rem" }}> RSOs </h1>

      <Row>
        <Col xs="9" style={{ padding: 0 }}>
          {/* <h3> Admin of these RSOs </h3> */}
        </Col>
        <Col xs="3">
          <Button variant="primary" onClick={createRSOOpen}>
            Create RSO
          </Button>
        </Col>
        <Container style={{}}>
          {/* ADMIN OF THESE GROUPS */}
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
        <Container>{generateJoinedGroups}</Container>
      </Row>
      <Row>
        <h3>All RSOs at your university</h3>
        <Container>{generateAllGroups}</Container>
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
                  <input value={newRsoName} onChange={updateNewRsoName} />
                  <Form.Text>45 characters maximum</Form.Text>
                </Form.Group>
                <Form.Group controlID="rsoName">
                  <Form.Label>Enter RSO description</Form.Label>{" "}
                  <textarea
                    value={newRsoDesc}
                    onChange={updateNewRsoDesc}
                    style={{ marginRight: "1rem", width: "100%" }}
                    rows="7"
                  />
                  <Form.Text>{newRsoDescLen}</Form.Text>
                  <Form.Text>
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
