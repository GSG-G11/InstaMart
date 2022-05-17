import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import {
  ShoppingCart,
  AccountCircle,
  Logout,
  Login,
} from '@mui/icons-material';
import {
  Alert, Menu, MenuItem, ListItemIcon,
} from '@mui/material';
import { useAuth } from '../../Hooks/useAuth';
import { useCart } from '../../Hooks/useCart';
import { useSocket } from '../../Hooks/useSocket';

function Header() {
  const navigate = useNavigate();
  const { cartitems } = useCart();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationOrder, setNotificationOrder] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { logout, user } = useAuth();
  const { socket } = useSocket();
  const admin = user?.isAdmin;
  useEffect(() => {
    if (socket && admin) {
      socket.on('notification', (data) => {
        setNotificationOrder(data.message);
        setTimeout(() => setNotificationOrder(null), 3000);
      });
    }
  }, []);
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
          <img
            src="https://i.ibb.co/ZYQs4LQ/grocery-cart.png"
            alt="logo-img"
            className="logo-img"
          />
          <p className="logo-name"> Instamart</p>
        </div>
        <div className="navigate-div">
          <Link className="navigate-word" to="/">
            Home
          </Link>
          <Link className="navigate-word" to="/products">
            Products
          </Link>
          {admin ? (
            <Link className="navigate-word" to="/dashboard">
              Dashboard
            </Link>
          ) : null}
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
            <button onClick={handleClick} className="user-info" type="submit">
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
              <MenuItem
                onClick={() => {
                  logoutFunc();
                }}
              >
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
      {notificationOrder ? (
        <Alert className="notification-alert" severity="info">
          {notificationOrder}
          <button
            type="submit"
            onClick={() => { setNotificationOrder(null); }}
            className="notification-alert-cancle"
          >
            x

          </button>
        </Alert>
      ) : null}
    </div>
  );
}

export default Header;
