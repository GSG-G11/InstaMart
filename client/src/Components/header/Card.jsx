import React, { } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Paper, Grid, Button, Typography,
} from '@mui/material';
import PropTypes from 'prop-types';

function Card({
  id, name, price, imageUrl,
}) {
  const navigate = useNavigate();
  return (
    <Grid item xs={2.4}>
      <Paper elevation={7} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img src={imageUrl} alt={name} width="70%" />
        <Typography variant="h6">
          {name}
        </Typography>
        <Typography variant="subtitle1" color="#3AB77D">
          {`${price} $`}
        </Typography>
        <Button variant="contained" color="success" sx={{ marginBottom: '20px' }} onClick={() => navigate(`/products/${id}`)}>Add To Cart</Button>
      </Paper>
    </Grid>
  );
}
Card.propTypes = {
  id: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
};
export default Card;
