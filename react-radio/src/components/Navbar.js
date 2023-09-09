import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FaRadio } from "react-icons/fa6";

export default function NavbarCustom({
    show,
    setShow = f => f
}) {

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          {/*<Button variant="dark" onClick={handleClose}>Btn</Button>*/}
          <Navbar.Brand href="#home" className="d-inline-block align-middle">
            <FaRadio className="d-inline-block align-top brand-icon"/>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
      {/*<Nav.Link href="#setting">Setting</Nav.Link>*/}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}
