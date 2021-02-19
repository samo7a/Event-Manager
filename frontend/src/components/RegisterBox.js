import React from 'react';
import PageTitle from './PageTitle';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

const RegisterBox = (props) => {
    let firstName = "";
    let lastName = "";
    let email = "";
    let uni = "";
    let username = "";
    let password = "";
    let password2 = "";

    const registerHandler = (event) => {
        event.preventDefault();
        console.log(firstName);
        if(firstName !== "" && lastName != "") {
            alert(`Registering ${firstName} ${lastName}`);
        } else {
            alert("Where's your data??");
        }
    }

    return (
        <div className="register-box">
            <PageTitle />
            <div className="register-form">
                <Form Inline>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridFirstname">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" placeholder="First name" ref={(c) => firstName = c }/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" placeholder="Last name" ref={(c) => lastName = c} />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Email address" ref={(c) => email = c }/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridUniversity">
                            <Form.Label>University</Form.Label>
                            <Form.Control type="text" placeholder="My university" ref={(c) => uni = c} />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Username" ref={(c) => username = c }/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="password" placeholder="Password" ref={(c) => password = c }/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword2">
                            <Form.Label>Retype password</Form.Label>
                            <Form.Control type="password" placeholder="Retype password" ref={(c) => password2 = c} />
                        </Form.Group>
                    </Form.Row>
                    <button type="submit" onClick={registerHandler}>
                        Register
                    </button>
                </Form>
            </div>
        </div>
    )
}

export default RegisterBox;