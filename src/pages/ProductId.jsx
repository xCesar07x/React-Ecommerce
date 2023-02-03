import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Carousel, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addCartThunk } from '../store/slices/cart.slice';
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
    window.scrollTo({
        top: 10,
        left: 0,
        behavior: 'smooth'
    });

    const [addCart, setAddCart] = useState(1)


    const addToCart = (quantity, productId) => {
        const cart = {
            quantity: quantity,
            productId: productId
        }
        dispatch(addCartThunk(cart))
    }

    const decrement = () => {
        if (addCart > 1) {
            setAddCart(addCart - 1)
        }
    }

    const increment = () => {
        setAddCart(addCart + 1)
    }


    return (
        <div className='productsId-conatiner-main '>

            <Row>
                <Col lg={5} className="mb-5" >
                    <Carousel className='productid-img-container'
                        variant='dark'
                        slide={true}>
                        <Carousel.Item>
                            <img className='productid-img'
                                src={products.images?.[0].url}
                                alt="First slide"
                            />

                            <Carousel.Caption >


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

                <Col lg={7} className="mb-5">
                    <h2 style={{
                        textTransform: "none",
                        letterSpacing: "1px",
                        fontSize: "1.1rem",
                        color: "darkgray",
                    }}>
                        {products.brand}
                    </h2>

                    <h3 style={{
                        textTransform: "none",
                        letterSpacing: "1px",
                        fontFamily: "system-ui",
                    }}>
                        {products.title}
                    </h3>
                    <p style={{
                        fontFamily: "system-ui",
                        fontSize: "medium",
                        fontWeight: "normal",
                    }}>
                        {products.description}
                    </p>


                    <div className='price-quantity-conatiner'>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <h2 style={{
                                textTransform: "none",
                                letterSpacing: "1px",
                                fontSize: "1.1rem",
                                color: "darkgray",
                                margin: "0"
                            }}>
                                Price
                            </h2>
                            <h3 style={{
                                textTransform: "none",
                                letterSpacing: "1px",
                                fontFamily: "system-ui",
                            }}>
                                $ {products.price}
                            </h3>
                        </div>
                        {/*QUANTITY*/}
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }} >
                            <p style={{
                                textTransform: "none",
                                letterSpacing: "1px",
                                fontSize: "1.1rem",
                                color: "darkgray",
                                margin: "0"
                            }}>
                                Quantity
                            </p>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <button onClick={decrement}
                                >-</button>
                                <input style={{ width: "50px", textAlign: "center" }}
                                    type="number" value={addCart} onChange={e => setAddCart(e.target.value)}
                                />
                                <button onClick={increment}
                                >+</button>
                            </div>

                        </div>
                    </div>


                    <div style={{ width: "100" }}>
                        <Button onClick={() => addToCart(addCart, products.id)} style={{ display: "flex", alignItems: "center", gap: "1rem", width: "100%", justifyContent: "center" }} variant="primary">

                            <p style={{ margin: "0" }}>
                                Add to store
                            </p>  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="whitesmoke" className="bi bi-cart" viewBox="0 0 16 16"> <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" /> </svg>

                        </Button>
                    </div>

                </Col>
            </Row>
            {/*SiMILAR PRODUCTS*/}
            <h4>Similar Products</h4>
            <Row xs={1} md={2} lg={3} className="g-5">
                {productsFiltered.map(product => (
                    <Col className='similar-products'

                        key={product.id}
                    >
                        <div>
                            <Card onClick={() => navigate(`/products/${product.id}`)}
                                style={{ height: "480px" }}>
                                <div style={{ display: "flex", justifyContent: "center" }}>
                                    <Card.Img style={{ width: "250px", height: "250px", objectFit: "contain", padding: "1rem" }}
                                        variant="top"
                                        src={product.images[0].url}
                                    />
                                </div>
                                <Card.Body>
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

                                    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
                                        <Card.Text style={{
                                            textTransform: "none",
                                            letterSpacing: "1px",
                                            fontFamily: "system-ui",
                                            fontWeight: "bold"
                                        }}>
                                            $ {product.price}

                                        </Card.Text>

                                    </div>

                                </Card.Body>
                            </Card>
                            <Button 
                                style={{ width: "100%" }} variant="primary" onClick={() => addToCart(1, product.id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="whitesmoke" className="bi bi-cart" viewBox="0 0 16 16"> <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" /> </svg>
                            </Button>
                        </div>

                    </Col>
                ))}
            </Row>


        </div >
    );
};

export default ProductId;