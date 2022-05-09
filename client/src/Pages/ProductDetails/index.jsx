import React, { useState } from 'react';
import { Alert } from '@mui/material';
import Header from '../../Components/header/Header';
import ProductDetails from '../../Components/ProductDetailsCard';
import './style.css';

function ProductDetailsPage() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Header />
      <div className="product-page-container">
        <ProductDetails setOpen={setOpen} />
        {open ? (
          <>
            {' '}
            <Alert severity="success" className="success-alert-message">
              Product was added successfully
            </Alert>
          </>
        ) : null}
      </div>

    </div>
  );
}

export default ProductDetailsPage;
