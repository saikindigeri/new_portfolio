
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/Header';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart, res } = useAppContext();
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showRes, setShowRes] = useState(false);



  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://claw-ass.onrender.com/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (res) {
      setShowRes(true);
      const timer = setTimeout(() => {
        setShowRes(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [res]);

  const handleAddToCart = async () => {
    setLoading(true);
    await addToCart(id, quantity);
    setLoading(false);
  };

  if (!product) return <p>Loading...</p>; 



  return (

    <>
    <Header/>

    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <img src={product.image_url} alt={product.name} className="img-fluid rounded shadow-sm" />
        </div>
        <div className="col-md-6">
          <h1 className="product-title">{product.name}</h1>
          <p className="product-description">{product.description}</p>
          <h3 className="product-price">Rs. {product.price.toFixed(2)}</h3>
          <div className="d-flex align-items-center my-3">
            <button 
              className="btn btn-secondary me-2" 
              onClick={() => setQuantity(quantity - 1)} 
              disabled={quantity <= 1}
            >
              -
            </button>
            <span className="fs-4">{quantity}</span>
            <button 
              className="btn btn-secondary ms-2" 
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
          </div>
          <button 
            className="btn btn-primary mt-3" 
            onClick={handleAddToCart}
            disabled={loading}
          >
            {loading ? (
              <span>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Adding...
              </span>
            ) : (
              'Add to Cart'
            )}
          </button>
          {showRes && (
            <div className="alert alert-info mt-3 fade-out" role="alert">
              {res}
            </div>
          )}
        </div>
      </div>
    </div>
    </>

  );
};

export default ProductDetails;
