import React from "react";
import Container from "react-bootstrap/esm/Container";
import { Col, Row } from "react-bootstrap";
import SideMenu from "./SideMenu";
import Search from "./Search";
import EventContainer from "./Events/EventContainer";
import "./PageLayout.css";
import MyGroupPage from "./Groups/MyGroups";
import SingleGroup from "./Groups/SngGroup";
const PageLayout = (props) => {
  const pageChoice = props.page;
  return (
    <div style={{ padding: "0%" }}>
      <Container className="pageContainer" fluid>
        <Row className="pageRow">
          {(() => {
            switch (pageChoice) {
              case "events":
                return <EventContainer />;
              case "mygroups":
                return <MyGroupPage />;
              case "singleGroup":
                return <SingleGroup />;
              default:
                break;
            }
          })()}
        </Row>
      </Container>
    </div>
  );
};

export default PageLayout;
