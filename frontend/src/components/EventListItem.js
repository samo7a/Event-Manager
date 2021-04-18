import React from 'react';
import Button from 'react-bootstrap/Button';
import moment from 'moment';
import './EventListItem.css';

const EventListItem = (props) => {

    return (
        <div className={props.myStyle}>
            <span onClick={() => props.click(props.id)} className="clickable">
                <strong>{props.name}</strong>
            </span>
            <div className="date-div">
            {moment(props.date.slice(0, 10), "YYYY-MM-DD").format("dddd, MMMM Do YYYY")}
            </div>
            <Button onClick={props.approveEvent}>Approve</Button>
        </div>
    );
};

export default EventListItem;