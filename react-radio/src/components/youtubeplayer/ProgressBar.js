import React, { useEffect, useState } from "react";
import './youtubeplayer.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from "react-bootstrap/Container";
import { useYoutubeData } from "../../providers/YoutubeProvider";

export default function ProgressBar() {
    const YOUTUBE_ENDPOINT = process.env.REACT_APP_YOUTUBE_ENDPOINT
    const {media, player} = useYoutubeData();
    const [tempPosition, setTempPosition] = useState(0)
    const [barLock, setBarLock] = useState(false)

    useEffect(() => {
        if (barLock === false) {
            setTempPosition(player.position*100);
        }
        if (player.position === undefined) {
            setTempPosition(0);
        }
    }, [player.position])

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

    const onMouseDown_ = () => {
        setBarLock(true);
    }

    const onMouseUp_ = (p) => {
        setBarLock(false);
        updatePosition(p);
    }

    // onInput={e => updatePosition(e.target.value)}
    // onInput={e => setTempPosition(e.target.value)}
    return (
                <input type="range"
                       id="position-range"
                       className="align-middle"
                       value={tempPosition}
                       onInput={e => setTempPosition(e.target.value)}
                       onMouseDown={onMouseDown_}
                       onMouseUp={e => onMouseUp_(e.target.value)}
                       onTouchStart={onMouseDown_}
                       onTouchEnd={e => onMouseUp_(e.target.value)}
                       style={{"background":"linear-gradient(to right, #00FA9A 0%, #00FA9A " + tempPosition + "%, #2b3035 " + tempPosition + "%, #2b3035 100%)"}}
                       min="0"
                       max="100"
                       step="0.1"/>
    )
}
