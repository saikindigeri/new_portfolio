

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Header from '../components/Header';
import './ProductList.css'

const ProductsList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://claw-back.onrender.com/api/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    return (

        <>
        <Header/>
        <div className="container my-5">
            <h2 className="mb-4">Products List</h2>
            <div className="row">
                {products.map(product => (
                    <div className="col-md-4 mb-4" key={product.id}>
                        <div className="card">
                            <img 
                                src={product.image_url} 
                                className="card-img-top" 
                                alt={product.name}
                                style={{ objectFit: 'cover', height: '200px' }} // Ensure all images have the same height
                            />
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">Rs. {product.price}</p>
                                <Link to={`/products/${product.id}`} className="btn btn-primary">View Details</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </>
      
    );
};

export default ProductsList;
