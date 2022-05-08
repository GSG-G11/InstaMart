import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { CartProduct, TotalPrice } from '../../Components/Cart';

const useStyle = makeStyles({
  cardContainer: {
    display: 'flex',
    width: '100%',
    height: '90vh',
    justifyContent: 'space-around',
  },
});
function Cart() {
  const classes = useStyle();
  const [data, setData] = useState(JSON.parse(localStorage.getItem('product')) || []);
  return (
    <div className={classes.cardContainer}>

      <CartProduct data={data} setData={setData} />
      <TotalPrice data={data} />
    </div>
  );
}

export default Cart;
