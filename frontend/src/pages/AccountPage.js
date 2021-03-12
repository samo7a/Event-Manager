import React from "react";
import { Col, Row } from "react-bootstrap";
import Container from "react-bootstrap/esm/Container";

import MyAccount from "../components/Account/MyAccount";
import Banner from "../components/Banner";
import SideMenu from "../components/SideMenu";

const AccountPage = () => {
  return (
    <div
      className=" "
      style={{ height: "100vh", backgroundColor: "green", overflow: "hidden" }}
    >
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
            sm={11}
            style={{
              // paddingLeft: "110px",
              // minWidth: "88%",
              // right: "0%",
              padding: "0px",
              //   height: "100%",

              //   backgroundColor: "rgb(136, 136, 136)",
            }}
          >
            <MyAccount />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AccountPage;
