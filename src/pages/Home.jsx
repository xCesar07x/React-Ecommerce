import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Collapse, Offcanvas, Form, InputGroup, Row, Nav } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { filterProductsCategoryThunk, filterProductsTitle, getProductsThunk } from '../store/slices/products.slice';

const Home = () => {

    const dispatch = useDispatch();

    const productsList = useSelector(state => state.products);

    const [categories, setCategories] = useState([]);

    const [productsSearch, setProductsSearch] = useState("");

    const navigate = useNavigate();



    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    useEffect(() => {
        dispatch(getProductsThunk());

        axios.get('https://e-commerce-api-v2.academlo.tech/api/v1/categories')
            .then(res => setCategories(res.data));
    }, [])

    // console.log(categories)

    const [open, setOpen] = useState(true);

    return (
        <div className='home-container-main'>

            <Row>
                <Col lg={3} >
                    {/*INPUT-CATEGORY*/}

                    <div className='home-conatiner-price-category' >


                        <div >
                            <>
                                <Button style={{ width: "150px" }}
                                    onClick={() => setOpen(!open)}
                                    aria-controls="example-collapse-text"
                                    aria-expanded={open}
                                >
                                    Category
                                </Button>
                                <Collapse style={{ width: "150px" }}
                                    in={open}>
                                    <div id="example-collapse-text">
                                        {
                                            categories.map(category => (
                                                <Button style={{ width: "150px" }}
                                                    key={category.id} onClick={() => dispatch(filterProductsCategoryThunk(category.id))}>
                                                    {category.name}
                                                </Button>
                                            ))
                                        }
                                    </div>
                                </Collapse>
                            </>
                        </div>

                    </div>
                </Col>
                <Col lg={9}>
                    {/*PRODUCTS*/}

                    <InputGroup className="mb-3">
                        <Form.Control className='home-input'
                            placeholder="Search product"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            value={productsSearch}
                            onChange={(e) => setProductsSearch(e.target.value)}
                        />
                        <Button className='home-button'
                            onClick={() => dispatch(filterProductsTitle(productsSearch))}
                            variant="outline-primary"
                            id="button-addon2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16"> <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" /> </svg>
                        </Button>
                    </InputGroup>

                    {/*FILTERS*/}


                    <h1 className='filters-container'
                        onClick={handleShow}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-filter" viewBox="0 0 16 16"> <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" /> </svg>
                        filters
                    </h1>
                    <Offcanvas placement='end' show={show} onHide={handleClose}>

                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title >Filters</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body className='category-container'>
                            <Button style={{ width: "150px" }}
                                onClick={() => setOpen(!open)}
                                aria-controls="example-collapse-text"
                                aria-expanded={open}
                            >
                                Category
                            </Button>
                            <Collapse style={{ width: "150px" }}
                                in={open}>
                                <div id="example-collapse-text">
                                    {
                                        categories.map(category => (
                                            <div key={category.id} onClick={handleClose}>
                                                <Button style={{ width: "150px" }}
                                                     onClick={() => dispatch(filterProductsCategoryThunk(category.id))}>
                                                    {category.name}
                                                </Button>
                                            </div>

                                        ))
                                    }
                                </div>
                            </Collapse>
                        </Offcanvas.Body>
                    </Offcanvas>




                    <div className='home-products-list' >

                        <Row xs={1} md={2} lg={3} className="g-4">

                            {productsList.map(product => (

                                <Col key={product.id} onClick={() => navigate(`/products/${product.id}`)} >
                                    <Card>
                                        <Card.Img
                                            variant="top"
                                            src={product.images[0].url}
                                            style={{ height: "200px", objectFit: "contain", padding: "1rem" }}
                                        />
                                        <Card.Body style={{ height: "250px" }}>
                                            <Card.Text style={{
                                                textTransform: "none",
                                                letterSpacing: "1px",
                                                fontSize: "1.1rem",
                                                color: "darkgray",
                                            }}>
                                                {product.brand}
                                            </Card.Text>
                                            <Card.Title style={{
                                                textTransform: "none",
                                                letterSpacing: "1px",
                                                fontFamily: "system-ui",
                                            }}>
                                                {product.title}
                                            </Card.Title>

                                            <Card.Text style={{
                                                textTransform: "none",
                                                letterSpacing: "1px",
                                                fontSize: "1.1rem",
                                                color: "darkgray",
                                            }}>
                                                Price
                                            </Card.Text>
                                            <div className='products-price-cart'>
                                                <Card.Title style={{
                                                    textTransform: "none",
                                                    letterSpacing: "1px",
                                                    fontFamily: "system-ui",
                                                    fontWeight: "bold"
                                                }}>
                                                    $ {product.price}
                                                </Card.Title>

                                                <Button style={{ borderRadius: "5%" }} variant="primary">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="whitesmoke" className="bi bi-cart" viewBox="0 0 16 16"> <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" /> </svg>
                                                </Button>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>

                    </div>
                </Col>
            </Row>
        </div>
    );
};



export default Home;