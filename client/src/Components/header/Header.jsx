import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import './index.css';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import {
  ShoppingCart, AccountCircle, Logout, Login,
} from '@mui/icons-material';
import appIcon from './logo.png';
import { useAuth } from '../../Hooks/useAuth';

function Header({ cartitems }) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { logout, user } = useAuth();
  const logoutFunc = () => {
    logout((error) => {
      if (!error) {
        navigate('/');
      } else {
        // console.log(error);
      }
    });
  };
  return (

    <div className="header-section">
      <div className="left-section">
        <div className="logo-section">
          <img src={appIcon} alt="logo-img" className="logo-img" />
          <p className="logo-name"> Instamart</p>
        </div>
        <div className="navigate-div">
          <Link className="navigate-word" to="/">
            Home
          </Link>
          <Link className="navigate-word" to="/products">
            Products
          </Link>
          <Link className="navigate-word" to="/dashboard">
            Dashboard
          </Link>
        </div>
      </div>
      <div className="icons-div">
        <Link to="/cart">
          {' '}
          <div className="shopping-cart-div">
            <ShoppingCart className="shopping-cart-icon" />
            <p className="products-number">{cartitems.length || 0}</p>
          </div>
        </Link>

        {user ? (
          <>
            <button
              onClick={handleClick}
              className="user-info"
              type="submit"
            >
              <AccountCircle className="shopping-cart-icon" />
              <p className="user-name">{user.name}</p>
            </button>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              className="profile-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
            >
              <MenuItem onClick={() => { logoutFunc(); }}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>

          </>
        ) : (
          <button
            className="user-info"
            onClick={() => navigate('/login')}
            type="submit"
          >
            <Login className="shopping-cart-icon" />
            <p className="user-name">Log In</p>
          </button>
        )}
      </div>
    </div>
  );
}
Header.propTypes = {
  cartitems: PropTypes.arrayOf(Object).isRequired,
};

export default Header;
