import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { FaPlay, FaPause, FaEdit } from "react-icons/fa";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useStationData } from "../StationProvider";
import EditStationModal from "./EditStationModal";

export default function Station({id, name, url, tags}) {
    const RADIO_ENDPOINT = process.env.REACT_APP_RADIO_ENDPOINT
    const {playingNow} = useStationData();
    const [isShown, setIsShown] = useState(false)
    const [hoverPlay, setHoverPlay] = useState(false)
    const [showModal, setShowModal] = useState(false)

    const handleShow = () => setShowModal(true);

    //const modal = () => {
    //    return EditModal({id, name, url, tags})
    //}

    const play = () => {
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({id: id, title: name, url: url})
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

    const rowClass = () => {
        if (playingNow.id === id) {
            return "align-items-center station playing"
        } else {
            if (isShown === false) {
                return "align-items-center station"
            } else {
                return "align-items-center station hover"
            }
        }
    }

    const setting = () => {
        return (
            <>
                {isShown &&
                 <>
                     <Col className="border-0" xs={1}>
                         <Button variant="custom" onClick={handleShow}>
                             <FaEdit className="d-inline-block brand-icon"/>
                         </Button>
                     </Col>
                     <Col className="border-0" xs={"auto"} md={3}>
                     </Col>
                 </>
                }
            </>
        )
    }

    return (
        <>
            <Row className={rowClass()}
                 onMouseEnter={() => setIsShown(true)}
                 onMouseLeave={() => setIsShown(false)}>
                <Col xs={0} md={2}>
                </Col>
                <Col className="border-0" xs={2} md={1}>
                    {(isShown || playingNow.id === id) &&
                     (playingNow.id === id ?
                      <Button className="playing" variant="custom"
                              onClick={() => stop()}
                              onMouseEnter={() => setHoverPlay(true)}
                              onMouseLeave={() => setHoverPlay(false)}>
                          {!hoverPlay ?
                          <FaPlay className="playing"/> :
                           <FaPause/>}
                     </Button> :
                     <Button  variant="custom" onClick={() => play()}>
                          <FaPlay />
                     </Button>
                     )
                    }
                </Col>
                <Col className="border-0 text-truncate" xs={5} md={3} title={name}>
                    {name}
                </Col>
                <Col className="border-0 text-truncate" xs={2} md={3} title={tags}>
                    {tags}
                </Col>
                {setting()}
            </Row>

            <EditStationModal {...{id:id, name:name, url:url, tags:tags, showModal:showModal, setShowModal:setShowModal}} />
        </>
    )
}
