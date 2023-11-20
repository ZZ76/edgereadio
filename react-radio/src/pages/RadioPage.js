import React from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.css';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import StationList from "../components/StationList.js";
import NavbarCustom from '../components/Navbar.js';

import RadioPlayer from "../components/RadioPlayer";

export default function RadioPage() {

    return (
        <>
            <Row className="player-holder">
                <RadioPlayer />
            </Row>
            <Row id="list-holder">
                <Col xs={"auto"}>
                </Col>
                <StationList />
                <Col xs={"auto"}>
                </Col>
            </Row>
        </>
    );
}
