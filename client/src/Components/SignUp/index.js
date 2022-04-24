/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { link } from 'react-router-dom';
import { Button, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import logo from '../../images/logo.png';
import image from '../../images/image.png';

const useStyles = makeStyles({
  head: {
    height: '80px',
  },
  signUpBtn: {
    backgroun: '#3AB77D',
    width: '200px',
  },
  container: {
    display: 'flex',
    width: '100vw',
    height: '100vh',
  },
  signupimage: {
    height: '100%',
    width: '50%',
  },
  logo: {
    height: '300px',
    width: '500px',
  },
  inputconatiner: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  textFld: {
    width: '400px',
    height: '100px',
  },
});

function SignUp() {
  const classes = useStyles();
  const [value, setValue] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    address: '',
  });

  return (
    <div className={classes.container}>
      <img src={image} alt="error loading images" className={classes.signupimage} />

      <div className={classes.inputconatiner}>
        <img
          // src="https://o.remove.bg/downloads/5dd29f37-cdef-4f0a-beed-21df992cc719/Screen_Shot_2022-04-23_at_10.59.53_PM-removebg-preview.png"
          src={logo}
          alt="img"
          className={classes.logo}
        />
        <h1 className={classes.head}>welcome to Instashop</h1>
        <TextField
          id="name"
          label="Name"
          variant="outlined"
          className={classes.textFld}
          onChange={(e) => {
            setValue({ ...value, username: e.target.value });
          }}
        />
        <TextField
          id="password"
          label="password"
          variant="outlined"
          className={classes.textFld}
          onChange={(e) => {
            setValue({ ...value, password: e.target.value });
          }}
        />
        <TextField
          id="confirmPassword"
          label="confirmPassword"
          variant="outlined"
          className={classes.textFld}
          onChange={(e) => {
            setValue({ ...value, confirmPassword: e.target.value });
          }}
        />
        <TextField
          id="address"
          label="address"
          variant="outlined"
          className={classes.textFld}
          onChange={(e) => {
            setValue({ ...value, address: e.target.value });
          }}
        />
        <Button variant="contained" className={classes.signUpBtn}>Sign Up</Button>
      </div>
    </div>
  );
}
export default SignUp;
