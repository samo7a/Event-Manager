import React from "react";
import "./SideMenu.css";
import Nav from "react-bootstrap/Nav";
import Col from "react-bootstrap/Col";
import NavDropdown from "react-bootstrap/NavDropdown";

const SideMenu = (props) => {
  // const handleSelect = (eventKey) => alert(`selected ${eventKey}`);
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
            <Nav.Link href="/my-events" className="my-nav-link">
              Events
            </Nav.Link>
            <Nav.Link href="/my-groups" className="my-nav-link">
              RSOs
            </Nav.Link>
            <Nav.Link href="/my-account" className="my-nav-link">
              My Account
            </Nav.Link>
          </Nav>
        </Col>
      )}
    </div>
  );

  return <div>{renderMenu}</div>;
};

export default SideMenu;
