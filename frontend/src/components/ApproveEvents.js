import { useState, useEffect } from 'react';

const ApproveEvents = () => {
    const [unapprovedEvents, setUnapprovedEvents] = useState([]);
    const [needsUpdate, setNeedsUpdate] = useState(false);

    const getTheEvents = async () => {
        var res;
        let user = JSON.parse(localStorage.getItem('user'));

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

    const eventsToApprove = (
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
    )

    return (
        <div>
            {eventsToApprove}
        </div>
    );
}

export default ApproveEvents;