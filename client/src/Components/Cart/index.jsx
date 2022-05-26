import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  styled,
  Rating,
  Typography,
  Button,
  Alert,
} from '@mui/material';
import axios from 'axios';
import { Delete } from '@mui/icons-material';
import { useCart } from '../../Hooks/useCart';
import './style.css';
import CheckoutModal from '../checkoutModal';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.action.hover,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function CartDetails() {
  const { cartitems, addToCartLS, deleteFromLS } = useCart();
  const [open, setOpen] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [succcessAlert, setSucccessAlert] = useState(false);
  const [userBalance, getUserBalance] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('/api/v1/balance');
        const { data } = result.data;
        getUserBalance(data[0].balance);
      } catch (error) {
        setErrorAlert(true);
        setTimeout(() => setErrorAlert(false), 5000);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="cart-container">
      <div className="cart-title-number-section">
        <Typography className="cart-title-section"> Your Cart</Typography>
        <Typography className="cart-items-number-p">
          {' '}
          There are
          {' '}
          <span className="cart-items-number">
            {cartitems.reduce((pre, cur) => pre + cur.count, 0)}
          </span>
          {' '}
          product in your cart
        </Typography>
      </div>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell className="table-raw-title" align="left">
                Product
              </StyledTableCell>
              <StyledTableCell className="table-raw-title" align="center">
                {' '}
                Unit Price
              </StyledTableCell>
              <StyledTableCell className="table-raw-title" align="center">
                Quantity
              </StyledTableCell>
              <StyledTableCell className="table-raw-title" align="center">
                Subtotal
              </StyledTableCell>
              <StyledTableCell className="table-raw-title" align="center">
                Remove
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartitems.map((item) => (
              <StyledTableRow key={item.id}>
                <StyledTableCell align="center">
                  <div className="cart-item-name-image">
                    <img
                      className="cart-item-image"
                      src={item.imageUrl}
                      alt={item.name}
                    />
                    <div className="cart-item-name-rating">
                      <a
                        href={`/product/${item.id}`}
                        className="cart-item-name"
                      >
                        {item.name}
                      </a>
                      <Rating
                        name="read-only"
                        value={3.5}
                        precision={0.5}
                        readOnly
                        size="small"
                      />
                    </div>
                  </div>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <p className="cart-item-price">
                    $
                    {item.price}
                  </p>
                </StyledTableCell>

                <StyledTableCell align="center">
                  <TextField
                    className="product-count-input"
                    size="small"
                    id="outlined-number"
                    type="number"
                    defaultValue={item.count}
                    InputProps={{
                      inputProps: {
                        min: '0',
                        max: `${item.availableQuantity}`,
                        step: '1',
                      },
                    }}
                    onChange={(e) => addToCartLS(e.target.value - item.count, item)}
                  />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <p className="cart-item-total-price">
                    $
                    {+item.count * +item.price}
                  </p>
                </StyledTableCell>

                <StyledTableCell align="center" className="dashicon">
                  <div className="delete-item">
                    <Delete
                      onClick={() => deleteFromLS(item.id)}
                      color="error"
                    />
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="checkout-container">
        <div className="checkout-container-content">
          <Typography className="total-price">
            Your Balance :
            {' '}
            <span className="total-price-value">{`$${userBalance}`}</span>
            {' '}
          </Typography>
          <Typography className="total-price">
            Total Price:
            {' '}
            <span className="total-price-value">
              {`$${cartitems.reduce(
                (previousValue, currentValue) => (
                  previousValue + +currentValue.price * currentValue.count),
                0,
              )}   `}
            </span>
            {' '}
          </Typography>
          <Button
            type="primary"
            className="checkout-button"
            onClick={() => setOpen(true)}
          >
            Checkout
          </Button>
        </div>
      </div>
      <CheckoutModal
        open={open}
        setOpen={setOpen}
        setErrorAlert={setErrorAlert}
        setSucccessAlert={setSucccessAlert}
      />
      {errorAlert ? (
        <>
          {' '}
          <Alert severity="error" className="alert-message">
            Request failed
            {' '}
          </Alert>
        </>
      ) : null}
      {succcessAlert ? (
        <Alert severity="info" className="alert-message">
          Order Successfully send, we will replay soon
        </Alert>
      ) : null}
    </div>
  );
}

export default CartDetails;
