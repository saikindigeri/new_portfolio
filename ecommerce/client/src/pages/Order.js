import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Orders.css';
import Header from '../components/Header';

const Orders = () => {
    const { orderItems, fetchOrders } = useAppContext();
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    useEffect(() => {
        const calculateTotalPrice = () => {
            if (Array.isArray(orderItems)) {
                const total = orderItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
                setTotalPrice(total);
            }
        };

        calculateTotalPrice();
    }, [orderItems]);

    return (
        <>
            <Header />
            <div className="container mt-5 orders-container">
                <h1 className="mb-4">My Orders</h1>
                {orderItems.length === 0 ? (
                    <p>No orders found.</p>
                ) : (
                    <div className="order-list">
                        {orderItems.map(order => (
                            <div className="order-item card mb-3" key={order.id}>
                                <div className="d-flex">
                                    <div className="order-info p-3">
                                        <h5 className="card-title">{order.title}</h5>
                                        <p className="card-text">Quantity: {order.quantity}</p>
                                        <p className="card-text">Price: Rs {order.price}</p>
                                    </div>
                                    <div className="order-image p-3">
                                        <img src={order.image_url} alt={order.title} className="img-thumbnail" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <h2 className="total-price">Total Price: Rs {totalPrice.toFixed(2)}</h2>
            </div>
        </>
    );
};

export default Orders;
