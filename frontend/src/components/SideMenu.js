import React from "react";
import "./SideMenu.css";
import Sidebar from "react-sidebar";
import Nav from "react-bootstrap/Nav";
import Col from "react-bootstrap/Col";

const SideMenu = () => {
  return (
    <Col style={{ paddingRight: 0 }}>
      <Nav defaultActiveKey="/Home" className="flex-column">
        <Nav.Link href="/Home" className="my-nav-link">
          Home
        </Nav.Link>
        <Nav.Link className="my-nav-link">My Events</Nav.Link>
        <Nav.Link className="my-nav-link">My Groups</Nav.Link>
        <Nav.Link href="/my-account" className="my-nav-link">
          My Account
        </Nav.Link>
        <Nav.Link className="my-nav-link">My Profile</Nav.Link>
      </Nav>
    </Col>
  );
};

export default SideMenu;
