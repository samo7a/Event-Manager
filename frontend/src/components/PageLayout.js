import React from "react";
import Container from "react-bootstrap/esm/Container";
import { Col, Row } from "react-bootstrap";
import SideMenu from "./SideMenu";
import Search from "./Search";
import EventContainer from "./EventContainer";
import "./PageLayout.css";
const PageLayout = (props) => {
  // const pageChoice = props.page;
  const pageChoice = "events";
  const choosePage = () => {
    switch (pageChoice) {
      case "events":
        return <EventContainer />;
        break;

      default:
        break;
    }
  };

  return (
    <div style={{ padding: "0%" }}>
      <Container
        className="pageContainer"
        fluid
        // style={{
        //   padding: "0",
        //   margin: 0,
        //   height: "100%",
        //   backgroundColor: "red",
        // }}
      >
        <Row
          className="pageRow"
          // style={{
          //   paddingLeft: "0 px",
          //   margin: "0 px",
          //   height: "100vh",
          //   width: "100%",
          // }}
        >
          {/* <Col
            // xs="auto"
            name="centerCol"
            // fluid
            style={{
              backgroundColor: "#aabbcc",
              height: "100vh",
              // position: "absolute",
              // width: "100%",

              //   position: "absolute",
              //   left: "100%",
            }}
          > */}

          {/* <EventContainer /> */}
          {choosePage()}
          {/* </Col> */}
          {/* <Col
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
          </Col> */}
        </Row>
      </Container>
    </div>
  );
};

export default PageLayout;
