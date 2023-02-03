import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPurchasesThunk } from '../store/slices/purchases.slice'


const Purchases = () => {

    const purchases = useSelector(state => state.purchases);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPurchasesThunk());
    }, [])


    // console.log(purchases)

    let quantity = new Date(purchases[0]?.product.createdAt);

    const convertion = quantity.toLocaleDateString()

    // console.log(convertion)

    return (
        <div style={{ paddingTop: "3.5rem" }}>
            <h1>My purchases</h1>
            <ul className='purchases-list-container'>
                {
                    purchases.map(purchase => (
                        <li className='purchases-list'
                            key={purchase.id}>
                            <Link className='purchases-link' to={`/products/${purchase.product?.id}`}>
                                <img className='purchases-img'
                                    src={purchase.product?.images[0].url} alt=""
                                />
                                <div className='purchases-title' >{purchase.product?.title}</div>
                                <div className='purchases-convertion' >{convertion}</div>
                                <div className='purchases-quantity' >{purchase.quantity}</div>
                                <div className='purchases-price' >$ {purchase.product?.price}</div>
                            </Link>
                        </li>
                    ))
                }
            </ul>

        </div>
    );
};

export default Purchases;