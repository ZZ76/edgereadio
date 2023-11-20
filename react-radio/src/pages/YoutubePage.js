import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from 'react-bootstrap/Button';
import { MdOutlineOpenInNew } from "react-icons/md";

import YoutubePlayer from "../components/YoutubePlayer";
import UrlInput from "../components/youtubeplayer/UrlInput"
import YoutubeContent from "../components/youtubeplayer/Content"

import { useYoutubeData } from "../providers/YoutubeProvider";

export default function YoutubePage() {

    const {media} = useYoutubeData();
    const OpenInBrowser = () => {
        if (media.url !== "") {
        window.open(media.url, "_blank");
        }
    }

    return (
        <>
            <Row className="player-holder">
                <YoutubePlayer />
            </Row>
            <Row className="spacer">
            </Row>
            <Row className="url-holder">
                    <UrlInput />
            </Row>
            <Row>
                <Container className="pop-holder">
                    <Button className="pop-open" size="sm" variant="custom" onClick={OpenInBrowser}>
                        <MdOutlineOpenInNew />
                        {"  Open in browser"}
                    </Button>
                </Container>
            </Row>
            <Row className="content-holder">
                <YoutubeContent />
            </Row>
        </>
    );
}
