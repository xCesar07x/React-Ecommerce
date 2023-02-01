import React, { useState } from 'react';
import { Container, Nav, Navbar, NavDropdown, Offcanvas } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Cart from './Cart';

const AppNavbar = () => {

    const navigate = useNavigate();

    const [show, setShow] = useState(false);
    

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    

    const logout = () => {
        localStorage.setItem("token", "")
        navigate("/login")
    }
    return (
        <>
            <Navbar  fixed='top' bg="dark" expand="md" variant='dark'>
                <Container>
                    <Navbar.Brand  as={Link} to='/'>e-commerce</Navbar.Brand>
                    <Navbar.Toggle   aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to='/login'>Login</Nav.Link>
                            {/* <Nav.Link as={Link} to='/'>Home</Nav.Link> */}
                            <Nav.Link as={Link} to='/purchases'>Purchses</Nav.Link>

                            <Nav.Link onClick={handleShow} to='/cart'>Cart</Nav.Link>

                            <Nav.Link onClick={logout}>Log out</Nav.Link>

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Cart show={show} handleClose={handleClose}/>
            
        </>


    );
};

export default AppNavbar;