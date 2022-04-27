import React from 'react';
import PropTypes from 'prop-types';
import { Typography, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DeleteIcon from '@mui/icons-material/Delete';

const fakeData = [{
  id: 1,
  name: 'Cola',
  imageUrl: 'https://images.unsplash.com/photo-1600952841320-db92ec4047ca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGNoaXBzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
  price: '20',

  quantity: 3,

}, {
  id: 2,
  name: 'chips',
  imageUrl: 'https://images.unsplash.com/photo-1600952841320-db92ec4047ca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGNoaXBzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
  price: '40',

  quantity: 1,

}];
localStorage.setItem('product', JSON.stringify(fakeData));
const useStyle = makeStyles({
  header: {
    padding: '10px',
    margin: '30px',
  },
  productContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '60%',
    margin: '5px',
  },
  productNo: {
    color: '#3AB77D',

  },
  card: {

    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
  },

  itemContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: '5px',

  },
  spanBorder: {
    height: '1px',
    background: '#7e7e7e70',
    marginTop: '10px',

  },
  productImg: {
    height: '100px',
    width: '100px',
    borderRadius: '10px',

  },
  btnBox: {
    border: '1px solid green',
    display: 'flex',
    borderRadius: '8px',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90px',
    height: '55px',
  },
  productCounter: {
    color: ' green',
    padding: '10px',
    fontSize: '20px',
  },
  btnCounterContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  totalPrice: {
    color: '#3AB77D',
  },

});

function CartProduct({ data, setData }) {
  const classes = useStyle();

  const increaseQnt = (item) => {
    const result = data.map((el) => (el.id === item.id
      ? { ...item, quantity: item.quantity + 1 } : el));
    localStorage.setItem('product', JSON.stringify(result));
    setData(result);
  };
  const decreaseQnt = (item) => {
    if (item.quantity > 1) {
      const result = data.map((el) => (el.id === item.id
        ? { ...item, quantity: item.quantity - 1 } : el));
      localStorage.setItem('product', JSON.stringify(result));
      setData(result);
    }
  };

  const deleteProduct = (item) => {
    const result = data.filter((el) => (el.id !== item.id
    ));
    localStorage.setItem('product', JSON.stringify(result));
    setData(result);
  };
  return (
    <div className={classes.productContainer}>
      <div className={classes.header}>
        <Typography component="h1" style={{ fontSize: '30px' }}> Your Cart</Typography>
        <Typography component="h3" color="textSecondary">
          {' '}
          there are
          {' '}
          <span className={classes.productNo}>
            {data.reduce((pre, cur) => pre + cur.quantity, 0)}

          </span>
          {' '}
          product in your cart
        </Typography>

      </div>
      {data.map((item) => (
        <div className={classes.card} key={item.id}>
          <div className={classes.itemContainer}>

            <img className={classes.productImg} src={item.imageUrl} alt="productImg" />
            <Typography component="h4">{item.name}</Typography>
            <Typography component="h4" color="textSecondary">
              {' '}
              {`$${item.price}`}
            </Typography>

            <div className={classes.btnBox}>
              <span className={classes.productCounter}>{item.quantity}</span>

              <div className={classes.btnCounterContainer}>
                <IconButton onClick={() => increaseQnt(item)}>
                  <KeyboardArrowUpIcon color="success" />
                </IconButton>
                <IconButton>
                  <KeyboardArrowDownIcon color="success" onClick={() => decreaseQnt(item)} />
                </IconButton>

              </div>
            </div>
            <Typography component="h4" className={classes.totalPrice}>
              {' '}
              {`$${item.price * item.quantity}`}
            </Typography>
            <IconButton onClick={() => deleteProduct(item)}>
              <DeleteIcon color="error" />
            </IconButton>
          </div>
          <span className={classes.spanBorder} />
        </div>
      ))}
    </div>
  );
}

CartProduct.propTypes = {
  setData: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    imageUrl: PropTypes.string,
    price: PropTypes.string,
    quantity: PropTypes.number,
  })).isRequired,
};
export default CartProduct;
