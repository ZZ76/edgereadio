import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import { useStationData } from "../StationProvider";
import { FaPlay, FaPause, FaVolumeMute, FaVolumeOff, FaVolumeDown, FaVolumeUp } from "react-icons/fa";

export default function Player() {
    const RADIO_ENDPOINT = process.env.REACT_APP_RADIO_ENDPOINT
    const {playingNow, currentStation} = useStationData();
    const [hoverPlay, setHoverPlay] = useState(false)
    const [volume, setVolume] = useState(0)
    const [tempVolume, setTempVolume] = useState(0)

    useEffect(() => {
        setTempVolume(currentStation.volume);
        setVolume(currentStation.volume);
    }, [currentStation.volume])

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

    const mute = () => {
        setTempVolume(0);
        updateVolume(0);
    }

    const updateVolume = (v) => {
        setTempVolume(v);
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({volume: v})
        };

        fetch(`${RADIO_ENDPOINT}/set-volume`, requestOptions)
            .then(setVolume(v))
            .catch(error => {
                console.log(error);
            })
          .finally(() => {})
    }

    const VolumeIcon = () => {
        { if (volume === 0) {
            return <FaVolumeMute className="red"/>
        } else if (volume <= 33) {
            return <FaVolumeOff/>
        } else if (volume > 33 && volume <= 66) {
            return <FaVolumeDown/>
        } else {
            return <FaVolumeUp/>
        }
        }
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

    const Volume = () => {
        return (
            <>
                <Row className="flex-nowrap">
                    <Col xs={2}>
                        <Button id="volume-button" variant="dark" onClick={mute} size="sm">
                            <VolumeIcon/>
                        </Button>
                    </Col>
                    <Col xs={10} style={{"position":"relative"}}>
                        <input type="range"
                               id="volume-range"
                               className="align-middle"
                               onInput={e => updateVolume(e.target.value)}
                               value={tempVolume}
                               style={{"background":"linear-gradient(to right, #00FA9A 0%, #00FA9A " + tempVolume + "%, #2b3035 " + tempVolume + "%, #2b3035 100%)"}}
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
            <Container className="border-0 flex-nowrap align-items-center justify-content-center" fluid="xs">
                <Row className="w-100 text-center flex-nowrap align-items-center justify-content-center player">
                    <Col xs={0} sm={3}>
                    </Col>
                    <Col xs={12} sm={5}>
                        <Row>
                            <p></p>
                        </Row>
                        <Row>
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
                        <Volume />
                    </Col>
                    <Col xs={0} sm={3}>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
