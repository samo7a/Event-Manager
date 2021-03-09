import React from "react";
import PageLayout from "../components/PageLayout";
import Banner from "../components/Banner";
import Container from "react-bootstrap/esm/Container";
import { Col, Row } from "react-bootstrap";
import SideMenu from "../components/SideMenu";

const PageTemplate = () => {
  return (
    <div
      className=" "
      style={{ height: "100vh", backgroundColor: "green", overflow: "hidden" }}
    >
      {/* the div wrapper will place the side bar with other elements  */}
      <Banner />
      <Container
        fluid
        style={{
          padding: "0px",
          margin: "0",
          height: "100%",
          backgroundColor: "yellow",
        }}
      >
        <Row>
          <Col
            //   class="col-2"
            sm={1}
            fluid
            style={{
              padding: "0px",
              margin: "0 px",
              backgroundColor: "blue",
            }}
          >
            <div>
              <SideMenu />
            </div>
          </Col>
          <Col
            //   class="col-10"
            sm={11}
            //   sm="auto"
            //   fluid
            style={{
              // paddingLeft: "110px",
              // minWidth: "88%",
              // right: "0%",
              padding: "0px",
              //   height: "100%",

              //   backgroundColor: "rgb(136, 136, 136)",
            }}
          >
            <PageLayout />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PageTemplate;
