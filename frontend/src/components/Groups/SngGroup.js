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
  // Modal fields
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
                <Row
                  style={{
                    height: "15rem",
                    marginRight: ".5rem",
                    overflowY: "auto",
                  }}
                >
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
                  {/* <Col>
                    <div>Total Members: {totalMembers} </div>
                  </Col> */}
                  {/* <Col>
                    <span style={{ marginLeft: "1.5rem" }}>
                      Total Admins: {totalAdmins}
                    </span>
                  </Col> */}
                </Row>
                <Row>
                  {/* <Col>
                    <Card.Link
                      onClick={handleMOpen}
                      style={{ cursor: "pointer" }}
                    >
                      View Members
                    </Card.Link>
                  </Col> */}
                  <Col>
                    {/* <span style={{ marginLeft: "1.5rem" }}>
                      <Card.Link
                        onClick={handleCIOpen}
                        style={{ cursor: "pointer" }}
                      >
                        View Admins
                      </Card.Link>
                    </span> */}
                  </Col>
                </Row>
              </Card.Text>
              {/* <Row style={{ marginLeft: 0 }}>
                <Card.Link>IF ADMIN Click here to view options</Card.Link>
              </Row> */}
            </Card>
          </Col>
        </Row>
        <Row>
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
              {totalMembers}{" "}
            </Row>
            <Row>
              <Card.Link onClick={handleMOpen} style={{ cursor: "pointer" }}>
                View Members
              </Card.Link>
            </Row>
          </Col>
          <Col xs="4">
            <Row>
              <div style={{ fontWeight: "bold" }}>Admin</div>: Jonathan Frucht{" "}
            </Row>
            <Row>
              <Card.Link onClick={handleCIOpen} style={{ cursor: "pointer" }}>
                Contact Info
              </Card.Link>
            </Row>
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
                  {/* <th className="tableCol">Email</th> */}
                </tr>
              </thread>
              <tbody>
                <tr>
                  <td className="tableNumCol">1</td>
                  <td className="tableCol">
                    <Image
                      src={GroupThumbnail}
                      roundedCircle
                      className="groupThumbnailImage"
                      style={{ maxWidth: "2rem" }}
                    />
                    Jonathan Frucht
                  </td>
                  {/* <td className="tableCol">Email@Email.com</td> */}
                </tr>
              </tbody>
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
            <Row className="row justify-content-center">Jonathan Frucht</Row>
            <Row className="row justify-content-center">Email@Email.com</Row>
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
          <Modal.Header>
            <Modal.Title>Edit RSO Page</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form style={{ width: "100%" }}>
              <Row className="center" style={{ textAlign: "center" }}>
                <Col sm="4">Confirm Edit(s)</Col>
              </Row>
              <Row>
                <Col sm="4" className="">
                  <Form.Check
                    type="checkbox"
                    className="editCol"
                    label="Edit Name"
                  />
                </Col>
                <Col sm="8">
                  <Form.Group style={{ marginLeft: "0rem", textAlign: "none" }}>
                    <Form.Label>
                      RSO Name
                      <Form.Control
                        style={{ marginRight: "1rem", width: "130%" }}
                        type="text"
                        // rows="10"
                      />
                      <Form.Text>XXX character maximum</Form.Text>
                    </Form.Label>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col sm="4" className="">
                  <Form.Check
                    type="checkbox"
                    className="editCol"
                    label="Edit Description"
                  />
                </Col>
                <Col sm="8">
                  <Form.Group style={{ marginLeft: "0rem", textAlign: "none" }}>
                    <Form.Label>
                      RSO description
                      <Form.Control
                        style={{ marginRight: "1rem", width: "140%" }}
                        as="textarea"
                        rows="5"
                      />
                      <Form.Text>256 character maximum</Form.Text>
                    </Form.Label>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="centerText">
                <h5 style={{ marginLeft: "1rem" }}> Contatct Information</h5>
              </Row>
              <Row>
                <Col sm="4" className="">
                  <Form.Check
                    type="checkbox"
                    className="editCol"
                    label="Edit Name"
                  />
                </Col>
                <Col sm="8">
                  <Form.Group style={{ marginLeft: "0rem", textAlign: "none" }}>
                    <Form.Label>
                      Name
                      <Form.Control
                        style={{ marginRight: "1rem", width: "140%" }}
                        type="text"
                      />
                    </Form.Label>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col sm="4" className="">
                  <Form.Check
                    type="checkbox"
                    className="editCol"
                    label="Edit Email"
                  />
                </Col>
                <Col sm="8">
                  <Form.Group style={{ marginLeft: "0rem", textAlign: "none" }}>
                    <Form.Label>
                      Email
                      <Form.Control
                        style={{ marginRight: "1rem", width: "140%" }}
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
            <Button variant="primary" type="submit">
              Make changes
            </Button>
            <Button variant="primary" type="submit" onClick={handleEditClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default SngGroup;
