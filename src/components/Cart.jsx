import React, { useEffect, useState } from 'react';
import { Button, Offcanvas } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCartThunk, purchasesCardThunk } from '../store/slices/cart.slice';

const Cart = ({ show, handleClose }) => {

    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCartThunk());
    }, [])

    // console.log(cart);

    // const [addCart,setAddCart] = useState()


    // const decrement = () => {
    //     if( addCart > 1 ){
    //         setAddCart(addCart - 1)
    //     }
    // }

    // const increment = () => {
    //     setAddCart(addCart + 1)
    // }

    return (
        <div>
            <Offcanvas placement='end' show={show} onHide={handleClose} >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }} className='pt-2 pb-2 me-2'>
                    {
                        cart.map(cart => (
                            <div
                                key={cart.id}>
                                <Link className='cart-link' onClick={handleClose} to={`/products/${cart.product.id}`}>
                                    <img className='cart-img'
                                        src={cart.product.images[0].url} alt=""
                                    />
                                    <div >
                                        <h6 className='cart-title'>
                                            {cart.product.title}

                                        </h6>
                                        <div>
                                            <p style={{textAlign: "center"}}>
                                                {cart.quantity}
                                            </p>
                                        </div>

                                        {/* <div>
                                            <button onClick={decrement}
                                            >-</button>
                                            <input style={{ width: "50px", textAlign: "center" }}
                                                type="number" value={addCart} onChange={e => setAddCart(e.target.value)}
                                            />
                                            <button onClick={increment}
                                            >+</button>


                                        </div> */}

                                    </div>


                                </Link>
                            </div>
                        ))
                    }

                </Offcanvas.Body>
                <Button onClick={() => dispatch(purchasesCardThunk())} >
                    Chekout
                </Button>
            </Offcanvas>
        </div>



    );
};

export default Cart;