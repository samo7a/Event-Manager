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
  // Modal fields
  // member/admin list modals
  const [showMem, setMemShow] = useState(false);
  const [showAdm, setAdmShow] = useState(false);
  const handleMClose = () => setMemShow(false);
  const handleMOpen = () => setMemShow(true);
  const handleAdmClose = () => setAdmShow(false);
  const handleAdmOpen = () => setAdmShow(true);
  // edit modal
  const [showEdit, setEditShow] = useState(false);
  const handleEditClose = () => setEditShow(false);
  const handleEditOpen = () => setEditShow(true);
  // Group fields
  const rsoName = "Florida Outdoor Adventure Club";
  const isActive = true;
  //   const [eventDesc, setDesc] = useState("S");
  const totalMembers = 19;
  const totalAdmins = 5;
  //   const [groupTN, setThumbnail] = useState("");

  // const viewModal = () => (
  //   <div>
  //     <Modal show={show} onHide={handleClose}>
  //       <Modal.Header>
  //         <Modal.Title>{viewType} List</Modal.Title>
  //       </Modal.Header>
  //       <Modal.Body>
  //         <Row>
  //           <Col>{viewType}</Col>
  //           <Col>Email</Col>
  //         </Row>
  //       </Modal.Body>
  //     </Modal>
  //   </div>
  // );

  return (
    <div>
      <Card className="rsoCard">
        <Row id="cardRow" style={{ padding: 0, width: "auto" }}>
          <Col id="thumbnailIMG" xs="5">
            <Card.Img className="thumbnailImage" src={GroupThumbnail} />
            <Card.Link
              onClick={handleEditOpen}
              style={{
                marginLeft: "25%",
                marginRight: "25%",
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              Click here to edit page
            </Card.Link>
          </Col>
          <Col xs="7" id="cardInfo" style={{ marginTop: "1rem" }}>
            <Card className="rsoCard2">
              <Card.Title center className="rsoTitle">
                <h4>{rsoName}</h4>
              </Card.Title>
              <Row style={{ marginLeft: "0" }}>
                <Card.Subtitle
                  style={{ marginLeft: ".0rem", marginTop: "-1.5rem" }}
                >
                  This group is{" "}
                  {isActive ? (
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
                <Row style={{ height: "15rem", marginRight: ".5rem" }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
                  tincidunt, et lobortis eleifend, mauris urna molestie sem, et
                  tincidunt mauris arcu non diam. Proin sit amet urna neque. In
                  velit dolor, eleifend ac auctor et, vehicula ac orci.
                  Vestibulum sodales, ex in condimentum gravida, est metus
                  dignissim enim, id tristique enim nulla et neque. Aenean
                  vulputate aliquam imperdiet. Suspendisse auctor mauris at
                  tristique ultrices. Donec ultricies accumsan mauris, ut
                  commodo elit. Fusce blandit velit in nisi elementum semper.
                </Row>
                <Row>
                  <Col>
                    <div>Total Members: {totalMembers} </div>
                  </Col>
                  <Col>
                    <span style={{ marginLeft: "1.5rem" }}>
                      Total Admins: {totalAdmins}
                    </span>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Card.Link
                      onClick={handleMOpen}
                      style={{ cursor: "pointer" }}
                    >
                      View Admins
                    </Card.Link>
                  </Col>
                  <Col>
                    <span style={{ marginLeft: "1.5rem" }}>
                      <Card.Link
                        onClick={handleAdmOpen}
                        style={{ cursor: "pointer" }}
                      >
                        View Admins
                      </Card.Link>
                    </span>
                  </Col>
                </Row>
              </Card.Text>
              {/* <Row style={{ marginLeft: 0 }}>
                <Card.Link>IF ADMIN Click here to view options</Card.Link>
              </Row> */}
            </Card>
          </Col>
        </Row>

        <Card style={{ margin: "1rem" }}>
          <Card.Title className="upComingETitle">
            <div className="upComingETitle">Upcoming Events</div>
          </Card.Title>
          <Card.Body>{/* <EventContainer /> */}</Card.Body>
        </Card>
      </Card>
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
                  <th className="tableCol">Email</th>
                </tr>
              </thread>
              <tbody>
                <tr>
                  <td className="tableNumCol">1</td>
                  <td className="tableCol">Jonathan frucht</td>
                  <td className="tableCol">Email@Email.com</td>
                </tr>
              </tbody>
            </Table>
            <Modal.Footer className="modalFooter">
              <Button onClick={handleMClose}>Close</Button>
            </Modal.Footer>
          </Modal.Body>
        </Modal>
      </div>
      {/* ADMIN LIST MODAL */}
      <div>
        <Modal show={showAdm} onHide={handleAdmClose}>
          <Modal.Header>
            <Modal.Title>Admin List</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table striped bordered hover style={{ display: "block" }}>
              <thread>
                <tr>
                  <th className="tableNumCol">#</th>
                  <th className="tableCol">Admin</th>
                  <th className="tableCol">Email</th>
                </tr>
              </thread>
              <tbody>
                <tr>
                  <td className="tableNumCol">1</td>
                  <td className="tableCol">Jonathan frucht</td>
                  <td className="tableCol">Email@Email.com</td>
                </tr>
              </tbody>
            </Table>
            <Modal.Footer className="modalFooter">
              <Button onClick={handleAdmClose}>Close</Button>
            </Modal.Footer>
          </Modal.Body>
        </Modal>
      </div>
      {/* Edit page Modal */}
      <div>
        <Modal show={showEdit} onHide={handleEditClose}>
          <Modal.Header>
            <Modal.Title>Edit Page</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row className="editCol">
                <Col sm="3">Edit field?</Col>
                <Col sm="9" className="editCol">
                  <Form.Group id="editDesc">
                    <Form.Label>
                      Edit RSO description
                      <Form.Control style={{ width: "100%" }} as="textarea" />
                      <Form.Text>256 character maximum</Form.Text>
                    </Form.Label>
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer className="modalFooter"></Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default SngGroup;
