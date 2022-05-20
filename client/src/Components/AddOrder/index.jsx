import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import {
  TextField,
  Button,
  FormControl,
  Grid,
  Container,
  Autocomplete,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,

  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  styled,
  TableCell,
  tableCellClasses,
  Alert,
} from '@mui/material';

import { Delete } from '@mui/icons-material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.action.hover,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function AddOrder() {
  const [productArray, setProductArray] = useState([]);
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(1);
  const [id, setId] = useState(0);
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [open, setOpen] = useState(false);
  const [openRemove, setOpenRemove] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);

  const handleQuantityChange = ({ target }) => {
    setQuantity(target?.value);
  };
  const handlePriceChange = ({ target }) => {
    setPrice(target?.value);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseRemove = () => {
    setOpenRemove(false);
  };
  const handleAddProductQuantity = () => {
    if (!id) return;
    const item = productArray.find((product) => product.id === id);
    if (item) {
      setOpen(item);
    } else {
      setProductArray([...productArray, {
        id, quantity, label: value.label, price,
      }]);
    }
  };
  const handleReplace = () => {
    setProductArray(
      productArray.map(
        (product) => (product.id === id ? ({
          ...product,
          quantity: +quantity,
          price: +price,
        }) : product),
      ),

    );
    handleClose();
  };
  useEffect(() => {
    const getProducts = async () => {
      try {
        const result = await axios.get('/api/v1/products');
        if (result && result.data) {
          setProducts((result.data.data.map((product) => ({
            label: product?.name, id: product?.id, price: +product.price,
          }))));
        }
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, []);
  const handleConfirmOrder = () => {
    axios
      .post('/api/v1/order', {
        date: new Date(),
        paidPrice: -productArray.reduce((acc, { quantity: q, price: p }) => acc + q * p, 0),
        productArray: productArray.map((item) => (
          { id: item.id, quantity: item.quantity })),
        isSupplied: true,
        mobile: '0',
        address: 'InstaMart',
      })
      .then(() => {
        setProductArray([]);
      })
      .catch(() => {
        setErrorAlert(true);
        setTimeout(() => setErrorAlert(false), 3000);
      });
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`${value?.label} is already included`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`${value?.label} is already included. Do you want to replace values?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button
            onClick={handleReplace}
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openRemove}
        onClose={handleCloseRemove}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to remove product from this order?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseRemove}>Disagree</Button>
          <Button
            onClick={() => {
              setProductArray(
                productArray.filter((item3) => item3.id !== openRemove),
              );
              handleCloseRemove();
            }}
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          mt: '35px',
        }}
      >
        <div className="TitleContainer">
          <h2>Supply Order</h2>
          <br />
        </div>
        <Grid container spacing={5}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <Autocomplete
                disablePortal
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                  setId(newValue?.id);
                  if (!newValue?.id) return;
                  const item = productArray.find((product) => product.id === newValue.id);
                  if (item) {
                    setPrice(item.price);
                    setQuantity(item.quantity);
                  } else {
                    setPrice(+newValue.price);
                    setQuantity(1);
                  }
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                  setInputValue(newInputValue);
                }}
                id="combo-box-demo"
                options={products}
                // eslint-disable-next-line react/jsx-props-no-spreading
                renderInput={(params) => <TextField {...params} label="Product Name" />}
              />
              {' '}
            </FormControl>
          </Grid>
          <Grid item xs={2}>
            <FormControl size="small" fullWidth>
              <TextField
                fullWidth
                variant="outlined"
                label="Product Quantity"
                name="quantity"
                value={quantity}
                onChange={handleQuantityChange}
                type="number"
                inputProps={{
                  inputMode: 'numeric', pattern: '[0-9]*', min: 1,
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={2}>
            <FormControl size="small" fullWidth>
              <TextField
                fullWidth
                variant="outlined"
                label="Product Price"
                name="price"
                value={price}
                onChange={handlePriceChange}
                type="number"
                inputProps={{
                  inputMode: 'numeric', pattern: '[0-9]*', min: 1,
                }}
              />
            </FormControl>
          </Grid>

          <Grid item xs={2}>
            <FormControl margin="dense" fullWidth>
              <Button
                variant="contained"
                style={{
                  backgroundColor: '#3AB77D',
                }}
                onClick={handleAddProductQuantity}
              >
                Add Product
              </Button>
            </FormControl>
          </Grid>
        </Grid>
      </Container>
      <Container>
        <TableContainer
          component={Paper}
          sx={{ mt: '20px' }}
        >
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell className="table-raw-title" align="center">
                  Product
                </StyledTableCell>
                <StyledTableCell className="table-raw-title" align="center">
                  Quantity
                </StyledTableCell>
                <StyledTableCell className="table-raw-title" align="center">
                  Price
                </StyledTableCell>
                <StyledTableCell className="table-raw-title" align="center">
                  Remove
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productArray.map((item) => (
                <StyledTableRow key={uuidv4()}>
                  <StyledTableCell align="center">
                    {item.label}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {item.quantity}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {item.price}
                  </StyledTableCell>
                  <StyledTableCell align="center" className="dashicon">
                    <div className="delete-item">
                      <Delete
                        onClick={() => { setOpenRemove(item.id); }}
                        color="error"
                      />
                    </div>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          variant="contained"
          style={{
            backgroundColor: '#3AB77D',
            position: 'fixed',
            bottom: '60px',
            right: '7%',
          }}
          onClick={handleConfirmOrder}
        >
          Confirm Order
        </Button>
        {errorAlert ? (
          <>
            {' '}
            <Alert severity="error" className="alert-message">
              Some thing went wrong, Try again later.
              {' '}
            </Alert>
          </>
        ) : null}
      </Container>
    </>
  );
}

AddOrder.propTypes = {};

export default AddOrder;
