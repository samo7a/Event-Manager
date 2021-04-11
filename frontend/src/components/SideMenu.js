import React from "react";
import "./SideMenu.css";
import Nav from "react-bootstrap/Nav";
import Col from "react-bootstrap/Col";

const SideMenu = (props) => {
  const renderMenu = (
    <div>
      {props.type ? (
        <Col style={{ padding: 0 }}>
          <Nav defaultActiveKey="/dashboard" className="flex-column">
            <Nav.Link href="/dashboard" className="my-nav-link">
              Home
            </Nav.Link>
            <Nav.Link className="my-nav-link">Events</Nav.Link>
            <Nav.Link className="my-nav-link">Groups</Nav.Link>
            <Nav.Link href="/my-account" className="my-nav-link">
              Account
            </Nav.Link>
            <Nav.Link href="/admin-profile" className="my-nav-link">
              Profile
            </Nav.Link>
          </Nav>
        </Col>
      ) : (
        <Col style={{ padding: 0 }}>
          <Nav defaultActiveKey="/Home" className="flex-column">
            <Nav.Link href="/Home" className="my-nav-link">
              Home
            </Nav.Link>
            <Nav.Link href="/events" className="my-nav-link">
              Events
            </Nav.Link>
            <Nav.Link href="/my-groups" className="my-nav-link">
              My Groups
            </Nav.Link>
            <Nav.Link href="/my-account" className="my-nav-link">
              My Account
            </Nav.Link>
            {/* <Nav.Link className="my-nav-link">My Profile</Nav.Link> */}
          </Nav>
        </Col>
      )}
    </div>
  );

  return <div>{renderMenu}</div>;
};

export default SideMenu;
