import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

const Search = (props) => {
    const [searchItem, setSearchItem] = useState("");
    const [loading, setLoading] = useState(false);

    const doTheSearch = async () => {
        let endpoint = props.type === "'groups" ? "/api/groupSearch" : "/api/eventSearch"
        let js = { searchVal : searchItem };
        try {
        fetch(endpoint, {
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
            if (response.status !== 200) {
                throw res.msg;
            }
            return response.json();
            })
            .then((data) => {
                props.getResults(data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
            alert("Check the console");
        }
    }

    return (
        <Container fluid>
            <input 
                type="text" 
                placeholder={props.type === "groups" ? "Search groups" : "Search events"}
                onChange={(event) => setSearchItem(event.target.value)}
            />
            {!loading ? (
                <Button 
                    variant="primary"
                    onClick={() => {
                        setLoading(true);
                        doTheSearch;
                    }}
                >
                    Search
                </Button>
            ) : (
                <Button variant = "primary" disabled>
                    <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />
                </Button>
            )}
        </Container>
    );
};

export default Search;