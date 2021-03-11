import { useState, useEffect } from "react";
import "./Banner.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";

const MyNavBar = (props) => {
  // TODO : Add checkbox for login ( student or admin)
  const [uName, setUName] = useState("");
  const [adminLogin, setAdminLogin] = useState(false);
  const [pwd, setPwd] = useState("");
  const [message, setMessage] = useState("");
  const [checkboxVal, setCheckboxVal] = useState(false);
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    picture: "",
  });

  const initialStates = {
    message: "",
    userInfo: {
      firstName: "",
      lastName: "",
      email: "",
      picture: "",
    },
  };

  const checkboxChange = (event) => {
    console.log(event);
    if (checkboxVal) {
      setCheckboxVal(false);
      setAdminLogin(false);
    } else {
      setCheckboxVal(true);
      setAdminLogin(true);
    }
  };

  useEffect(() => {
    localStorage.clear();
    localStorage.setItem("user", userInfo);
  }, [userInfo]);

  const doLogin = async (event) => {
    event.preventDefault();
    let js = { loginType: adminLogin, username: uName, password: pwd };
    try {
      fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(js),
      })
        .then((response) => {
          if (response.status === 404) {
            throw "404 error";
          }
          let res = response.json();
          if (response.status !== 200) {
            throw res.msg;
          }
          return res;
        })
        .then((data) => {
          console.log("Success:", data);
          setUserInfo({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            picture: data.picture,
          });
          window.location.href = "/home";
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } catch (error) {
      console.error("Error:", error);
    } finally {
      alert("Check the console");
      setUName("");
      setPwd("");
    }
  };

  const doLogout = (event) => {
    event.preventDefault();
    setMessage(initialStates.message);
    setUserInfo(initialStates.userInfo);
    window.location.href = "/";
  };

  const messageSpan = message ? <span>{message}</span> : null;
  return (
    <div>
      {props.type === "login" ? (
        <Navbar className="banner" bg="light" variant="light">
          <Navbar.Brand>EventUp</Navbar.Brand>
          <Nav className="ml-auto">
            <Form inline>
              <Form.Check
                inline
                id="loginCB"
                label="University Admin"
                type="switch"
                // type = "checkbox" // Swap with above to make checkbox
                onChange={checkboxChange}
              />
              <FormControl
                type="text"
                placeholder="Username"
                className="mr-sm-2"
                onChange={(e) => setUName(e.target.value)}
              />
              <FormControl
                type="password"
                placeholder="Password"
                className="mr-sm-2"
                onChange={(e) => setPwd(e.target.value)}
              />
              <button type="submit" onClick={(event) => doLogin(event)}>
                Login
              </button>
            </Form>
          </Nav>
        </Navbar>
      ) : (
        <Navbar bg="light" variant="light">
          <Navbar.Brand>EventUp</Navbar.Brand>
          <Nav className="ml-auto">
            <div className="name">
              {userInfo.firstName ? userInfo.firstName : null}
            </div>
            <button type="button" onClick={(event) => doLogout(event)}>
              Logout
            </button>
          </Nav>
        </Navbar>
      )}
    </div>
  );
};

export default MyNavBar;
