import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import { useYoutubeData } from "../providers/YoutubeProvider";
import PlayButtons from "./youtubeplayer/PlayButtons";
import ProgressBar from "./youtubeplayer/ProgressBar";
import VolumeBar from "./youtubeplayer/VolumeBar";
import "./youtubeplayer/youtubeplayer.css";

export default function RadioPlayer() {
    const {player, media} = useYoutubeData();

    useEffect(() => {
    }, [media.title, player.isplaying]);

    return (
        <>
            <Container className="youtube-player align-items-center justify-content-center">
                <Row style={{"height": "20px"}}>
                </Row>
                <Row style={{"height": "30px"}}>
                    <p className="youtube-title">
                        {player.isplaying ?
                         <span style={{"fontWeight":"bold"}} className="green">NOW PLAYING &nbsp;&nbsp;&nbsp;</span>
                         :
                         <></>
                        }
                        {media.title}
                    </p>
                </Row>
                <Row style={{"height": "60px"}} className="align-items-center justify-content-center">
                    <ProgressBar />
                </Row>
                <Row style={{"height": "80px", "maxWidth": "900px"}} className="align-items-center justify-content-center">
                        <PlayButtons />
                </Row>
                <Row style={{"height": "80px"}} className="align-items-center justify-content-center">
                    <VolumeBar />
                </Row>
            </Container>
        </>
    )
}
