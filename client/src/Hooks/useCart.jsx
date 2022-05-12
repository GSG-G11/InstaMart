import React, {
  createContext, useContext, useEffect, useMemo, useState,
} from 'react';
import PropTypes from 'prop-types';

export const CartContext = createContext();

export function CartProvider({ children }) {
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

  const CartItems = () => {
    const cartitemsArr = localStorage.getItem('cartItems');
    if (cartitemsArr) {
      setCartitems(JSON.parse(cartitemsArr));
    }
  };

  useEffect(() => {
    CartItems();
  }, []);

  const value = useMemo(() => ({
    cartitems,
    addToCartLS,
  }), [cartitems]);
  console.log(value);
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

CartProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export const useCart = () => useContext(CartContext);
