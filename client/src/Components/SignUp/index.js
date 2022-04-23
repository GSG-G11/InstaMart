/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { link } from 'react-router-dom';
import { Button, TextField, Typography } from '@mui/material';
import logo from '../../images/logo.png';
import image from '../../images/image.png';
import './SignUp.css';

function SignUp() {
  const [value, setValue] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    address: '',
  });

  return (
    <div className="container">
      <div className="image">
        <img src={image} alt="error loading images" className="signup image" />
      </div>

      <div className="input-conatiner">
        <img src={logo} alt="logo" />
        <Typography variant="h6" component="h2">
          welcome to instashop
        </Typography>

        <TextField
          id="name"
          label="Name"
          variant="outlined"
          className="input-field"
          onChange={(e) => {
            setValue({ ...value, username: e.target.value });
          }}
        />
        <TextField
          id="password"
          label="password"
          variant="outlined"
          className="input-field"
          onChange={(e) => {
            setValue({ ...value, password: e.target.value });
          }}
        />
        <TextField
          id="confirmPassword"
          label="confirmPassword"
          variant="outlined"
          className="input-field"
          onChange={(e) => {
            setValue({ ...value, confirmPassword: e.target.value });
          }}
        />
        <TextField
          id="address"
          label="address"
          variant="outlined"
          className="input-field"
          onChange={(e) => {
            setValue({ ...value, address: e.target.value });
          }}
        />
        <Button variant="contained" className="btn-signup">Sign Up</Button>
      </div>
    </div>
  );
}
export default SignUp;
