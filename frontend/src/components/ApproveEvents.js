import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import EventListItem from './EventListItem';

const ApproveEvents = () => {
    const [unapprovedEvents, setUnapprovedEvents] = useState([]);
    const [needsUpdate, setNeedsUpdate] = useState(false);
    const user = JSON.parse(localStorage.getItem("user"));

    const getTheEvents = async () => {
        var res;

        try {
            let js = {sa_id: user.id};
            const response = await fetch("/api/getUnapprovedEvent", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(js),
              })
        
            if (response.status != 200) {
                throw new Error(response.status);
            } else {
                res = JSON.parse(await response.text());
                setUnapprovedEvents(res);
            }
        } catch (error) {
            console.log("Error: " + error);
            return;
        }
    }

    useEffect(() => {
        getTheEvents();
    }, [needsUpdate]);

    const updateHandler = () => {
        let update = needsUpdate
        setNeedsUpdate(!update);
    }
    
    const approveEventHandler = async (id) => {
        var res;

        try {
            let js = {sa_id: user.id, e_id: id};
            const response = await fetch("/api/approveEvent", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(js),
              })
        
            if (response.status != 200) {
                throw new Error(response.status);
            } else {
                updateHandler();
            }
        } catch (error) {
            console.log("Error: " + error);
            return;
        }
    }

    const eventsToApprove =  (    
        unapprovedEvents.map((e, i) => {
            return (
                <EventListItem
                    myStyle={`event-color-${i % 2 == 0 ? "lightgray" : "white"}`}
                    name={e.e_name}
                    id={e.e_id}
                    date={e.e_date}
                    update={updateHandler}
                    approveEvent={() => approveEventHandler(e.e_id)}
                />
            )
        })
    );

    const approveAllHandler = async () => {
        var res;

        try {
            let js = {sa_id: user.id};
            const response = await fetch("/api/approveAllEvents", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(js),
              })
        
            if (response.status != 200) {
                throw new Error(response.status);
            } else {
                updateHandler();
            }
        } catch (error) {
            console.log("Error: " + error);
            return;
        }
    }

    return (
        <div>
            <h1>Unapproved Events</h1>
            <Button onClick={approveAllHandler}>Approve All</Button>
            {eventsToApprove ? eventsToApprove : <span>There are no events to approve at this time</span>}
        </div>
    );
}

export default ApproveEvents;