import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FaRadio } from "react-icons/fa6";
import { LinkContainer } from "react-router-bootstrap";
import "./components.css";

export default function NavbarCustom({
    show,
    setShow = f => f
}) {

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container id="navbar-container">
          {/*<Button variant="dark" onClick={handleClose}>Btn</Button>*/}
          <LinkContainer to="/">
            <Navbar.Brand href="#home" className="d-inline-block align-middle">
              <FaRadio className="d-inline-block align-top brand-icon"/>
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to="/radio">
                <Nav.Link>Radio</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/youtube">
                <Nav.Link>Youtube</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}
