import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Carousel, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { filterProductsCategoryThunk } from '../store/slices/products.slice';

const ProductId = () => {

    const { id } = useParams();

    const [products, setProducts] = useState({});

    const productsList = useSelector(state => state.products)

    const productsFiltered = productsList.filter(products => products.id !== Number(id));

    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://e-commerce-api-v2.academlo.tech/api/v1/products/${id}`)
            .then(res => {
                setProducts(res.data)
                dispatch(filterProductsCategoryThunk(res.data.category.id))
            })
    }, [id])

    // console.log(products)

    return (
        <div className='productsId-conatiner-main '>


            <Row>
                <Col lg={6} className="mb-5" >
                    <Carousel className='productid-img-container'
                        variant='dark'
                        slide={true}>
                        <Carousel.Item>
                            <img className='productid-img'
                                src={products.images?.[0].url}
                                alt="First slide"
                            />
                            <Carousel.Caption>

                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img className='productid-img'
                                src={products.images?.[1].url}
                                alt="Second slide"
                            />

                            <Carousel.Caption>

                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img className='productid-img'
                                src={products.images?.[2].url}
                                alt="Third slide"
                            />
                            <Carousel.Caption>

                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </Col>

                <Col lg={6} className="mb-5">
                    <h2>
                        {products.brand}
                    </h2>

                    <h3>
                        {products.title}
                    </h3>
                    <p>
                        {products.description}
                    </p>
                    <h2>
                        Price
                    </h2>
                    <h3>
                        $ {products.price}
                    </h3>
                    <div >
                        <Button style={{ width: "100%", }} variant="primary">
                            
                                <p> Add to store</p>  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="whitesmoke" className="bi bi-cart" viewBox="0 0 16 16"> <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" /> </svg>
                            
                        </Button>
                    </div>

                </Col>
            </Row>
            <h4>Similar Products</h4>
            <Row xs={1} md={2} lg={3} className="g-5">
                {productsFiltered.map(product => (
                    <Col
                        onClick={() => navigate(`/products/${product.id}`)}
                        key={product.id}
                    >
                        <Card className='similar-products'>
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <Card.Img style={{ width: "250px", height: "250px", objectFit: "contain", }}
                                    variant="top"
                                    src={product.images[0].url}
                                />
                            </div>
                            <Card.Body>
                                <Card.Text>
                                    {product.brand}
                                </Card.Text>
                                <Card.Title>{product.title}</Card.Title>

                                <Card.Text>
                                    Price
                                </Card.Text>

                                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
                                    <Card.Text>
                                        $ {product.price}

                                    </Card.Text>
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
    );
};

export default ProductId;