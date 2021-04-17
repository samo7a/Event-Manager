import React from 'react';
import './RsoListItem.css';

const RsoListItem = (props) => {

    return (
        <div className={props.myStyle} onClick={props.click}>
            <span>
                <strong>{props.name}</strong>
            </span>
            <div className="content-div">
                RSO admin: {props.s_name}
            </div>
            <div className="content-div">
                RSO status: {props.status}
            </div>
        </div>
    );
};

export default RsoListItem;