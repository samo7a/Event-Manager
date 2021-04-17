// TODO
// Find out why page refreshed when post comment is added
// Find out why message is displayed
// Find out why await throws an error in the try block
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
  const [message, setMessage] = useState("");

  // const [commentPost, setComment] = useState("empty");
  // Add comment field
  // useEffect(() => {
  //   setName(props.event.name);
  //   setRso(props.event.rso);
  //   setDesc(props.event.desc);
  //   setDate(props.event.date);
  //   setComment()
  // }, []);
  var newComment;
  // Comment debug
  const event = {
    id: 12,
    name: "Event Name",
    rso: "Rso Name",
    desc: "This is the description",
    date: " MM / DD / YYYY",
  };
  const comment = {
    commenter: "Jonathan Frucht",
    comment:
      "I make a comment I make a comment I make a comment I make a comment I make a comment I make a comment I make a comment I make a comment I make a comment I make a comment ",
    time: "11:45pm",
    date: "MM/DD/YYYY",
  };

  const postComment = (async) => {
    event.preventDefault();
    setMessage("");
    if (newComment.value.length == null) {
      setMessage("Please enter a comment");
      return;
    }
    if (newComment.value.length > 1000) {
      setMessage(
        "Length of comment exceeded: " + (newComment.value.length - 1000)
      );
      return;
    }
    // try {
    //   var newComment = {
    //     e_id : event.id,
    //     s_id : event.id,
    //     comment : newComment.value,
    //   };
    //   var js = JSON.stringify(newComment);
    //   const response = await fetch("/api/addComment", {
    //     method: "POST",
    //     credentials: "include",
    //     body: js,
    //     headers: { "Content-Type": "application/json" },
    //   });
    //   var res = JSON.parse(await response.text());
    //   if (response.status !== 200) {
    //     console.log(res.error);
    //   } else {
    //     console.log("Ahh");
    //   }
    // } catch (e) {
    //   console.log(e.toString());
    //   return;
    // }
  };

  return (
    <div>
      <Container>
        <Card className="eventCard">
          <Card.Title className="eventTitle">{event.name}</Card.Title>
          <Card.Subtitle className="eventRso">
            Hosted by {event.rso}
          </Card.Subtitle>
          <Card.Img style={{ padding: "1rem" }} src={pupFiller}></Card.Img>
          <Card.Body>
            <Row>
              <Col className="eventInfo">
                <Row>
                  <b>Date:{"\xa0"}</b>
                  {event.date}
                </Row>
                <Row>
                  <b>Description:{"\xa0"}</b>
                  {event.desc}
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
                    // marginLeft: "1rem",
                    marginTop: ".5rem",
                  }}
                >
                  Post a Comment
                </Form.Group>
                {message != "" ? (
                  <span id="errorMSG">
                    <span style={{ color: "red" }}>Error : </span>
                    {message}
                  </span>
                ) : null}
                <Form.Row className="makeCommentInput">
                  <Form.Control
                    as="textArea"
                    rows="3"
                    ref={(c) => (newComment = c)}
                  />
                </Form.Row>
                <Form.Row style={{ alignItems: "end" }}>
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={postComment}
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
