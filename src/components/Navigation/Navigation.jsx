import './Navigation.css'
import logo from '../../assets/logo.png'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom'
export const Navigation = () => {
  return (
    <Navbar expand="lg" className="nav-header" data-bs-theme="dark">
        <Container fluid>
            <Navbar.Brand href="#">
                <img className="brand-logo" src={logo} alt="KROK logo" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="justify-content-end flex-grow-1 pe-3 gap-3">
                    <Nav.Link as={NavLink} to="/"><i className="fa-regular fa-calendar-days"></i> Мій розклад</Nav.Link>
                    <Nav.Link as={NavLink} to="/settings"><i className="fa-solid fa-gear"></i> Налаштування</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}