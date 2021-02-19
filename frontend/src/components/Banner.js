import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

const MyNavBar = (props) => {

    return (
        <div>
            {props.type === "login" ? (
                <Navbar bg="light" variant="light">
                    <Navbar.Brand>EvenUp</Navbar.Brand>
                    <Form inline>
                        <FormControl type="text" placeholder="Username" className="mr-sm-2" />
                        <FormControl type="password" placeholder="Password" className="mr-sm-2" />
                        <button 
                            type="submit" 
                            onClick={() => alert("heyheyhey!")}
                        >
                            Login
                        </button>
                    </Form>
                </Navbar>
            ) : (
                <Navbar bg="light" variant="light">
                    <Navbar.Brand>EvenUp</Navbar.Brand>
                    <p>
                        Username + picture
                    </p>
                    <button 
                        type="button"
                        onClick={() => alert("bitch bye")}
                    >
                        Logout
                    </button>
                </Navbar>
            )}
        </div>
    )
}

export default MyNavBar;
