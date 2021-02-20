import './RegisterBox.css';
import { useState } from 'react';
import PageTitle from './PageTitle';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

const RegisterBox = (props) => {

    const [fName, setfName] = useState("");
    const [lName, setlName] = useState("");
    const [email, setEmail] = useState("");
    const [uni, setUni] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    const registerHandler = (event) => {
        event.preventDefault();
        console.log(fName);
        if(fName !== "" && lName != "") {
            alert(`Registering ${fName} ${lName}`);
        } else {
            alert("Where's your data??");
        }
    }

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
                                        <Form.Control type="text" placeholder="First name" onChange={(event) => {setfName(event.target.value)}}/>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridLastName">
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control type="text" placeholder="Last name" onChange={(event) => {setlName(event.target.value)}} />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" placeholder="Email address" onChange={(event) => {setEmail(event.target.value)}}/>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridUniversity">
                                        <Form.Label>University</Form.Label>
                                        <Form.Control type="text" placeholder="My university" onChange={(event) => {setUni(event.target.value)}} />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridUsername">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control type="text" placeholder="Username" onChange={(event) => {setUsername(event.target.value)}}/>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Password" onChange={(event) => {setPassword(event.target.value)}}/>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridPassword2">
                                        <Form.Label>Retype password</Form.Label>
                                        <Form.Control type="password" placeholder="Retype password" onChange={(event) => {setPassword2(event.target.value)}} />
                                    </Form.Group>
                                </Form.Row>
                                <button className="register-button" type="submit" onClick={registerHandler}>
                                    Register
                                </button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default RegisterBox;