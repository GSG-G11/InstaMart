import React, { useEffect, useState } from 'react';
import Header from '../Components/header/Header';
import ProductDetails from '../Components/productdetails/ProductDetails';

function ProductDetailsPage() {
  const [cartitems, setCartitems] = useState([]);

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
      <ProductDetails cartitems={cartitems} addToCartLS={addToCartLS} />
    </div>
  );
}

export default ProductDetailsPage;
