import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import { useStationData } from "../providers/StationProvider";
import { FaPlay, FaPause } from "react-icons/fa";
import VolumeBar from "./radioplayer/VolumeBar";
import "./components.css";
import "./radioplayer/radioplayer.css";

export default function RadioPlayer() {
    const RADIO_ENDPOINT = process.env.REACT_APP_RADIO_ENDPOINT
    const {playingNow, currentStation} = useStationData();
    const [hoverPlay, setHoverPlay] = useState(false)

    const play = () => {
        if (currentStation === undefined) {
            return
        }

        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({id: currentStation.id, title: currentStation.title, url: currentStation.url})
        };

        fetch(`${RADIO_ENDPOINT}/play`, requestOptions)
            .then(r => {})
            .catch(error => {
                console.log(error);
            })
          .finally(() => {})
    }

    const stop = () => {
        fetch(`${RADIO_ENDPOINT}/stop`)
            .then(r => {})
            .catch(error => {
                console.log(error);
            })
          .finally(() => {})
    }

    const PlayButton = () => {
        return(
            <>
                {(playingNow.id !== undefined && playingNow.id !== null) ?
                 <Button variant="custom"
                         size="lg"
                         className="align-middle btn-lg"
                         onMouseEnter={() => setHoverPlay(true)}
                         onMouseLeave={() => setHoverPlay(false)}
                         onClick={stop}>
                     {!hoverPlay ?
                      <FaPause className="player-playing"/>:
                      <FaPause className="player-paused"/>
                     }
                 </Button> :
                 <Button variant="custom"
                         size="lg"
                         className="align-middle"
                         onMouseEnter={() => setHoverPlay(true)}
                         onMouseLeave={() => setHoverPlay(false)}
                         onClick={play}>
                     {!hoverPlay ?
                      <FaPlay className="player-paused"/> :
                      <FaPlay className="player-playing"/>
                     }
                 </Button>
                }
            </>
        )
    }


    return (
        <>
                <Row className="radio-player w-100 text-center flex-nowrap align-items-center justify-content-center">
                    <Col xs={0} sm={3}>
                    </Col>
                    <Col xs={12} sm={5}>
                        <Row>
                            <br />
                        </Row>
                        <Row style={{"paddingBottom": "10px"}}>
                            <Col xs={2}>
                                <PlayButton/>
                            </Col>
                            <Col xs={10}>
                                <Row>
                                    <p></p>
                                </Row>
                                <Row className="border-0 d-flex align-items-center justify-content-center">
                                    {currentStation.title || "- -"}
                                </Row>
                                <Row>
                                    <p></p>
                                </Row>
                            </Col>
                        </Row>
                        <Row  className="align-items-center justify-content-center">
                            <VolumeBar />
                        </Row>
                    </Col>
                    <Col xs={0} sm={3}>
                    </Col>
                </Row>
        </>
    )
}
