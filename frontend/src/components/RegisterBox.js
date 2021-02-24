import "./RegisterBox.css";
import { useState } from "react";
import PageTitle from "./PageTitle";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

const RegisterBox = (props) => {
  // Register variables
  const [fName, setfName] = useState("");
  const [lName, setlName] = useState("");
  const [email, setEmail] = useState("");
  const [uni, setUni] = useState("");
  const [username, setUsername] = useState(""); // Remove this correct?
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  // Registration message
  const [message, setMessage] = useState("");
  // Registration type
  const [regstrType, setRegstrType] = useState(false);

  // Toggle Registration
  const toggleAdminRegstr = (event) => {
    setRegstrType(true);
  };
  const toggleStudRegstr = (event) => {
    setRegstrType(false);
  };
  // Register function
  const registerHandler = (event) => {
    event.preventDefault();
    console.log(fName);
    // let check = email.value === checkEmail.value;
    // if (!check) {
    //   setMessage("The emails do not match!");
    //   return;
    // }
    // TO-DO :
    // Add regex for email

    if (fName.value === "" || lName.value === "") {
      alert(`Registering ${fName} ${lName}`);
      setMessage("Please enter your first and last name");
      return;
    }

    // if (loginName.value === "") {
    //   setMessage("A username is required");
    //   return;
    // }

    if (password.value === "") {
      setMessage("A password is required");
      return;
    }

    var expression = /\S+@\S+/;
    if (!expression.test(String(email.value).toLowerCase())) {
      setMessage("Please enter a valid email address");
      return;
    }

    // expression = /^\w+$/;
    // if (!expression.test(loginName.value)) {
    //   setMessage(
    //     "Your username may only contain letters, numbers, and underscores"
    //   );
    //   return;
    // }

    if (password.value.length < 8) {
      setMessage("Your password must be at least 8 characters long");
      return;
    }

    expression = /[!@#$%*]/;
    if (!expression.test(password.value)) {
      setMessage(
        "Your password must contain at least one of the following special character: @, !, #, $, %, *"
      );
      return;
    }

    expression = /[0-9]/;
    if (!expression.test(password.value)) {
      setMessage("Your password must contain at least one digit (0-9)");
      return;
    }

    expression = /[a-z]/;
    if (!expression.test(password.value)) {
      setMessage("Your password must contain at least one lowercase letter");
      return;
    }

    expression = /[A-Z]/;
    if (!expression.test(password.value)) {
      setMessage("Your password must contain at least one uppercase letter");
      return;
    }
    let check = password.value === password2.value;
    if (!check) {
      setMessage("The passwords do not match!");
      return;
    }

    // var pwd = sha256(password.value);
    // Are we going to use sha256 for this?

    // var obj = {
    //   username: loginName.value,
    //   password: pwd,
    //   fName: fName.value,
    //   lName: lName.value,
    //   email: email.value,
    // };
    // var js = JSON.stringify(obj);
  };

  return (
    <Container fluid="lg">
      <div className="register-box">
        <div className="register-wrapper">
          <PageTitle />
          <div className="register-form-wrapper">
            <div className="register-form">
              <Form Inline>
                <Form.Row>
                  <Form.Group as={Col} controlId="formGridFirstname">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="First name"
                      onChange={(event) => {
                        setfName(event.target.value);
                      }}
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Last name"
                      onChange={(event) => {
                        setlName(event.target.value);
                      }}
                    />
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Email address"
                      onChange={(event) => {
                        setEmail(event.target.value);
                      }}
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridUniversity">
                    <Form.Label>University</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="My university"
                      onChange={(event) => {
                        setUni(event.target.value);
                      }}
                    />
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} controlId="formGridUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Username"
                      onChange={(event) => {
                        setUsername(event.target.value);
                      }}
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      onChange={(event) => {
                        setPassword(event.target.value);
                      }}
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridPassword2">
                    <Form.Label>Retype password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Retype password"
                      onChange={(event) => {
                        setPassword2(event.target.value);
                      }}
                    />
                  </Form.Group>
                </Form.Row>
                <button
                  className="register-button"
                  type="submit"
                  onClick={registerHandler}
                >
                  Register
                </button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default RegisterBox;
