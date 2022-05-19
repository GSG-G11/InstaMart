import React, { useEffect, useState } from 'react';
import {
  Button, Modal, TextField,
} from '@mui/material';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useCart } from '../../Hooks/useCart';
import { useAuth } from '../../Hooks/useAuth';

import './style.css';

function CheckoutModal({
  open, setOpen, setErrorAlert, setSucccessAlert,
}) {
  const { cartitems, deleteCartFromLs } = useCart();
  const { user } = useAuth();

  const [values, setValues] = useState({
    address: '',
    mobile: '',
    paidAmount: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = ({ target: { name, value } }) => {
    setValues({ ...values, [name]: value });
  };

  useEffect(() => {
    setValues({
      address: '',
      mobile: '',
      paidAmount: 0,
    });
  }, [open]);
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .post('/api/v1/order', {
        date: new Date(),
        paidPrice: values.paidAmount,
        productArray: cartitems.map((item) => (
          { id: item.id, quantity: item.count })),
        isSupplied: false,
        mobile: values.mobile,
        address: values.address,
      })
      .then(() => {
        setIsLoading(false);
        setOpen(false);
        setSucccessAlert(true);
        setTimeout(() => setSucccessAlert(false), 5000);
        deleteCartFromLs();
      })
      .catch(() => {
        setIsLoading(false);
        setErrorAlert(true);
        setTimeout(() => setErrorAlert(false), 5000);
      });
  };
  return (
    <Modal open={open} variant="contained" className="checkout-form-modal" onClose={() => { setOpen(false); }}>
      <div className="modal-content">
        <button className="cancle-btn" type="submit" onClick={() => { setOpen(false); }}>X</button>
        {user ? (
          <form className="checkout-form" onSubmit={handleSubmit}>
            <p className="modal-title">Shipping Details</p>
            <TextField
              className="address-input"
              variant="outlined"
              label="Address"
              name="address"
              value={values.address}
              onChange={handleInputChange}
              required
            />
            <TextField
              className="mobile-input"
              variant="outlined"
              label="Mobile"
              name="mobile"
              type="text"
              value={values.mobile}
              onChange={handleInputChange}
              required
            />
            <TextField
              variant="outlined"
              label="Paid Amount"
              name="paidAmount"
              type="number"
              value={values.paidAmount}
              onChange={handleInputChange}
              inputProps={{
                inputMode: 'numeric',
                pattern: '[0-9]*',
                min: 0,
                step: 0.1,
              }}
              required
            />
            <div className="submit-checkout-section">
              <Button
                disabled={isLoading}
                type="submit"
                className="checkout-submit"
                variant="contained"
              >
                {' '}
                Submit
              </Button>
            </div>
          </form>
        )
          : (
            <div className="logIn-message-div">
              <p>
                Before Checkout
                {' '}
                <a href="/login"> Log In</a>
                {' '}
                ,Please
              </p>
            </div>
          )}
      </div>
    </Modal>
  );
}
CheckoutModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  setErrorAlert: PropTypes.func.isRequired,
  setSucccessAlert: PropTypes.func.isRequired,
};

export default CheckoutModal;
