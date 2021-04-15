import React from 'react';

const EventListItem = (props) => {

    return (
        <div className={props.myStyle}>
            <span><strong>{props.name}</strong></span>
            
        </div>

    );
};

export default EventListItem;