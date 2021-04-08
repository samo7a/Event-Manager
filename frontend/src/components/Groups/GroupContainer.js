import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  Image,
  Jumbotron,
  Modal,
  Row,
  Card,
} from "react-bootstrap";
import "./GroupContainer.css";
import Group from "./Group";
import GroupThumbnail from "../../pictures/GroupThumbnail.jpg";

const GroupContainer = (props) => {
  const group = {
    name: "RSO Name",
    isActive: true,
    totalMembers: "11",
    totalAdmins: "5",
    // groupPic: GroupThumbnail,
  };
  const [showEvent, setShowEvent] = useState(false);
  const eventClose = () => setShowEvent(false);
  const eventOpen = () => setShowEvent(true);

  return (
    <Jumbotron style={{ backgroundColor: "red" }}>
      <Group group={group} />
    </Jumbotron>
  );
};

export default GroupContainer;
