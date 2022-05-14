import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Paper, Button, Typography, Box, Rating,
} from '@mui/material';
import PropTypes from 'prop-types';
import { ShoppingCart } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import { Image } from 'cloudinary-react';

const useStyles = makeStyles({
  cardContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '246px',
    height: '80%',
    justifyContent: 'space-between',
    border: '1px solid #ececec',
    '&:hover': {
      border: '1px solid #3bb77e',
      boxShadow: 'rgba(0, 0, 0, .3) 0px 3px 8px',
    },
  },
  text: {
    '&:hover': {
      color: '#3bb77e',
      transition: '0.5s',
    },

  },
  addBtn: {
    '&:hover': {
      transform: 'translateY(-15%)',
      transition: '0.2s',
    },
  },
});

function Card({
  id, name, price, imageUrl, category, color,
}) {
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    <Paper
      onClick={() => navigate(`/product/${id}`)}
      elevation={0}
      className={classes.cardContainer}
      sx={{
        borderRadius: '20px',
        marginY: '15px',
      }}
    >
      <Paper
        sx={{
          width: '30%',
          borderRadius: '20px 0 20px 0',
          background: color || '#f74b81',
          textAlign: 'center',
          color: '#fff',
          lineHeight: '24px',
          fontSize: '10px',
          alignSelf: 'flex-start',
          zIndex: 1,
        }}
      >
        New
      </Paper>
      <Image
        cloudName="instamart"
        publicId={imageUrl}
        width="195"
        height="195"
        crop="scale"
      />
      <Typography
        variant="body2"
        sx={{ alignSelf: 'flex-start', ml: '10px' }}
        color="#adadad"
        className={classes.text}
      >
        {category}
      </Typography>

      <Typography
        variant="subtitle1"
        sx={{ alignSelf: 'flex-start', ml: '10px', fontWeight: 'bold' }}
        className={classes.text}
      >
        {name}

      </Typography>
      <Rating
        name="read-only"
        value={3.5}
        precision={0.5}
        readOnly
        size="small"
        sx={{ transform: 'scale(0.7)', alignSelf: 'flex-start', ml: '5px' }}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignContent: 'center',
          width: '100%',
          paddingX: '15px',
        }}
      >
        <Typography variant="subtitle1" color="#3AB77D" height="100%">
          {`$${price}`}
        </Typography>

        <Button
          size="small"
          className={classes.addBtn}
          variant="contained"
          color="success"
          sx={{
            marginBottom: '20px',
            paddingX: '15px',
          }}
          onClick={() => navigate(`/product/${id}`)}
        >
          <ShoppingCart />
          Add
        </Button>
      </Box>
    </Paper>
  );
}
Card.propTypes = {
  id: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};
export default Card;
