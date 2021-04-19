// TODO
// Find out why page refreshed when post comment is added
// Find out why message is displayed
// Find out why await throws an error in the try block
import React, { useState, useEffect } from "react";
import { ButtonGroup, Modal, Card, Container, Button, Col, Row, Form } from "react-bootstrap";
import pupFiller from "../../pictures/pupFiller.jpeg";
import {BsStarFill, BsStarHalf, BsStar} from 'react-icons/bs';
import "./EventInfoPage.css";
const EventInfoPage = (props) => {
  // Event fields
  const [eventName, setName] = useState("");
  const [eventRso, setRso] = useState("");
  const [eventDesc, setDesc] = useState("S");
  const [eventDate, setDate] = useState("MM/DD/YYYY");
  const [eventRating, setRating] = useState(0);
  const userDEBUG = {
    id: 12,
    firstName: "Jon",
    lastName: "Frucht",
  };
  var user = JSON.parse(localStorage.getItem("user_data"));
  const s_id = user ? user.id : 0;
  const fName = user ? user.firstName : "F";
  const lName = user ? user.lastName : "L";

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
  const [eventDetails, setEventDetails] = useState({});
  const [eventComments, setEventComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [commentLength, setCommentLength] = useState(1000);
  const [needsUpdate, setNeedsUpdate] = useState(false);
  const [message, setMessage] = useState("");
  const [myRating, setMyRating] = useState(0);
  const [showRate, setShowRate] = useState(false);

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
          setEventDetails(res);
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    getEventSingle();
  }, [needsUpdate]);

  const postComment = async (event) => {
    event.preventDefault();
    if (newComment.length == 0) {
      setMessage(" Can not post empty comment.");
      return;
    }

    try {
      let obj = {
        e_id: 20,
        s_id: s_id,
        fName: fName,
        comment: newComment,
      };
      console.log(obj);
      var js = JSON.stringify(obj);
      const response = await fetch("/api/addComment", {
        method: "POST",
        body: js,
        headers: { "Content-Type": "application/json" },
      });
      let update;
      var res = JSON.parse(await response.text());
      if (response.status !== 200) {
        console.log(res.error);
      } else {
        update = needsUpdate;
        setNeedsUpdate(!update);
        setNewComment("");
        setCommentLength(1000);
      }
    } catch (e) {
      console.log(e.toString());
      return;
    }
  };

  const avgRating = () => {
    let rating = eventDetails.avgRating;
    if (rating == 5.0) {
      return (
        <div>
          <BsStarFill /> <BsStarFill /> <BsStarFill /> <BsStarFill /> <BsStarFill />
        </div>
      )
    } else if (rating > 4 && rating < 5) {
      return (
        <div>
          <BsStarFill /> <BsStarFill /> <BsStarFill /> <BsStarFill /> <BsStarHalf />
        </div>
      )
    } else if (rating == 4.0) {
      return (
        <div>
          <BsStarFill /> <BsStarFill /> <BsStarFill /> <BsStarFill /> <BsStar />
        </div>
      )
    } else if (rating > 3 && rating < 4) {
      return (
        <div>
          <BsStarFill /> <BsStarFill /> <BsStarFill /> <BsStarHalf /> <BsStar />
        </div>
      )
    } else if (rating == 3.0) {
      return (
        <div>
          <BsStarFill /> <BsStarFill /> <BsStarFill /> <BsStar /> <BsStar />
        </div>
      )
    } else if (rating > 2 && rating < 3) {
      return (
        <div>
          <BsStarFill /> <BsStarFill /> <BsStarHalf /> <BsStar /> <BsStar />
        </div>
      )
    } else if (rating == 2.0) {
      return (
        <div>
          <BsStarFill /> <BsStarFill /> <BsStar /> <BsStar /> <BsStar />
        </div>
      )
    } else if (rating > 1 && rating < 2) {
      return (
        <div>
          <BsStarFill /> <BsStarHalf /> <BsStar /> <BsStar /> <BsStar />
        </div>
      )
    } else if (rating == 1.0) {
      return (
        <div>
          <BsStarFill /> <BsStar /> <BsStar /> <BsStar /> <BsStar />
        </div>
      )
    } else if (rating > 0 && rating < 1) {
      return (
        <div>
          <BsStarHalf /> <BsStar /> <BsStar /> <BsStar /> <BsStar />
        </div>
      )
    } else {
      return (
        <div>
          <BsStar /> <BsStar /> <BsStar /> <BsStar /> <BsStar />
        </div>
      )
    } 
  };

  const newCommentHandler = event => {
    let i;
    if (commentLength > 0)
      i = commentLength - 1;
      setCommentLength(i);
      setNewComment(event.target.value);
  };

  const renderComments =
    eventComments.length == 0 ? (
      <span className="no-comments">No comments yet, be the first!</span>
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

  const showRateHandler = () => {
    setShowRate(true);
  }

  const handleRateClose = () => {
    setShowRate(false);
  }

  const rateEventHandler = async () => {
    let obj = { e_id: eventDetails.e_id, rating: myRating, s_id: s_id};
    var res;
    try {
      let js = JSON.stringify(obj);
      let response = await fetch("/api/updateRating", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: js,
      });
      res = JSON.parse(await response.text());
      let update;
      if (response.status != 200) {
        throw new Error(response.status);
      } else {
        update = needsUpdate;
        setNeedsUpdate(!update);
        setShowRate(false);
      }
    } catch (error) {
      console.error("Error:", error);
      return "";
    }
  };

  const printMyRating = () => {
    if (myRating == 0) {
      return (
        <div>
          <BsStar onClick={() => setMyRating(1)} /> <BsStar onClick={() => setMyRating(2)} /> <BsStar onClick={() => setMyRating(3)} /> <BsStar onClick={() => setMyRating(4)} /> <BsStar onClick={() => setMyRating(5)} />
        </div>
      )
    } else if (myRating == 1) {
      return (
        <div>
          <BsStarFill onClick={() => setMyRating(1)} /> <BsStar onClick={() => setMyRating(2)} /> <BsStar onClick={() => setMyRating(3)} /> <BsStar onClick={() => setMyRating(4)} /> <BsStar onClick={() => setMyRating(5)} />
        </div>
      )
    } else if (myRating == 2) {
      return (
        <div>
          <BsStarFill onClick={() => setMyRating(1)} /> <BsStarFill onClick={() => setMyRating(2)} /> <BsStar onClick={() => setMyRating(3)} /> <BsStar onClick={() => setMyRating(4)} /> <BsStar onClick={() => setMyRating(5)} />
        </div>
      )
    } else if (myRating == 3) {
      return (
        <div>
          <BsStarFill onClick={() => setMyRating(1)} /> <BsStarFill onClick={() => setMyRating(2)} /> <BsStarFill onClick={() => setMyRating(3)} /> <BsStar onClick={() => setMyRating(4)} /> <BsStar onClick={() => setMyRating(5)} />
        </div>
      )
    } else if (myRating == 4) {
      return (
        <div>
          <BsStarFill onClick={() => setMyRating(1)} /> <BsStarFill onClick={() => setMyRating(2)} /> <BsStarFill onClick={() => setMyRating(3)} /> <BsStarFill onClick={() => setMyRating(4)} /> <BsStar onClick={() => setMyRating(5)} />
        </div>
      )
    } else if (myRating == 5) {
      return (
        <div>
          <BsStarFill onClick={() => setMyRating(1)} /> <BsStarFill onClick={() => setMyRating(2)} /> <BsStarFill onClick={() => setMyRating(3)} /> <BsStarFill onClick={() => setMyRating(4)} /> <BsStarFill onClick={() => setMyRating(5)} />
        </div>
      )
    }
  }

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
              <Col>
                Rating: {avgRating()}
              </Col>
              <Col>
                <Button onClick={showRateHandler}>Rate</Button>
              </Col>
            </Row>
          </Card.Body>
          <Card.Footer>
            <h3 style={{ textAlign: "center", textDecoration: "underline" }}>Comments</h3>
            <Card className="cardComment" style={{ marginBottom: "1rem" }}>
              <Form>
                <Form.Group
                  className="post-a-comment"
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
                    value={newComment}
                    onChange={newCommentHandler}
                  />
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col}>  </Form.Group>
                  <Form.Group as={Col}>
                    <span style={{marginRight: "0.5em"}}>
                      {commentLength} characters remaining
                    </span>
                    <Button
                      variant="primary"
                      onClick={postComment}
                    >
                      Post comment
                    </Button>
                  </Form.Group>
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
      <Modal 
          show={showRate} 
          onHide={handleRateClose}
          aria-labelledby="contained-modal-title-vcenter"
          centered
      >
          <Modal.Header closeButton>
              <Modal.Title>Rate the event {myRating} <BsStarFill /></Modal.Title>
          </Modal.Header>
          <Modal.Body>
              {printMyRating()}
          </Modal.Body>
          <Modal.Footer>
              <ButtonGroup>
                <Button variant="secondary" onClick={handleRateClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={rateEventHandler}>
                  Rate
                </Button>
              </ButtonGroup>
          </Modal.Footer>
      </Modal>
    </div>
  );
};
export default EventInfoPage;
