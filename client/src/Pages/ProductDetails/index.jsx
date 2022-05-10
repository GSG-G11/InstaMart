import React, { useEffect, useState } from 'react';
import { Alert } from '@mui/material';
import { Header, ProductDetails, Footer } from '../../Components';
import './style.css';

function ProductDetailsPage() {
  const [cartitems, setCartitems] = useState([]);
  const [open, setOpen] = useState(false);

  const addToCartLS = (productCount, product) => {
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
              return { ...item, count: +productCount + item.count };
            }
            return item;
          });
          localStorage.setItem('cartItems', JSON.stringify(newProducts));
          setCartitems(newProducts);
        } else {
          const newProducts = [...productsArray, { ...product, count: +productCount }];
          setCartitems(newProducts);
          localStorage.setItem('cartItems', JSON.stringify(newProducts));
        }
      } else {
        const newProducts = [{ ...product, count: +productCount }];
        localStorage.setItem('cartItems', JSON.stringify(newProducts));
        setCartitems(newProducts);
      }
      setOpen(true);
      setTimeout(() => setOpen(false), 5000);
    }
  };

  useEffect(() => {
    const cartitemsArr = localStorage.getItem('cartItems');
    if (cartitemsArr) {
      setCartitems(JSON.parse(cartitemsArr));
    }
  }, []);

  return (
    <div>
      <Header cartitems={cartitems} />
      <div className="product-page-container">
        <ProductDetails cartitems={cartitems} addToCartLS={addToCartLS} />
        {open ? (
          <>
            {' '}
            <Alert severity="success" className="success-alert-message">
              Product was added successfully
            </Alert>
          </>
        ) : null}
      </div>
      <Footer />
    </div>
  );
}

export default ProductDetailsPage;
