import React, { useEffect, useState } from 'react';
import { Button, Offcanvas } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCartThunk, purchasesCardThunk, updateCardThunk } from '../store/slices/cart.slice';
import ListCart from './ListCart';

const Cart = ({ show, handleClose }) => {

    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCartThunk());
        
    }, [])

    return (
        <div>
            <Offcanvas placement='end' show={show} onHide={handleClose} >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }} className='pt-2 pb-2 me-2'>
                    {
                        cart.map(cart => (
                            <ListCart key={cart.id} cart={cart}/>

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