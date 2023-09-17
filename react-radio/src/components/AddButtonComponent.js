import React, { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import { FaPlus, FaTimes, FaUpload } from "react-icons/fa";
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';

export default function AddButtonComponent() {
    const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT
    const titleRef = useRef();
    const urlRef = useRef();
    const tagsRef = useRef();
    const [editing, setEditing] = useState(false); // edit station info
    const [adding, setAdding] = useState(false); // adding in the backend

    const clear = () => {
        setEditing(false);
        setAdding(false);
    }

    const add = () => {
        setAdding(true);
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({name: titleRef.current.value,
                                  url: urlRef.current.value,
                                  tags: tagsRef.current.value})
        };

        fetch(`${API_ENDPOINT}/setting/add`, requestOptions)
            .then(r => {
                if (r.success) {
                    setEditing(false);
                }
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                setEditing(false);
                setAdding(false);
            })
    }

    const modal = () => {
        return (
        <>
            <Modal
                show={editing}
                onHide={()=>setEditing(false)}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header
                    className="custom-modal"
                    data-bs-theme="dark" closeButton>
                    <Modal.Title>Add Station</Modal.Title>
                </Modal.Header>
                <Modal.Body
                    className="custom-modal"
                    variant="dark"
                    >
                    <Container variant="dark" data-bs-theme="dark">
                    <Row>
                        <Form.Label>Title</Form.Label>
                        <Form.Control ref={titleRef} type="text" placeholder="Title"/>
                    </Row>
                    <Row>
                        <Form.Label>Tags</Form.Label>
                        <Form.Control ref={tagsRef} type="text" placeholder="tags"/>
                    </Row>
                    <Row>
                        <Form.Label>Url</Form.Label>
                        <Form.Control ref={urlRef} type="text" placeholder="url"/>
                    </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer
                    style={{"backgroundColor": "#212529"}}
                    className="custom-modal">
                    <Button variant="dark" onClick={add}>
                        <FaUpload className="d-inline-block brand-icon"/>
                    </Button>
                    <Button variant="dark" onClick={() => clear()}>
                        <FaTimes className="d-inline-block brand-icon"/>
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
        )
    }

    if (adding) {
        return (
            <>
                <Row>
                    <p>Adding station...</p>
                </Row>
                <Row>
                    <div>
                        <Spinner className="brand-icon" animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                </Row>
                <Row>
                    <br />
                </Row>
            </>
        )
    }

    return (
        <>
            <Row className="align-items-center">
                <Col className="border-0">
                    <Button variant="dark" onClick={() => setEditing(true)}>
                        <FaPlus className="d-inline-block brand-icon"/>
                    </Button>
                </Col>
            </Row>
            <Row>
                <br />
            </Row>
            {modal()}
        </>
    )

}
