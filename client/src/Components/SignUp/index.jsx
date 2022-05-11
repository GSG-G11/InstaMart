import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../../images/logo1.png';
import './SignUp.css';
import image from '../../images/SignUp.jpeg';
import { useAuth } from '../../Hooks/useAuth';

function SignUp() {
  const navigate = useNavigate();
  const [userError, setUserError] = useState(null);
  const [value, setValue] = useState({
    name: '',
    password: '',
    confirmPassword: '',
    address: '',
    mobile: '',
    email: '',
  });
  const { signup } = useAuth();

  const handleClick = (e) => {
    e.preventDefault();
    signup(value, (error) => {
      if (error) {
        setUserError(error.data);
      } else {
        navigate('/');
      }
    });
  };

  return (
    <div className="container">
      <div className="signupImage-container">
        <img src={image} alt="error loading images" className="signupimage" />
      </div>
      <div className="rightContainer">
        <div className="logoPart">
          <img
            className="logo-image-title"
            src={logo}
            alt="img"
          />
        </div>
        <p className="welomeParagraph">Welcome To InstaMart</p>
        <div className="inputContainer">
          <TextField
            size="small"
            id="name"
            label="Name"
            variant="outlined"
            className="inputField"
            onChange={(e) => {
              setValue({ ...value, name: e.target.value });
            }}
          />
          <TextField
            size="small"
            id="email"
            label="Email"
            variant="outlined"
            className="inputField"
            onChange={(e) => {
              setValue({ ...value, email: e.target.value });
            }}
          />
          <TextField
            size="small"
            id="mobile"
            label="Mobile"
            variant="outlined"
            className="inputField"
            onChange={(e) => {
              setValue({ ...value, mobile: e.target.value });
            }}
          />
          <TextField
            size="small"
            id="password"
            label="Password"
            variant="outlined"
            className="inputField"
            type="password"
            onChange={(e) => {
              setValue({ ...value, password: e.target.value });
            }}
          />
          <TextField
            size="small"
            id="confirmPassword"
            label="Confirm Password"
            className="inputField"
            type="password"
            onChange={(e) => {
              setValue({ ...value, confirmPassword: e.target.value });
            }}
          />
          <TextField
            size="small"
            id="address"
            label="Address"
            className="inputField"
            onChange={(e) => {
              setValue({ ...value, address: e.target.value });
            }}
          />
        </div>
        {userError ? <Typography component="h4" style={{ color: 'red', paddingBottom: '20' }}>{userError}</Typography> : null}
        <Button
          variant="contained"
          onClick={handleClick}
          style={{
            backgroundColor: '#3AB77D',
            width: '200px',
          }}
        >
          Sign Up

        </Button>
        <Typography component="h2" style={{ margin: '15px' }}>
          {' '}
          Already have an account?
          {' '}
          <Link to="/login">
            LOGIN
          </Link>
        </Typography>
      </div>
    </div>
  );
}
export default SignUp;
