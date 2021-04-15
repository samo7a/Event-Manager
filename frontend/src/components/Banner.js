import { useState } from "react";
import { useHistory } from 'react-router-dom';
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

  var history = useHistory();

  const initialStates = {
    message: ""
  };

  const checkboxChange = (event) => {
    if (checkboxVal) {
      setCheckboxVal(false);
      setAdminLogin(false);
    } else {
      setCheckboxVal(true);
      setAdminLogin(true);
    }
  };

  const doLogin = async (event) => {
    event.preventDefault();
    let js = { loginType: adminLogin, email: uName, password: pwd };
    console.log(js);
    try {
      let response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(js),
      })
      var res = JSON.parse(await response.text());
      if (response.status !== 200) {
        console.log("There is an error here!");
        throw new Error(response.status);
      } else {
        console.log("Success: ", res);
        let user = {
          id: res.userId,
          firstName: res.firstName,
          lastName: res.lastName,
          email: res.email,
          picture: res.picture,
        };
        localStorage.setItem("user", JSON.stringify(user));
      }
    } catch (error) {
      console.error("Error:", error);
      return;
    }

    setUName("");
    setPwd("");
  };

  const changePwdHandler = (event) => {
    setPwd(event.target.value);
  };

  const changeUNameHandler = (event) => {
    setUName(event.target.value);
  }

  const doLogout = (event) => {
    event.preventDefault();
    setMessage(initialStates.message);
    localStorage.clear();
    history.push("/");
  };

  const finishLogin = () => {
    !adminLogin ? history.push("/home") : history.push("/dashboard");
  }

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
                value={uName}
                className="mr-sm-2"
                onChange={changeUNameHandler}
              />
              <FormControl
                type="password"
                placeholder="Password"
                value={pwd}
                className="mr-sm-2"
                onChange={changePwdHandler}
              />
              <button type="submit" onClick={async (event) => {
                await doLogin(event);
                finishLogin()
                }}>
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
