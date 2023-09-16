import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import { useStationData } from "../StationProvider";
import { FaPlay, FaPause, FaVolumeOff } from "react-icons/fa";

export default function Player() {
    const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT
    const {playingNow, currentStation} = useStationData();
    const [hoverPlay, setHoverPlay] = useState(false)
    const [volume, setVolume] = useState(0)
    const [tempVolume, setTempVolume] = useState(0)

    useEffect(() => {
        setTempVolume(currentStation.volume);
        setVolume(currentStation.volume);
    }, [currentStation.volume])

    const play = () => {
        if (currentStation == undefined) {
            return
        }

        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({id: currentStation.id, title: currentStation.title, url: currentStation.url})
        };

        fetch(`${API_ENDPOINT}/play`, requestOptions)
            .then(r => {})
            .catch(error => {
                console.log(error);
            })
          .finally(() => {})
    }

    const stop = () => {
        fetch(`${API_ENDPOINT}/stop`)
            .then(r => {})
            .catch(error => {
                console.log(error);
            })
          .finally(() => {})
    }

    const updateVolume = (v) => {
        setTempVolume(v);
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({volume: v})
        };

        fetch(`${API_ENDPOINT}/set-volume`, requestOptions)
            .then(setVolume(v))
            .catch(error => {
                console.log(error);
            })
          .finally(() => {})
    }

    const Volume = () => {
        return (
            <>
                <Row className="flex-nowrap">
                    <Col xs={2}>
                        <FaVolumeOff/>
                    </Col>
                    <Col xs={10}>
                        <Form.Range className="align-middle"
                                    onInput={e => updateVolume(e.target.value)}
                                    value={volume}
                                    min="0"
                                    max="100"
                                    step="1"/>
                    </Col>
                </Row>
            </>
        )
    }

    return (
        <>
            <Container className="border-0 flex-nowrap align-items-center justify-content-center player" fluid="xs">
                <Row className="w-100 text-center flex-nowrap align-items-center justify-content-center">
                    <Col xs={0} sm={3}>
                    </Col>
                    <Col xs={2} sm={1}>
                        {playingNow.id != undefined ?
                         <Button variant="custom"
                                 className="align-middle"
                                 onMouseEnter={() => setHoverPlay(true)}
                                 onMouseLeave={() => setHoverPlay(false)}
                                 onClick={stop}>
                          {!hoverPlay ?
                           <FaPause className="player-playing"/>:
                           <FaPause className="player-paused"/>
                          }
                         </Button> :
                         <Button variant="custom"
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
                    </Col>
                    <Col xs={10} sm={5}>
                        <Row className="border-0 d-flex align-items-center justify-content-center">
                            {currentStation.title || "- -"}
                        </Row>
                        <Volume />
                    </Col>
                    <Col xs={0} sm={3}>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
