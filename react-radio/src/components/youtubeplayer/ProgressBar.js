import React, { useEffect, useState, useRef } from "react";
import './youtubeplayer.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useYoutubeData } from "../../providers/YoutubeProvider";

export default function ProgressBar() {
    const YOUTUBE_ENDPOINT = process.env.REACT_APP_YOUTUBE_ENDPOINT
    const {media, player} = useYoutubeData();
    const [tempPosition, setTempPosition] = useState(0);
    const [barLock, setBarLock] = useState(false);
    const [currentTime, setCurrentTime] = useState(false);
    const [durationTextWidth, setDurationTextWidth] = useState(5);
    const durationColRef = useRef(null);

    useEffect(() => {
        if (barLock === false) {
            setTempPosition(player.position*100);
            setCurrentTime(secondsToHms(player.current_time/1000));
        }
        if (player.position === undefined) {
            setTempPosition(0);
        }
    }, [player.position])

    useEffect(() => {
        adjustText();
        window.addEventListener("resize", adjustText);
        return () => window.removeEventListener("resize", adjustText);
    }, [])

    const adjustText = () => {
        var canvas =  document.createElement("canvas");
        var context = canvas.getContext("2d");
        var {width} = context.measureText(secondsToHms(media.duration));
        if (width > durationColRef.current.clientWidth) {
            //console.log("text:" + width);
            //console.log("Col:" + durationColRef.current.clientWidth);
            setDurationTextWidth(2*Math.floor((durationColRef.current.clientWidth - width)/2));
        } else {
            setDurationTextWidth(0);
        }
    }

    const checkColon = (d) => {
        var c = d > 0 ? ":" : "";
        return c
    }

    const secondsToHms = (d) => {
        if (d === null || d < 0) {
            return "00:00"
        }
        d = Number(d);
        var h = Math.floor(d / 3600);
        var m = Math.floor(d % 3600 / 60);
        var s = Math.floor(d % 3600 % 60);

        var hDisplay = h > 0 ? String(h).padStart(2, "0") : "";
        var mDisplay = String(m).padStart(2, "0");
        var sDisplay = String(s).padStart(2, "0");
        return hDisplay  + checkColon(h) +  mDisplay + ":" + sDisplay;
    }

    const updatePosition = (p) => {
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({position: parseFloat(p/100)})
        };

        fetch(`${YOUTUBE_ENDPOINT}/set-position`, requestOptions)
            .then()
            .catch(error => {
                console.log(error);
            })
          .finally(() => {})
    }

    const updateCurrentTime = (p) => {
        if (barLock === true) {
            setCurrentTime(secondsToHms(media.duration * p/100));
        }
    }

    const setPositionAndCurrentTime = (p) => {
        setTempPosition(p);
        updateCurrentTime(p);
    }

    const onMouseDown_ = () => {
        setBarLock(true);
    }

    const onMouseUp_ = (p) => {
        setBarLock(false);
        updatePosition(p);
    }

    return (
        <>
            <input type="range"
                   id="position-range"
                   className="align-middle"
                   value={tempPosition}
                   onInput={e => setPositionAndCurrentTime(e.target.value)}
                   onMouseDown={onMouseDown_}
                   onMouseUp={e => onMouseUp_(e.target.value)}
                   onTouchStart={onMouseDown_}
                   onTouchEnd={e => onMouseUp_(e.target.value)}
                   style={{"background":"linear-gradient(to right, #00FA9A 0%, #00FA9A " + tempPosition + "%, #2b3035 " + tempPosition + "%, #2b3035 100%)"}}
                   min="0"
                   max="100"
                   step="0.1"/>
            <Row>
                <Col xs={1} style={{"padding": "0"}}>{currentTime}</Col>
                <Col></Col>
                <Col style={{padding: "0"}} ref={durationColRef} xs={1}>
                    <p style={{marginLeft: durationTextWidth, padding: "0"}}>
                        {secondsToHms(media.duration)}
                    </p>
                </Col>
            </Row>
        </>
    )
}
