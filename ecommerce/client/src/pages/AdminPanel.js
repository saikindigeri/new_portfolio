
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './AdminPanel.css'; 
import Header from '../components/Header';

const API_URL = 'https://claw-ass.onrender.com/api/products'; 

const AdminPanel = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showMessage, setShowMessage] = useState(false); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setShowMessage(false);

        try {
            const response = await axios.post(API_URL, {
                name,
                description,
                price,
                stock,
                image_url: imageUrl
            });

            if (response.status === 201) {
                setSuccess('Product added successfully!');
                // Reset form fields
                setName('');
                setDescription('');
                setPrice('');
                setStock('');
                setImageUrl('');
            }
        } catch (error) {
            if (error.response) {
                setError(error.response.data.error || 'An error occurred');
            } else {
                setError('An error occurred');
            }
        } finally {
            setShowMessage(true);
        }
    };

    useEffect(() => {
        if (showMessage) {
            const timer = setTimeout(() => {
                setError('');
                setSuccess('');
                setShowMessage(false);
            }, 3000); // Hide message after 3 seconds

            return () => clearTimeout(timer);
        }
    }, [showMessage]);

    return (
        <>
          <Header/>
        <div className="container mt-5 admin-panel">
            <h2 className="mb-4">Add New Product</h2>
            <form onSubmit={handleSubmit} className="form">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Title:</label>
                    <input
                        type="text"
                        id="name"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description:</label>
                    <input
                        type="text"
                        id="description"
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Price:</label>
                    <input
                        type="number"
                        id="price"
                        className="form-control"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="stock" className="form-label">Stock:</label>
                    <input
                        type="number"
                        id="stock"
                        className="form-control"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="imageUrl" className="form-label">Image URL:</label>
                    <input
                        type="text"
                        id="imageUrl"
                        className="form-control"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Add Product</button>
            </form>
            {error && (
                <p className={`text-info mt-3 fade-out ${showMessage ? 'show' : ''}`}>{error}</p>
            )}
            {success && (
                <p className={`text-success mt-3 fade-out ${showMessage ? 'show' : ''}`}>{success}</p>
            )}
        </div></>
      
    );
};

export default AdminPanel;
