import React from "react";
import Container from "react-bootstrap/esm/Container";
import { Col, Row } from "react-bootstrap";
import SideMenu from "./SideMenu";
import Search from "./Search";
import EventList from "./EventContainer";
const PageLayout = () => {
  return (
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
              width: "100%",

              //   position: "absolute",
              //   left: "100%",
            }}
          >
            Middle
            <EventList />
          </Col>
          <Col
            xs={3}
            style={{
              position: "absolute",
              right: "0%",
              // height: "100%",

              backgroundColor: "#aaaadd",
              padding: "1rem",
            }}
          >
            <Search type="groups" getResults={() => alert("Yo")} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PageLayout;
