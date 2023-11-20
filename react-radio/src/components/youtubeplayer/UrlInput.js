import React, { useEffect, useState, useRef } from "react";
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { FaEdit } from "react-icons/fa";

import { useYoutubeData } from "../../providers/YoutubeProvider";
import { FaCopy } from "react-icons/fa";
import UrlModal from "./UrlModal";
import copy from "copy-to-clipboard";

export default function UrlInput() {
    const {media} = useYoutubeData();
    const [url, setUrl] = useState("");
    const urlRef = useRef(null);
    const [showModal, setShowModal] = useState(false);

    const handleShow = () => setShowModal(true);

    useEffect(() => {
        setUrl(media.url);
    }, [media.url]);

    return (
        <>
            <Container className="url-input align-items-center justify-content-center">
                <Form>
                    <InputGroup>
                        <InputGroup.Text className="url-button-holder align-items-center justify-content-center">
                            <Button onClick={handleShow} size="sm" variant="custom">
                                <FaEdit className="url-button" />
                            </Button>
                        </InputGroup.Text>
                        <Form.Control placeholder={url} disabled size="sm"/>
                        <InputGroup.Text className="url-button-holder align-items-center justify-content-center">
                            <Button size="sm" variant="custom" onClick={() => copy(url)}>
                                <FaCopy className="url-button" />
                                {" Copy"}
                            </Button>
                        </InputGroup.Text>
                    </InputGroup>
                </Form>
            </Container>
            <UrlModal {...{url: "", defaultUrl: url, showModal:showModal, setShowModal:setShowModal}} />
        </>
    )
}
