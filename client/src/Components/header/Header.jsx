/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './index.css';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import {
  ShoppingCart, AccountCircle, Logout, Login,
} from '@mui/icons-material';
import appIcon from './grocery-cart 3.png';
import { useAuth } from '../../useAuth';

function Header() {
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
        console.log(error);
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
          <Link className="navigate-word" to="/home">
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
        <Link to="./cart">
          {' '}
          <div className="shopping-cart-div">
            <ShoppingCart className="shopping-cart-icon" />
            <p className="products-number">5</p>
          </div>
        </Link>

        {user ? (
          <>
            <div
              onClick={handleClick}
              className="user-info"
            >
              <AccountCircle className="shopping-cart-icon" />
              <p className="user-name">Salma</p>
            </div>
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
          <div
            className="user-info"
            onClick={() => navigate('/login')}
          >
            <Login className="shopping-cart-icon" />
            <p className="user-name">Log In</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
