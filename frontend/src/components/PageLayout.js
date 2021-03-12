import React from "react";
import Container from "react-bootstrap/esm/Container";
import { Col, Row } from "react-bootstrap";
import SideMenu from "./SideMenu";
import Search from "./Search";
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
          {/* <Col
            xs={"auto"}
            style={{
              position: "absolute",
              left: "0%",
              paddingLeft: "0 px",
              marginLeft: "0px",
              backgroundColor: "#44ddff",
            }}
          >
            <SideMenu />
          </Col> */}
          <Col
            // xs="auto"
            fluid
            style={{
              backgroundColor: "#aabbcc",
              height: "100vh",
              position: "absolute",

              //   position: "absolute",
              //   left: "100%",
            }}
          >
            Middle
          </Col>
          <Col
            xs={3}
            style={{
              position: "absolute",
              right: "0%",
              height: "100%",

              backgroundColor: "#aaaadd",
            }}
          >
            Right
            <Search type="groups" getResults={() => alert("Yo")} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PageLayout;
