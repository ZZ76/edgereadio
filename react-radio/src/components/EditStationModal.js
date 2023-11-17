import React, { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { FaCheck, FaTimes, FaTrash } from "react-icons/fa";

export default function EditStationModal({id, name, url, tags, showModal, setShowModal = f => f}) {
    const RADIO_ENDPOINT = process.env.REACT_APP_RADIO_ENDPOINT
    const [confirm, setConfirm] = useState(false);
    const titleRef = useRef();
    const urlRef = useRef();
    const tagsRef = useRef();

    const handleClose = () => {
        setConfirm(false);
        setShowModal(false);
    }

    const submit = () => {
        const requestOptions = {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                id: id,
                name: titleRef.current.value,
                url: urlRef.current.value,
                tags: tagsRef.current.value
            })
        };

        fetch(`${RADIO_ENDPOINT}/setting/update`, requestOptions)
            .then(handleClose)
            .catch(error => {
                console.log(error);
            })
            .finally()
    }

    const remove = () => {
        const requestOptions = {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({id: id})
        };

        fetch(`${RADIO_ENDPOINT}/setting/remove`, requestOptions)
            .then(handleClose)
            .catch(error => {
                console.log(error);
            })
          .finally(() => {})
    }

    const ModalFooter = () => {
        if (confirm === true) {
            return (
                <>
                    <Button variant="dark" onClick={()=>setConfirm(false)}>
                        <FaTimes className="d-inline-block brand-icon"/>
                    </Button>
                    <Col>
                    </Col>
                    <Col className="border-0 col-auto">
                        Delete?
                    </Col>
                    <Col>
                    </Col>
                    <Button variant="dark" onClick={remove}>
                        <FaCheck className="d-inline-block brand-icon"/>
                    </Button>
                </>
            )} else {
                return (
                    <>
                        <Button variant="dark" onClick={()=>setConfirm(true)}>
                            <FaTrash className="d-inline-block brand-icon red"/>
                        </Button>
                        <Col></Col>
                        <Button variant="dark"
                                onClick={submit}>
                            <FaCheck className="d-inline-block brand-icon green"/>
                        </Button>
                        <Button variant="dark" onClick={handleClose}>
                            <FaTimes className="d-inline-block brand-icon"/>
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
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header
                    className="custom-modal"
                    data-bs-theme="dark" closeButton>
                    <Modal.Title>Edit Station</Modal.Title>
                </Modal.Header>
                <Modal.Body
                    className="custom-modal"
                    variant="dark"
                    >
                    <Container variant="dark" data-bs-theme="dark">
                    <Row>
                        <Form.Label>Title</Form.Label>
                        <Form.Control ref={titleRef} type="text" placeholder="Title" defaultValue={name}/>
                    </Row>
                    <Row>
                        <Form.Label>Tags</Form.Label>
                        <Form.Control ref={tagsRef} type="text" placeholder="tags"  defaultValue={tags}/>
                    </Row>
                    <Row>
                        <Form.Label>Url</Form.Label>
                        <Form.Control ref={urlRef} type="text" placeholder="url" defaultValue={url}/>
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
