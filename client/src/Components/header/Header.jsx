import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import { ShoppingCart, AccountCircle } from '@mui/icons-material';
// import { Menu, MenuItem } from '@mui/material';
import appIcon from './grocery-cart 3.png';
// import { useAuth } from '../../useAuth';

// const { user } = useAuth();

function Header() {
  //   const navigate = useNavigate();

  return (
    <div className="header-section">
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
      <div className="icons-div">
        <Link to="./cart">
          {' '}
          <div className="shopping-cart-div">
            <ShoppingCart className="shopping-cart-icon" />
            <p className="products-number">5</p>
          </div>
        </Link>
        <div className="user-info">
          <AccountCircle className="shopping-cart-icon" />
          <p className="user-name">Salma</p>
          {/* <Menu
            id="lock-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'lock-button',
              role: 'listbox',
            }}
          >
            <MenuItem key="Log out">{option}</MenuItem>
          </Menu> */}
        </div>

        {/* {user ? (
          <>
            <AccountCircle className="shopping-cart-icon" />
            <p className="user-name">{user.name}</p>

          </>
        ) : null} */}
      </div>
    </div>
  );
}

export default Header;
