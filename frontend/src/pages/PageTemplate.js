//
// THIS IS THE TEMPLATE FOR PAGES
// USED BY MyGroupPage, EventPage
//

import React from "react";
import PageLayout from "../components/PageLayout";
import Banner from "../components/Banner";
import Container from "react-bootstrap/esm/Container";
import { Col, Row } from "react-bootstrap";
import SideMenu from "../components/SideMenu";
import "./PageTemplate.css";
const PageTemplate = (props) => {
  return (
    <div
      className=" "
      // style={{ height: "100vh", backgroundColor: "green", overflow: "hidden" }}
    >
      <Banner />
      <Container fluid>
        <Row>
          <Col sm={1} fluid className="leftCol">
            <div>
              <SideMenu />
            </div>
          </Col>
          <Col sm={11} className="middleCol">
            {console.log("What is props?")}
            {console.log(props.page)}
            <PageLayout page={props.page} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PageTemplate;
