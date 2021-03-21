import React from "react";
import PageLayout from "../components/PageLayout";
import Banner from "../components/Banner";
import Container from "react-bootstrap/esm/Container";
import { Col, Row } from "react-bootstrap";
import SideMenu from "../components/SideMenu";
import "./PageTemplate.css";
const EventPage = () => {
  const props = [{ page: "events" }];
  return (
    <div>
      <Banner />
      <Container fluid>
        <Row>
          <Col sm={1} fluid className="leftCol">
            <div>
              <SideMenu />
            </div>
          </Col>
          <Col sm={11} className="middleCol">
            <PageLayout page={props} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default EventPage;
