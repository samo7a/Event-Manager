import React from 'react';
import Button from 'react-bootstrap/Button';
import './EventListItem.css';

const EventListItem = (props) => {

    return (
        <div className={props.myStyle}>
            <span><strong>{props.name}</strong></span>
            <div>
                {props.date.slice(0, 10)}
                <Button onClick={props.approveEvent}>Approve</Button>
            </div>
        </div>
    );
};

export default EventListItem;