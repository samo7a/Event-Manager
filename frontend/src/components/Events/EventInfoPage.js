import React, { useState, useEffect } from "react";
import { Card, Container, Button, Col, Row, Form } from "react-bootstrap";
import pupFiller from "../../pictures/pupFiller.jpeg";
import "./EventInfoPage.css";
const EventInfoPage = (props) => {
  // Event fields
  const [eventName, setName] = useState("");
  const [eventRso, setRso] = useState("");
  const [eventDesc, setDesc] = useState("S");
  const [eventDate, setDate] = useState("MM/DD/YYYY");
  const [eventRating, setRating] = useState(0);
  // Add comment field
  // useEffect(() => {
  //   setName(props.event.name);
  //   setRso(props.event.rso);
  //   setDesc(props.event.desc);
  //   setDate(props.event.date);
  // }, []);
  // Comment debug
  const comment = {
    commenter: "Jonathan Frucht",
    comment:
      "I make a comment I make a comment I make a comment I make a comment I make a comment I make a comment I make a comment I make a comment I make a comment I make a comment ",
    time: "11:45pm",
    date: "MM/DD/YYYY",
  };

  return (
    <div>
      <Container>
        <Card>
          <Card.Title>
            <h1>EVENT NAME</h1>
          </Card.Title>
          <Card.Subtitle>
            <h3>RSO NAME</h3>
          </Card.Subtitle>
          <Card.Img src={pupFiller}></Card.Img>
          <Card.Body>
            <Row style={{ margin: ".5rem" }}>
              <Col>
                <Row>
                  <b>Event Name:{"\xa0"}</b>
                  {/* {eventName} */}
                </Row>
                <Row>
                  <b>Hosted by:{"\xa0"}</b>
                  {/* {eventRso} */}
                </Row>
                <Row>
                  <b>Date:{"\xa0"}</b>
                  {/* {eventDate} */}
                </Row>
                <Row>
                  <b>Description:{"\xa0"}</b>
                  {/* {eventDesc} */}
                </Row>
              </Col>
            </Row>
          </Card.Body>
          <Card.Footer>
            <h3 style={{ textDecoration: "underline" }}>Comments</h3>
            <Card className="cardComment" style={{ marginBottom: "1rem" }}>
              <Form>
                <Form.Group
                  style={{
                    fontSize: "1.3rem",
                    marginLeft: "1rem",
                    marginTop: ".5rem",
                  }}
                >
                  Post a Comment
                </Form.Group>
                <Form.Row className="makeCommentInput">
                  <Form.Control as="textArea" rows="3" />
                </Form.Row>
                <Form.Row style={{ alignItems: "end" }}>
                  <Button
                    variant="primary"
                    type="submit"
                    style={{ marginLeft: "70%", marginBottom: "1rem" }}
                  >
                    Post comment
                  </Button>
                </Form.Row>
              </Form>
            </Card>
            <Card className="cardComment">
              <Card.Title className="cardCommentTitle">
                {comment.commenter}
              </Card.Title>
              <Card.Body className="cardCommentBody">
                {comment.comment}
              </Card.Body>
              <Card.Footer className="cardCommentFooter">
                Posted at {comment.time} on {comment.date}
              </Card.Footer>
            </Card>
          </Card.Footer>
        </Card>
      </Container>
    </div>
  );
};
export default EventInfoPage;
