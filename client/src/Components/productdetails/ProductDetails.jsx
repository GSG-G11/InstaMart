/* eslint-disable no-param-reassign */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import './index.css';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [productCount, setProductCount] = useState(0);
  const addToCartLS = () => {
    if (productCount) {
      const products = localStorage.getItem('cartItems');
      if (products) {
        const productsArray = JSON.parse(products);
        const currentProduct = productsArray.find(
          (productInArray) => productInArray.id === product.id,
        );
        if (currentProduct) {
          const newProducts = productsArray.map((item) => {
            if (item.id === product.id) {
              item.count += +productCount;
              return item;
            }
            return item;
          });
          localStorage.setItem('cartItems', JSON.stringify(newProducts));
        } else {
          const newProducts = [...productsArray, { ...product, count: +productCount }];
          localStorage.setItem('cartItems', JSON.stringify(newProducts));
        }
      } else {
        const newProducts = [{ ...product, count: +productCount }];
        localStorage.setItem('cartItems', JSON.stringify(newProducts));
      }
    }
  };

  useEffect(() => {
    axios
      .get(`/api/v1/products/${id}`)
      .then((result) => {
        setProduct(result.data.data);
      })
      .catch(console.log);
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
                    onClick={() => addToCartLS()}
                  >
                    Add To Cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}

export default ProductDetails;
