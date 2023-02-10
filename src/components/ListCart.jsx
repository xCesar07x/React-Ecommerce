import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteCardThunk, updateCardThunk } from '../store/slices/cart.slice';

const ListCart = ({ cart, handleClose }) => {

    const dispatch = useDispatch()

    const decrement = (cart) => {
        if (cart.quantity > 1) {
            dispatch(updateCardThunk(cart.id, cart.quantity - 1))
        }
    }

    const increment = (cart) => {
        dispatch(updateCardThunk(cart.id, cart.quantity + 1))
    }

    console.log(cart)

    let counter = 0

    const productPrice = cart.product.price
    const cartQuantity = cart.quantity
    const totalQuantity = productPrice * cartQuantity

    return (
        <div className='cart-link-conatiner'>
            <div className='cart-link'>
                {/*BUTON PRODUCT-IMG */}
                <img className='cart-img'
                    src={cart.product?.images[0].url} alt=""
                />

                <div className='link-product-button' >

                    {/*LINK PRODUCT*/}
                    <Link style={{ textDecoration: "none" }} onClick={handleClose} to={`/products/${cart.product?.id}`}>

                        <div style={{ width: "150px", textAlign: "center" }}>
                            <h6 className='cart-title'>
                                {cart.product?.title}

                            </h6>
                        </div>

                    </Link>
                    {/*BUTON + / - */}
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <button className='button-sum-res'
                            onClick={() => decrement(cart)}
                        >-</button>

                        <div className='cart-quantity'
                        >
                            {cart.quantity}
                        </div>

                        <button className='button-sum-res'
                            onClick={() => increment(cart)}
                        >+</button>
                    </div>

                </div>

                {/*BUTON DELETE*/}

                <div >

                    <button
                        onClick={() => dispatch(deleteCardThunk(cart.id))}
                        style={{ border: "none", borderRadius: "5%", }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#f85555" className="bi bi-trash" viewBox="0 0 16 16"> <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" /> <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" /> </svg>
                    </button>

                </div>

            </div>
            <div style={{display: "flex", flexDirection: "row-reverse", fontFamily: "system-ui", fontWeight: "bolder"}} >
                Total ${totalQuantity}
            </div>
        </div>

    );
};

export default ListCart;