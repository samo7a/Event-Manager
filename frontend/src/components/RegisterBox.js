import "./RegisterBox.css";
// import "./SelectSearch.css";
import { useState } from "react";
import { useSelect } from "react-select-search";
import PageTitle from "./PageTitle";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import SelectSearch from "react-select-search";
import fuzzySearch from "./fuzzySearch";
// --Design Decisions & TO-DO
// Do we want to seperate radio buttons?
// Why do the radio buttons not respond after first click?
// Buttongroup -> Togglegroup
// load in uni list afer render
// ADD -> CHANGE ADDR2 TO CITY
// ADD -> CHANGE UNI to INPUT on SUPERADMIN
const RegisterBox = (props) => {
  // Array of state names
  const stateOps = [
    { name: "Alabama", value: "AL" },
    { name: "Alaska", value: "AK" },
    { name: "Arizona", value: "AZ" },
    { name: "Arkansas", value: "AR" },
    { name: "California", value: "CA" },
    { name: "Colorado", value: "CO" },
    { name: "Connecticut", value: "CT" },
    { name: "Delaware", value: "DE" },
    { name: "District of Columbia", value: "DC" },
    { name: "Florida", value: "FL" },
    { name: "Georgia", value: "GA" },
    { name: "Hawaii", value: "HI" },
    { name: "Idaho", value: "ID" },
    { name: "Illinois", value: "IL" },
    { name: "Indiana", value: "IN" },
    { name: "Iowa", value: "IA" },
    { name: "Kansas", value: "KS" },
    { name: "Kentucky", value: "KY" },
    { name: "Louisiana", value: "LA" },
    { name: "Maine", value: "ME" },
    { name: "Maryland", value: "MD" },
    { name: "Massachusetts", value: "MA" },
    { name: "Michigan", value: "MI" },
    { name: "Minnesota", value: "MN" },
    { name: "Mississippi", value: "MS" },
    { name: "Missouri", value: "MO" },
    { name: "Montana", value: "MT" },
    { name: "Nebraska", value: "NE" },
    { name: "Nevada", value: "NV" },
    { name: "New Hampshire", value: "NH" },
    { name: "New Jersey", value: "NJ" },
    { name: "New Mexico", value: "NM" },
    { name: "New York", value: "NY" },
    { name: "North Carolina", value: "NC" },
    { name: "North Dakota", value: "ND" },
    { name: "Ohio", value: "OH" },
    { name: "Oklahoma", value: "OK" },
    { name: "Oregon", value: "OR" },
    { name: "Pennsylvania", value: "PA" },
    { name: "Rhode Island", value: "RI" },
    { name: "South Carolina", value: "SC" },
    { name: "South Dakota", value: "SD" },
    { name: "Tennessee", value: "TN" },
    { name: "Texas", value: "TX" },
    { name: "Utah", value: "UT" },
    { name: "Vermont", value: "VT" },
    { name: "Virginia", value: "VA" },
    { name: "Washington", value: "WA" },
    { name: "West Virginia", value: "WV" },
    { name: "Wisconsin", value: "WI" },
    { name: "Wyoming", value: "WY" },
  ];
  // Array of Universities (Fill)
  const uniOps = [{ name: "UCF", value: "UCF" }];

  // Register variables
  const [fName, setfName] = useState("");
  const [lName, setlName] = useState("");
  const [email, setEmail] = useState("");
  const [uni, setUni] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [uniAddr1, setUniAddr1] = useState("");
  const [uniCity, setCity] = useState("");
  const [stateLoc, setStateLoc] = useState("");
  const [zipCode, setZipCode] = useState("");
  // Registration message
  const [message, setMessage] = useState("");
  // Registration type
  const [regstrType, setRegstrType] = useState(false);
  const [checked, setChecked] = useState(false);
  const regstrRadios = [
    { name: "Student", value: false },
    { name: "SuperAdmin", value: true },
  ];

  const toggleStudReg = (event) => {
    event.preventDefault();
    setChecked(false);
    setRegstrType(false);
  };
  const toggleAdminReg = (event) => {
    event.preventDefault();
    setChecked(true);
    setRegstrType(true);
  };

  // State search menu
  const StateSelect = () => (
    <SelectSearch
      options={stateOps}
      search
      id="selectSearch"
      autoComplete="off"
      // printOptions="always" // Debug option
      value={stateOps}
      filterOptions={fuzzySearch}
      // filterOptions={(options) => {
      //   const filter = fuzzySearch(options);
      //   return (q) => filter(q).slice(0, 8);
      // }}
      placeholder="Select your state"
      style={{ listStyleType: "none" }}
      onChange={setStateLoc}
    />
  );
  // University search menu
  // State search menu
  const UniSelect = () => (
    <SelectSearch
      options={uniOps}
      search
      id="selectSearch"
      autoComplete="off"
      // printOptions="always" // Debug option
      value={uniOps}
      filterOptions={fuzzySearch}
      // filterOptions={(options) => {
      //   const filter = fuzzySearch(options);
      //   return (q) => filter(q).slice(0, 8);
      // }}
      placeholder="University name"
      style={{ listStyleType: "none" }}
      onChange={setUni}
    />
  );
  // Admin Registration
  const AdminReg = (props) => (
    <Form.Group name="Admin Reg" {...props}>
      <Form.Row>
        <Form.Label>
          <u>University address</u>
        </Form.Label>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} controlId="formGridUniAddr1">
          <Form.Control
            type="text"
            placeholder="Address line 1"
            onChange={(event) => {
              setUniAddr1(event.target.value);
            }}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridUniCity">
          <Form.Control
            type="text"
            placeholder="City"
            onChange={(event) => {
              setCity(event.target.value);
            }}
          />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} controlId="formGridState">
          <StateSelect options={stateOps} />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridZip">
          <Form.Control
            type="text"
            placeholder="Zip Code"
            onChange={(event) => {
              setZipCode(event.target.value);
            }}
          />
        </Form.Group>
      </Form.Row>
    </Form.Group>
  );

  // Register function
  const registerHandler = (event) => {
    event.preventDefault();
    console.log(fName);
    console.log(lName);
    console.log(email);
    console.log(uni);
    console.log(password);
    console.log(password2);
    console.log(uniAddr1);
    console.log(uniCity);
    console.log(stateLoc);
    console.log(zipCode);
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
    let pwCheck = password.value === password2.value;
    if (!pwCheck) {
      setMessage("The passwords do not match!");
      return;
    }
    // Test uniAddr1
    // Test City
    // Test zip code
    if (zipCode.value.length != 5) {
      setMessage("Your zip code is not valid!");
      return;
    }

    // var pwd = sha256(password.value);
    // Are we going to use sha256 for this?
    var userType = regstrType ? regstrRadios[1].name : regstrRadios[2].name;

    let js = {
      fName: fName.value,
      lName: lName.value,
      password: password.value,
      email: email.value,
      userType: userType.value,
      university: uni.value,
      uniAddr1: uniAddr1.value,
      uniAddr2: uniCity.value,
      state: stateLoc.value,
      zip: zipCode.value,
    };

    try {
      fetch("/api/signup", {
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
          window.location.href = "/"; // Super hacky way to clear the form
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } catch (error) {
      console.error("Error:", error);
    } finally {
      alert("Check the console");
    }
  };

  return (
    <Container fluid="lg">
      <div className="register-box">
        <div className="register-wrapper">
          <PageTitle />
          <div className="register-form-wrapper">
            <div className="register-form">
              <Form Inline>
                <Form.Row className="text-center">
                  <ToggleButtonGroup
                    type="radio"
                    name="reg-type"
                    className="mb-2"
                    // value={checked ? true : false}
                    // onChange={setChecked}
                    defaultValue={false}
                  >
                    <ToggleButton
                      style={{ margin: "10px" }}
                      id="studentRegstrButtons"
                      type="radio"
                      variant="secondary"
                      name="studRegstrBut"
                      // value={}
                      // checked={true}
                      // checked={checked === regstrRadios[0].value}
                      onClick={toggleStudReg}
                      // onChange={(e) => setChecked(e.currentTarget.checked)}
                    >
                      {regstrRadios[0].name}
                    </ToggleButton>
                    <ToggleButton
                      style={{ margin: "10px" }}
                      id="adminRegstrButtons"
                      type="radio"
                      variant="secondary"
                      name="adminRegstrBut"
                      // value={}
                      // checked={checked === regstrRadios[1].value}
                      onClick={toggleAdminReg}
                      // onChange={(e) => setChecked(e.currentTarget.checked)}
                    >
                      {regstrRadios[1].name}
                    </ToggleButton>
                    {/* ))} */}
                  </ToggleButtonGroup>
                </Form.Row>
                <br></br>
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
                    <div>
                      {regstrType ? (
                        <Form.Control
                          type="text"
                          placeholder="My university"
                          onChange={(event) => {
                            setUni(event.target.value);
                          }}
                        />
                      ) : (
                        <UniSelect />
                      )}
                    </div>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
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
                    <Form.Label>Confirm password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirm password"
                      onChange={(event) => {
                        setPassword2(event.target.value);
                      }}
                    />
                  </Form.Group>
                </Form.Row>
                <br></br>

                <div>
                  <div>{regstrType ? <AdminReg /> : null}</div>
                  {/* {regstrType ? <AdminReg /> : null} */}
                  {/*                   
                    <Form.Group name="Admin Reg">
                      <Form.Row>
                        <Form.Label>
                          <u>University address</u>
                        </Form.Label>
                      </Form.Row>
                      <Form.Row>
                        <Form.Group as={Col} controlId="formGridUniAddr1">
                          <Form.Control
                            type="text"
                            placeholder="Address line 1"
                            onChange={(event) => {
                              setUniAddr1(event.target.value);
                            }}
                          />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridCity">
                          <Form.Control
                            type="text"
                            placeholder="Address line 2"
                            onChange={(event) => {
                              setCity(event.target.value);
                            }}
                          />
                        </Form.Group>
                      </Form.Row>
                      <Form.Row>
                        <Form.Group controlId="formGridState">
                          <StateSelect />
                        </Form.Group>
                        <Form.Group controlId="formGridZip">
                          <Form.Control
                            type="text"
                            placeholder="Zip Code"
                            onChange={(event) => {
                              setZipCode(event.target.value);
                            }}
                          />
                        </Form.Group>
                      </Form.Row>
                    </Form.Group>
                   */}
                </div>
                <Button
                  className="register-button"
                  type="submit"
                  onClick={registerHandler}
                >
                  Register
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default RegisterBox;
