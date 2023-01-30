import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AppNavbar = () => {
    return (
        <Navbar fixed='top' bg="dark" expand="md" variant='dark'>
            <Container>
                <Navbar.Brand >e-commerce</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to='/'>Home</Nav.Link>
                        <Nav.Link as={Link} to='/purchases'>Purchses</Nav.Link>
                        <Nav.Link as={Link} to='/cart'>Cart</Nav.Link>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    );
};

export default AppNavbar;