/* eslint-disable no-unused-expressions */

import React from 'react';
import PropTypes from 'prop-types';
import { Card, Typography, Button } from '@mui/material/';
import { makeStyles } from '@mui/styles';

const useStyle = makeStyles({
  priceSpan: {
    color: '#3AB77D',

  },
  shippingSpan: {
    color: '#000',
  },
  cardContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '350px',
    height: '350px',

  },
  checkoutBtn: {
    color: 'white',
    width: '150',
  },
  typog: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
  },
});

function TotalPrice({ data }) {
  const classes = useStyle();

  return (
    <div className={classes.cardContainer}>

      <Card className={classes.card}>
        <Typography className={classes.typog} color="textSecondary">
          <span>Subtotal</span>
          {' '}

          <span className={classes.priceSpan}>
            {`$${data

              .reduce((previousValue, currentValue) => previousValue + +currentValue.price * currentValue.quantity, 0)}   `}

          </span>
          {' '}
        </Typography>
        <Typography className={classes.typog} color="textSecondary">
          <span>Shipping</span>
          {' '}
          <span className={classes.shippingSpan}>Free</span>
          {' '}
        </Typography>
        <Typography className={classes.typog} color="textSecondary">
          <span>Total</span>
          {' '}
          <span className={classes.priceSpan}>
            {`$${data

              .reduce((previousValue, currentValue) => previousValue + +currentValue.price * currentValue.quantity, 0)}   `}

          </span>
          {' '}
        </Typography>
        <Button
          className={classes.checkoutBtn}
          variant="contained"
          style={{ backgroundColor: '#3AB77D' }}
        >
          checkout

        </Button>
      </Card>
    </div>
  );
}

TotalPrice.propTypes = {

  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    imageUrl: PropTypes.string,
    price: PropTypes.string,
    quantity: PropTypes.number,
  })).isRequired,
};
export default TotalPrice;
