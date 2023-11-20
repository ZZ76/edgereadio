import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

import { useYoutubeData } from "../../providers/YoutubeProvider";
import "./youtubeplayer.css";

export default function YoutubeContent() {
    const {media} = useYoutubeData();

    useEffect(() => {
    }, [media]);

    return (
        <>
            <Container className="youtube-content align-items-center justify-content-center">
                <Row>
                    <h5>
                        {media.title}
                    </h5>
                </Row>
                <Row className="youtube-thumbnail">
                    <Image src={media.thumbnail} fluid/>
                </Row>
                <Row>
                    <p className="content-description">
                        {media.description}
                    </p>
                </Row>
            </Container>
        </>
    )
}
