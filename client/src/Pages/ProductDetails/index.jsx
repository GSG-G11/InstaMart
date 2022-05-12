import React, { useState } from 'react';
import { Alert } from '@mui/material';
import { Header, ProductDetails, Footer } from '../../Components';
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
      <Footer />
    </div>
  );
}

export default ProductDetailsPage;
