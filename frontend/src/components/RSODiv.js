import React, { useState, useEffect } from 'react';
import RsoListItem from './RsoListItem';
import {Row, Col, Button, Modal} from 'react-bootstrap';
import './RSODiv.css';

const RSODiv = () => {
    let check = localStorage.getItem("user_data");
    const user = check ? JSON.parse(check) : null;
    const sa_id = user ? user.id : 0;

    const [rsoList, setRsoList] = useState([
        {
            admin: {},
            rso: {},
        },
    ]);
    const [showRsoModal, setShowRsoModal] = useState(false);
    const [rso, setRso] = useState({
        admin: {},
        members: [],
        events: [],
    });

    const loadRsoListHandler = async () => {
        var js = {sa_id: sa_id};
        var res;

        try {
            const response = await fetch("/api/getAllRsos", {
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

    const handleRsoClick = async (id) => {
        var js = {rso_id: id};
        var res;

        try {
            const response = await fetch("/api/getRsoDetails", {
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
                setRso(res);
                setShowRsoModal(true);
            }
        } catch (error) {
            console.log("Error: ", error);
            return;
        }
    };

    const handleRsoClose = () => {
        setShowRsoModal(false);
    };

    const renderRsos = rsoList[0].rso.rso_name ? (
        <div className="opaque-div">
            <div className="div-title">
                RSOs
            </div>
            {rsoList.map((r,i) => {
                return (
                    <RsoListItem
                        name={r.rso.rso_name}
                        id={r.rso.rso_id}
                        status={r.rso.status}
                        s_name={r.admin.s_firstName + r.admin.s_lastName}
                        myStyle={`rso-list-item rso-color-${i % 2 == 0 ? "lightgray" : "white"}`}
                        click={() => handleRsoClick(r.rso.rso_id)}
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
            <Modal show={showRsoModal} onHide={handleRsoClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{rso.rso_name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>Members: {rso.no_of_members}</Col>
                        <Col>Admin: {rso.admin.s_name}</Col>
                    </Row>
                    <Row>{rso.rso_description}</Row>
                    <Row>
                        <Col>
                            <Row>Members:</Row>
                            {rso.members.map((m,i) => {
                                return (
                                    <Row>
                                        <div>
                                            {i+1}. {m.s_firstName} {m.s_lastName}
                                        </div>
                                    </Row>
                                )
                            })}
                        </Col>
                        <Col>
                            <Row>Events:</Row>
                            {rso.events.map(e => {
                                return (
                                    <Row>{e.e_name} {e.e_date.slice(0, 10)}</Row>
                                )
                            })}
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleRsoClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default RSODiv;