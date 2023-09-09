import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import StationList from "./components/StationList.js";
import NavbarCustom from './components/Navbar.js';

function App() {

  return (
    <div data-bs-theme="dark" className="App">
      <div>
        <NavbarCustom/>
      </div>
      <div style={{"height": "100%", "width": "100%"}}>
        <Container className="text-bg-dark" style={{"height": "100%", "maxWidth": "100%"}}>
          <Row>
            <Col xs={"auto"}>
            </Col>
            <StationList />
            <Col xs={"auto"}>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default App;
