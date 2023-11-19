import React from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.css";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import YoutubePlayer from "../components/YoutubePlayer";

export default function YoutubePage() {

    return (
        <>
            <Row id="player-holder">
                Youtube Player
                <YoutubePlayer />
            </Row>
            <Row id="list-holder">
            <Row id="youtube-content">
                Content
            </Row>
            </Row>
        </>
    );
}
