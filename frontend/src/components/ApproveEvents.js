import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import EventListItem from './EventListItem';
import './ApproveEvents.css';

const ApproveEvents = () => {
    const [unapprovedEvents, setUnapprovedEvents] = useState([]);
    const [needsUpdate, setNeedsUpdate] = useState(false);
    const user = localStorage.getItem("user_data");
    const sa_id = user ? JSON.parse(user).id : 0;

    const getTheEvents = async () => {
        var res;

        try {
            let js = {sa_id: sa_id};
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
                console.log("GetEvents res value: ", res);
                setUnapprovedEvents(res);
            }
        } catch (error) {
            console.log("Error: ", error);
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
            let js = {sa_id: sa_id, e_id: id};
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

    const eventsToApprove =  unapprovedEvents.length == 0 ? 
        (<span>No events to approve</span>) : 
        (    
            unapprovedEvents.map((e, i) => {
                return (
                    <EventListItem
                        myStyle={`event-list-item event-color-${i % 2 == 0 ? "lightgray" : "white"}`}
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
            let js = {sa_id: sa_id};
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
        <div className="unapproved-events-div">
            <div className="unapproved-events-title">
                Unapproved Events
            </div>
            <Button onClick={approveAllHandler}>Approve All</Button>
            <div>
                {eventsToApprove}
            </div>
        </div>
    );
}

export default ApproveEvents;