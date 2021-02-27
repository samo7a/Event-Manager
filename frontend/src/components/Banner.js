import { useState } from 'react';
import './Banner.css';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

const MyNavBar = (props) => {

    const [uName, setUName] = useState("");
    const [pwd, setPwd] = useState("");
    const [message, setMessage] = useState("");

    const doLogin = async (event) => {
        event.preventDefault();
        
        let js = { username:uName, password:pwd };
        try {
            const response = await fetch("/api/login", {
              method: "POST",
              body: js,
              headers: { "Content-Type": "application/json" },
            });
      
            let res = JSON.parse(await response.text());
      
            if (response.status !== 200) {
              setMessage(res.error);
            } else {
                alert("Logged Stacey in");
            }
          } catch (e) {
            alert(e.toString());
            return;
          }
    }

    const messageSpan = (
        message ? (
            <span>{message}</span>
        ) : (
            null
        )
    )
    return (
        <div>
            {props.type === "login" ? (
                <Navbar bg="light" variant="light">
                    <Navbar.Brand>EvenUp</Navbar.Brand>
                    <Form inline className="login-boxes">
                        <FormControl type="text" placeholder="Username" className="mr-sm-2" onChange={(e) => setUName(e.target.value)} />
                        <FormControl type="password" placeholder="Password" className="mr-sm-2" onChange={(e) => setPwd(e.target.value)} />
                        <button 
                            type="submit" 
                            onClick={() => doLogin()}
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
