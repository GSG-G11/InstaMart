/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Button, TextField, Alert } from '@mui/material';
import CatProductsSlider from '../catProductsSlider';
import './style.css';

function ProductDetails({ addToCartLS }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [productCount, setProductCount] = useState(0);
  const [catID, setCatID] = useState(null);
  const [errorAlert, setErrorAlert] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`/api/v1/products/${id}`);
        const {
          category: { id: catId },
        } = result.data.data;
        setCatID(catId);
        setProduct(result.data.data);
      } catch (error) {
        setErrorAlert(true);
        setTimeout(() => setErrorAlert(false), 5000);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {product ? (
        <section className="product-details-section">
          <div className="product-details">
            <div className="product-img-section">
              <img
                className="image-product"
                src={product.imageUrl}
                alt={product.name}
              />
            </div>
            <div className="product-info">
              <div className="product-category">{product.category.name}</div>
              <div className="product-info-container">
                <div className="product-details-info">
                  {' '}
                  <p className="product-name">{product.name}</p>
                  <p className="product-price">{`$ ${product.price}`}</p>
                  <p className="product-details">{product.details}</p>
                </div>
                <div className="button-icons">
                  <TextField
                    className="product-count-input"
                    size="small"
                    id="outlined-number"
                    type="number"
                    value={productCount}
                    onChange={(e) => setProductCount(e.target.value)}
                  />
                  <Button
                    className="add-product-number"
                    onClick={() => addToCartLS(productCount, product)}
                  >
                    Add To Cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}
      {catID && <CatProductsSlider catID={catID} setErrorAlert={setErrorAlert} />}
      {errorAlert ? (
        <>
          {' '}
          <Alert severity="error" className="error-alert-message">
            Request failed
            {' '}
          </Alert>
        </>
      ) : null}
    </div>
  );
}
ProductDetails.propTypes = {
  addToCartLS: PropTypes.func.isRequired,
};

export default ProductDetails;
