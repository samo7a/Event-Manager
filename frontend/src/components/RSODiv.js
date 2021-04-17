import React, { useState, useEffect } from 'react';
import RsoListItem from './RsoListItem';
import './RSODiv.css';

const RSODiv = () => {
    let check = localStorage.getItem("user_data");
    const user = check ? JSON.parse(check) : null;
    const sa_id = user ? user.id : 0;

    const [rsoList, setRsoList] = useState([]);
    const [showRsoModal, setShowRsoModal] = useState(false);

    const loadRsoListHandler = async () => {
        var js = {sa_id: sa_id};
        var res;

        try {
            const response = await fetch("/api/getAllRSO", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(js),
              })
            
            res = JSON.parse(await response.text());
            if (response.status != 200) {
                throw new Error(response.status);
            } else {
                console.log(res);
                setRsoList(res);
            }
        } catch (error) {
            console.log("Error: ", error);
            return;
        }
    }

    useEffect(() => loadRsoListHandler(), []);

    const handleRsoClick = () => {
        setShowRsoModal(true);
    }

    const renderRsos = rsoList.length > 0 ? (
        <div className="opaque-div">
            <div className="div-title">
                RSOs
            </div>
            {rsoList.map((r,i) => {
                return (
                    <RsoListItem
                        name={r.rso_name}
                        id={r.rso_id}
                        status={r.status}
                        s_name={r.firstName + r.lastName}
                        myStyle={`rso-list-item rso-color-${i % 2 == 0 ? "lightgray" : "white"}`}
                        click={() => handleRsoClick(r.rso_id, r.firstName, r.lastName)}
                    />
                )
            })}
        </div>
    ) : (
        <div className="opaque-div">
            <div className="div-title">
                RSOs
            </div>
            There are no RSOs to display
        </div>
    );

    return (
        <div>
            {renderRsos}
        </div>
    );
};

export default RSODiv;