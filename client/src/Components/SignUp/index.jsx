import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from '../../images/logo.png';
import './SignUp.css';
import image from '../../images/image.png';
import { useAuth } from '../../Hooks/useAuth';

function SignUp() {
  const navigate = useNavigate();
  const [value, setValue] = useState({
    name: '',
    password: '',
    confirmPassword: '',
    address: '',
    mobile: '',
    email: '',
  });
  const { signup } = useAuth();

  const handleClick = () => {
    signup(value, (error) => {
      if (error) {
        console.log(error);
      } else {
        navigate('/');
      }
    });
  };

  return (
    <div className="container">
      <img src={image} alt="error loading images" className="signupimage" />
      <div className="inputconatiner">
        <img
          src={logo}
          alt="img"
          className="logo"
        />
        <h1 className="head">welcome to Instashop</h1>
        <TextField
          id="name"
          label="Name"
          variant="outlined"
          onChange={(e) => {
            setValue({ ...value, name: e.target.value });
          }}
        />
        <TextField
          id="email"
          label="email"
          variant="outlined"
          onChange={(e) => {
            setValue({ ...value, email: e.target.value });
          }}
        />
        <TextField
          id="mobile"
          label="mobile"
          variant="outlined"
          onChange={(e) => {
            setValue({ ...value, mobile: e.target.value });
          }}
        />
        <TextField
          id="password"
          label="password"
          variant="outlined"
          type="password"
          onChange={(e) => {
            setValue({ ...value, password: e.target.value });
          }}
        />
        <TextField
          id="confirmPassword"
          label="confirmPassword"
          type="password"
          onChange={(e) => {
            setValue({ ...value, confirmPassword: e.target.value });
          }}
        />
        <TextField
          id="address"
          label="address"
          onChange={(e) => {
            setValue({ ...value, address: e.target.value });
          }}
        />
        <Button variant="contained" onClick={handleClick}>Sign Up</Button>
      </div>
    </div>
  );
}
export default SignUp;
