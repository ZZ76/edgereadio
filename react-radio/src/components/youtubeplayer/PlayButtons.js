import React, { useEffect, useState } from "react";
import './youtubeplayer.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from "react-bootstrap/Container";
import { useYoutubeData } from "../../providers/YoutubeProvider";
import Button from "react-bootstrap/Button";
import { FaPlay, FaPause, FaAngleLeft, FaAngleRight } from "react-icons/fa";

export default function ProgressBar() {
    const YOUTUBE_ENDPOINT = process.env.REACT_APP_YOUTUBE_ENDPOINT
    const {media, player} = useYoutubeData();
    const [position, setPosition] = useState(0)
    const [tempPosition, setTempPosition] = useState(0)
    const [barLock, setBarLock] = useState(false)

    const updatePosition = (p) => {
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({position: parseFloat(p/100)})
        };

        fetch(`${YOUTUBE_ENDPOINT}/set-position`, requestOptions)
            .then(setPosition(p))
            .catch(error => {
                console.log(error);
            })
          .finally(() => {})
    }

    const PlayorStop = () => {
        if (media.title === "") {
            return
        }

        if (player.isplaying === true) {
            fetch(`${YOUTUBE_ENDPOINT}/stop`)
                .then(r => {})
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {})
        } else {
            fetch(`${YOUTUBE_ENDPOINT}/play`)
                .then(r => {})
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {})
        }
    }

    const fast10 = () => {
        fetch(`${YOUTUBE_ENDPOINT}/fast10`)
            .then(r => {})
            .catch(error => {
                console.log(error);
            })
            .finally(() => {})
    }

    const back10 = () => {
        fetch(`${YOUTUBE_ENDPOINT}/back10`)
            .then(r => {})
            .catch(error => {
                console.log(error);
            })
            .finally(() => {})
    }

    const FastButton = ({children, onClick}) => {
        return (
            <Button
                variant="custom"
                size="lg"
                className="align-middle"
                onClick={onClick}
            >
                {children}
            </Button>
        )
    }

    const PlayButton = ({children}) => {
        return (
            <Button
                variant="custom"
                size="lg"
                className="align-middle"
                onClick={PlayorStop}
            >
                {player.isplaying ?
                        <FaPause className="youtube-button isplaying"/>
                 :
                        <FaPlay className="youtube-button"/>
                }
            </Button>
        )
    }

    return (
        <>
            <Row style={{"height": "60px", "width": "95%", "maxWidth": "900px"}}>
                <Col xs={0} sm={1}>
                </Col>
                <Col xs={4} sm={3}>
                    <FastButton onClick={back10}>
                        <FaAngleLeft
                            className="youtube-button"/>
                    </FastButton>
                </Col>
                <Col xs={4}>
                    <PlayButton>
                        <FaPlay
                            className="youtube-button"/>
                    </PlayButton>
                </Col>
                <Col xs={4} sm={3}>
                    <FastButton onClick={fast10}>
                        <FaAngleRight
                            className="youtube-button"/>
                    </FastButton>
                </Col>
                <Col xs={0} sm={1}>
                </Col>
            </Row>
        </>
    )
}
