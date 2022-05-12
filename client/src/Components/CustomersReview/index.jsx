import React from 'react';
import { Rating, Typography } from '@mui/material';
import './CustomersReview.css';

function CustomersReview() {
  return (
    <div className="customer-review-section">
      <p className="customer-review-section-title">Customers Review</p>
      <div className="customer-review-section-cards">
        <div className="card">
          <Typography variant="h6">Ahmed</Typography>
          <Rating
            name="read-only"
            value={3.5}
            precision={0.5}
            readOnly
            size="small"
            sx={{ transform: 'scale(0.7)', alignSelf: 'flex-start' }}
          />
          <Typography variant="body1">Nice Market, quick communication. Would buy again.</Typography>
        </div>
        <div className="card">
          <Typography variant="h6">Ahmed</Typography>
          <Rating
            name="read-only"
            value={3.5}
            precision={0.5}
            readOnly
            size="small"
            sx={{ transform: 'scale(0.7)', alignSelf: 'flex-start' }}
          />
          <Typography variant="body1">Nice Market, quick communication. Would buy again.</Typography>
        </div>
        <div className="card">
          <Typography variant="h6">Ahmed</Typography>
          <Rating
            name="read-only"
            value={3.5}
            precision={0.5}
            readOnly
            size="small"
            sx={{ transform: 'scale(0.7)', alignSelf: 'flex-start' }}
          />
          <Typography variant="body1">Nice Market, quick communication. Would buy again.</Typography>
        </div>

      </div>
    </div>
  );
}
export default CustomersReview;
