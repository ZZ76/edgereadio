import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import StationList from "./components/StationList.js";
import NavbarCustom from './components/Navbar.js';

import { Routes, Route } from "react-router-dom";

import {
  Radio,
  Youtube,
  Whoops404
} from "./pages/Pages";

function App() {

  return (
    <div data-bs-theme="dark" className="App">
      <div id="navbar-holder">
        <NavbarCustom/>
      </div>

      <div style={{"height": "100%", "width": "100%"}}>
        <Container className="text-bg-dark" style={{"height": "100%", "maxWidth": "100%"}}>
          <Routes>
            <Route path="/" element={<Radio />} />
            <Route path="/radio" element={<Radio />} />
            <Route path="/youtube" element={<Youtube />} />
            <Route path="*" element={<Whoops404 />} />
          </Routes>
        </Container>
      </div>
    </div>
  );
}

export default App;
