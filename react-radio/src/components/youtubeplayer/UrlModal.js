import React, { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { FaCheck, FaTimes } from "react-icons/fa";
import Spinner from 'react-bootstrap/Spinner';

export default function EditStationModal({url, defaultUrl, showModal, setShowModal = f => f}) {
    const YOUTUBE_ENDPOINT = process.env.REACT_APP_YOUTUBE_ENDPOINT
    const [confirm, setConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const urlRef = useRef();

    const handleClose = () => {
        setShowModal(false);
    }

    const submit = () => {
        setLoading(true);
        if (urlRef.current.value === "") {
            setLoading(false);
            handleClose();
        }
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                url: urlRef.current.value,
            })
        };

        fetch(`${YOUTUBE_ENDPOINT}/play`, requestOptions)
            .then()
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
                handleClose();
            })
    }

    const ModalFooter = () => {
        if (loading === true) {
            return (
                <>
                    <Spinner className="green" animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </>
            )
        } else {
            return (
                <>
                    <Button variant="dark" onClick={handleClose}>
                        <FaTimes className="d-inline-block brand-icon"/>
                    </Button>
                    <Col>
                    </Col>
                    <Button variant="dark" onClick={submit}>
                        <FaCheck className="d-inline-block brand-icon"/>
                    </Button>
                </>
            )
        }
    }

    return (
        <>
            <Modal
                show={showModal}
                onHide={handleClose}
                keyboard={false}
            >
                <Modal.Header
                    className="custom-modal"
                    data-bs-theme="dark" closeButton>
                    <Modal.Title>URL</Modal.Title>
                </Modal.Header>
                <Modal.Body
                    className="custom-modal"
                    variant="dark"
                >
                    <Container variant="dark" data-bs-theme="dark">
                        <Row>
                            <Form.Label></Form.Label>
                            <Form.Control autoFocus ref={urlRef} type="text" placeholder={"url"} defaultValue={url}/>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer
                    style={{"backgroundColor": "#212529"}}
                    className="custom-modal">
                    {ModalFooter()}
                </Modal.Footer>
            </Modal>
        </>
    );
}
