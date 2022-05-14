import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import {
  ShoppingCart, AccountCircle, Logout, Login,
} from '@mui/icons-material';
import appIcon from './logo.png';
import { useAuth } from '../../Hooks/useAuth';
import { useCart } from '../../Hooks/useCart';

function Header() {
  const navigate = useNavigate();
  const { cartitems } = useCart();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { logout, user } = useAuth();
  const admin = user?.isAdmin;
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

    <div className={`header-section ${admin ? 'admin-header' : ''}`}>
      {!admin ? (
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
          </div>
        </div>
      ) : null }
      <div className="icons-div">
        {!admin ? (
          <Link to="/cart">
            {' '}
            <div className="shopping-cart-div">
              <ShoppingCart className="shopping-cart-icon" />
              <p className="products-number">{cartitems.length || 0}</p>
            </div>
          </Link>
        ) : null }
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

export default Header;
