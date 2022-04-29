import React, { } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Paper, Button, Typography, Box, Rating,
} from '@mui/material';
import PropTypes from 'prop-types';
import {
  ShoppingCart,
} from '@mui/icons-material';

function Card({
  id, name, price, imageUrl,
}) {
  const navigate = useNavigate();
  return (
  // <Grid item xs={2.4}>
    <Paper
      elevation={7}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '246px',
        height: '80%',
        borderRadius: '20px',
        justifyContent: 'space-between',
      }}
    >
      <Paper sx={{
        width: '30%', borderRadius: '20px 0 20px 0', background: '#f74b81', textAlign: 'center', color: '#fff', lineHeight: '24px', fontSize: '10px', alignSelf: 'flex-start', zIndex: 1,
      }}
      >
        new
      </Paper>
      <img src={imageUrl} alt={name} width="80%" />
      <Typography variant="body2" sx={{ alignSelf: 'flex-start', ml: '10px' }} color="#adadad">
        {name}
      </Typography>

      <Typography variant="subtitle1">
        {name}
      </Typography>
      <Rating name="read-only" value={3.5} precision={0.5} readOnly size="small" sx={{ transform: 'scale(0.7)', alignSelf: 'flex-start', ml: '10px' }} />
      <Box sx={{
        display: 'flex', justifyContent: 'space-around', alignContent: 'center', width: '100%',
      }}
      >

        <Typography variant="subtitle1" color="#3AB77D" height="100%">
          {`$${price}`}
        </Typography>

        <Button size="small" variant="contained" color="success" sx={{ marginBottom: '20px' }} onClick={() => navigate(`/products/${id}`)}>
          <ShoppingCart />
          Add
        </Button>
      </Box>

    </Paper>
  // </Grid>
  );
}
Card.propTypes = {
  id: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
};
export default Card;
