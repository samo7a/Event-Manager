import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import { Col, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import "./MyAccount.css";
function MyAccount() {
  const user = {
    fName: "Jon",
    lName: "Frucht",
    email: "Email@gmail.com",
    Uni: "University of Central Florida",
  };
  return (
    <div>
      <div style={{ padding: "0%", height: "100", backgroundColor: "red" }}>
        <Container
          // fluid
          style={{
            padding: "0",
            margin: 0,
            height: "100%",
            backgroundColor: "red",
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
                backgroundColor: "#aabbcc",
                height: "100vh",
                position: "absolute",
                // width: "100%",

                //   position: "absolute",
                //   left: "100%",
              }}
            >
              <div id="accountDiv" className="accountDiv">
                <div id="accountWrapper">
                  <h1 className="pageTitle">Account Information</h1>
                  <Card className="acctCard">
                    {/* Account info fields */}
                    <Form>
                      <Form.Group className="acctInfoField" as={Row}>
                        <Form.Label
                          className="text-left"
                          column
                          sm="3"
                          color="blue"
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
                            defaultValue={user.fName + " " + user.lName}
                          ></Form.Control>
                        </Col>
                      </Form.Group>
                      <Form.Group className="acctInfoField" as={Row}>
                        <Form.Label
                          className="text-left"
                          column
                          sm="3"
                          color="blue"
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
                            defaultValue={user.email}
                          ></Form.Control>
                        </Col>
                      </Form.Group>
                      <Form.Group className="acctInfoField" as={Row}>
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
                            defaultValue={user.Uni}
                          ></Form.Control>
                        </Col>
                      </Form.Group>
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
