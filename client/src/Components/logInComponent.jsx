/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';

import { useNavigate, Routes, Route } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import axios from 'axios';

const useStyles = makeStyles({
  head: {
    height: '80px',
  },
  signInBtn: {
    // background: '#3AB77D',

    width: '200px',
  },
  loginContainer: {
    display: 'flex',
    width: '100vw',
    height: '100vh',
  },
  img: {
    height: '100%',
    width: '40%',
  },
  formStyle: {
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

function LogInComponent() {
  const classes = useStyles();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  //   const [result, setResult] = useState({ body: { msg: null } });
  const [data, setData] = useState({
    email: null,
    password: null,
  });

  const handelSubmit = (e) => {
    e.preventDefault();
    setData({
      email,
      password,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('/api/v1/login', {
          password: data.password,
          email: data.email,
        });
        // setResult(response);
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [data]);

  return (
    <div className={classes.loginContainer}>

      <img className={classes.img} src="https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" alt="img" />
      <form className={classes.formStyle} onSubmit={(e) => handelSubmit(e)}>
        <h1 className={classes.head}>welcome to Instashop</h1>
        <TextField className={classes.textFld} variant="outlined" type="email" placeholder=" Enter your email" onChange={(e) => setEmail(e.target.value)} required />
        <TextField className={classes.textFld} variant="outlined" type="password" placeholder=" Password" onChange={(e) => setPassword(e.target.value)} required />
        {/* {result.body.msg === 'logIn successfully' ? null : <h1>{result.body.msg}</h1>} */}

        <Button type="submit" className={classes.signInBtn} variant="contained" size="large">Sign In</Button>
      </form>

    </div>
  );
}

export default LogInComponent;
// if (result.data.msg === 'logIn successfully') { navigate('/dsw'); } else {
//   console.log('ghdfh');
// }
