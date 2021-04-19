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
  const userDEBUG = {
    id: 12,
    firstName: "Jon",
    lastName: "Frucht",
  };
  var user = JSON.parse(localStorage.getItem("user_data"));
  const s_id = user ? user.id : 0;
  const fName = user ? user.firstName : "F";
  const lName = user ? user.lastName : "L";

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
  const [eventID, setEventID] = useState("");
  const [eventDetails, setDetails] = useState({});
  const [eventComments, setEventComments] = useState([]);

  const getEventSingle = async () => {
    const theComments = [];
    const theAuthors = [];
    const getAuthors = async id => {
      try {
        let obj = { s_id: id};
        let js = JSON.stringify(obj);
        let response = await fetch("/api/getStudent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: js,
        });
        var res1 = JSON.parse(await response.text());
        if (response.status != 200) {
          throw new Error(response.status);
        } else {
          return res1.name;
        }
      } catch (error) {
        console.error("Error:", error);
        return "";
      }
    };
    try {
      let obj = { e_id: 20 };
      let js = JSON.stringify(obj);
      let response = await fetch("/api/getEventStudent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: js,
      });
      var res = JSON.parse(await response.text());
      if (response.status !== 200) {
        throw new Error(response.status);
      } else {
        res.comments.forEach(comment => {
          theAuthors.push(getAuthors(comment.s_id));
        })
        let authors = await Promise.all(theAuthors);

        if (authors.length !== res.comments.length) {
          throw new Error("There was a comment/author mismatch");
        } else {
          for (let k = 0; k < authors.length; k++) {
            theComments.push(
              {
                comment: res.comments[k],
                author: authors[k],
              }
            );
          }
          if (theComments.length > 0) {
            setEventComments(theComments);
          } 
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    // setEventID(props.eID);
    console.log("Hello");
    console.log(props.eID);
    getEventSingle();
  }, []);

  const postComment = async (event) => {
    event.preventDefault();
    setMessage("");
    if (newComment == null) {
      setMessage(" Can not post empty comment.");
      return;
    }

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

    try {
      var newCommentObj = {
        e_id: 20,
        s_id: s_id,
        fName: fName,
        comment: newComment.value,
      };
      console.log(newCommentObj);
      var js = JSON.stringify(newCommentObj);
      const response = await fetch("/api/addComment", {
        method: "POST",
        body: js,
        headers: { "Content-Type": "application/json" },
      });
      var res = JSON.parse(await response.text());
      if (response.status !== 200) {
        console.log(res.error);
      } else {
        console.log("Ahh");
        console.log(res);
      }
    } catch (e) {
      console.log(e.toString());
      return;
    }
  };

  const renderComments =
    eventComments.length == 0 ? (
      <span>No comments yet, be the first!</span>
    ) : (
      <div>
        {eventComments.map((c) => {
          return (
            <Card className="cardComment">
              <Card.Title className="cardCommentTitle">{c.author}</Card.Title>
              <Card.Body className="cardCommentBody">
                {c.comment.comment}
              </Card.Body>
              <Card.Footer className="cardCommentFooter">
                Posted a long time ago in a galaxy far, far away
              </Card.Footer>
            </Card>
          );
        })}
      </div>
    );

  const formatDate = (param) => {
    if (param != null) {
      let returnVar = "";
      returnVar +=
        param.substring(8, 10) +
        "/" +
        param.substring(5, 7) +
        "/" +
        param.substring(0, 4);
      return returnVar;
    } else return "No date";
  };

  return (
    <div>
      <Container>
        <Card className="eventCard">
          <Card.Title className="eventTitle">{eventDetails.e_name}</Card.Title>
          <Card.Img style={{ padding: "1rem" }} src={pupFiller}></Card.Img>
          <Card.Body>
            <Row>
              <Col className="eventInfo">
                <Row>
                  <b>Date:{"\xa0"}</b>
                  {formatDate(eventDetails.e_date)}
                </Row>
                <Row>
                  <b>Description:{"\xa0"}</b>
                  {eventDetails.e_description}
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
                    // type="submit"
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
            {renderComments}
          </Card.Footer>
        </Card>
      </Container>
    </div>
  );
};
export default EventInfoPage;
