import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import { Col, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import "./MyAccount.css";
function MyAccount() {
  // const user = {
  //   fName: "Jon",
  //   lName: "Frucht",
  //   email: "Email@gmail.com",
  //   Uni: "University of Central Florida",
  // };
  var user = JSON.parse(localStorage.getItem("user_data"));
  const fName = user ? JSON.parse(user).firstName : "F";
  const lName = user ? JSON.parse(user).lastName : "L";
  const email = user ? JSON.parse(user).email : "E";
  // const uni =
  return (
    <div>
      <div style={{ padding: "0%", height: "100" }}>
        <Container
          // fluid
          style={{
            padding: "0",
            margin: 0,
            height: "100%",
            // backgroundColor: "red",
          }}
        >
          <Row
            style={{
              paddingLeft: "0 px",
              margin: "0px",
              height: "100%",
            }}
          >
            <Col
              // xs="auto"
              name="middle"
              fluid
              style={{
                // backgroundColor: "#aabbcc",
                height: "100vh",
                position: "absolute",
                // width: "100%",

                //   position: "absolute",
                //   left: "100%",
              }}
            >
              <div id="accountDiv" className="accountDiv">
                <div id="accountWrapper">
                  <Card className="acctCard">
                    <h1 className="pageTitle">Account Information</h1>
                    {/* Account info fields */}
                    <Form>
                      <Form.Group className="acctInfoField" as={Row}>
                        <Form.Label
                          className="text-left"
                          column
                          sm="3"
                          // color="blue"
                          // sm="5"
                        >
                          <b> Name </b>
                        </Form.Label>
                        <Col sm="9">
                          <Form.Control
                            className="text-right"
                            style={{ fontSize: "1.5rem" }}
                            plaintext
                            readOnly
                            defaultValue={fName + " " + lName}
                          ></Form.Control>
                        </Col>
                      </Form.Group>
                      <Form.Group className="acctInfoField" as={Row}>
                        <Form.Label
                          className="text-left"
                          column
                          sm="3"
                          // color="blue"
                          // sm="5"
                        >
                          <b> Email </b>
                        </Form.Label>
                        <Col sm="9">
                          <Form.Control
                            className="text-right"
                            style={{ fontSize: "1.5rem" }}
                            plaintext
                            readOnly
                            defaultValue={email}
                          ></Form.Control>
                        </Col>
                      </Form.Group>
                      {/* <Form.Group className="acctInfoField" as={Row}>
                        <Form.Label
                          className="text-left"
                          column
                          sm="3"
                          color="blue"
                          // sm="5"
                        >
                          <b>University </b>
                        </Form.Label>
                        <Col sm="9">
                          <Form.Control
                            className="text-right"
                            style={{ fontSize: "1.5rem" }}
                            plaintext
                            readOnly
                            // defaultValue={Uni}
                          ></Form.Control>
                        </Col>
                      </Form.Group> */}
                    </Form>
                  </Card>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
export default MyAccount;
