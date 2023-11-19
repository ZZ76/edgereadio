import React, { useEffect, useState } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useStationData } from "../providers/StationProvider";
import { FaVolumeMute, FaVolumeOff, FaVolumeDown, FaVolumeUp } from "react-icons/fa";

export default function VolumeBar() {
    const RADIO_ENDPOINT = process.env.REACT_APP_RADIO_ENDPOINT
    const {playingNow, currentStation} = useStationData();
    const [volume, setVolume] = useState(0)
    const [tempVolume, setTempVolume] = useState(0)
    const [barLock, setBarLock] = useState(false)

    useEffect(() => {
        if (barLock === false) {
            setTempVolume(currentStation.volume);
        }
        setVolume(currentStation.volume);
    }, [currentStation.volume])

    const updateVolume = (v) => {
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

    const mute = () => {
        setTempVolume(0);
        updateVolume(0);
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

    const onMouseDown_ = () => {
        setBarLock(true);
    }

    const onMouseUp_ = (v) => {
        setBarLock(false);
        console.log(v);
        updateVolume(v);
    }

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
                            value={tempVolume}
                            onInput={e => setTempVolume(e.target.value)}
                            onMouseDown={onMouseDown_}
                            onMouseUp={e => onMouseUp_(e.target.value)}
                            onTouchStart={onMouseDown_}
                            onTouchEnd={e => onMouseUp_(e.target.value)}
                            style={{"background":"linear-gradient(to right, #00FA9A 0%, #00FA9A " + tempVolume + "%, #2b3035 " + tempVolume + "%, #2b3035 100%)"}}
                            min="0"
                            max="100"
                            step="1"/>
                </Col>
            </Row>
        </>
    )
}
