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
  const [id, setId] = useState(0);
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [open, setOpen] = useState(false);
  const [openRemove, setOpenRemove] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);

  const handleInputChange = ({ target }) => {
    setQuantity(target?.value);
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
      setProductArray([...productArray, { id, quantity, label: value.label }]);
    }
  };
  const handleInc = () => {
    setProductArray(
      productArray.map(
        (product) => (product.id === id ? ({
          id,
          quantity: +quantity + +product.quantity,
          label: product.label,
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
            label: product?.name, id: product?.id,
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
        paidPrice: 0,
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
            {`${value?.label} is already included (${open.quantity || ''} items).
            Do you want to increment its quantity by ${quantity} (Total = ${(+open.quantity + +quantity) || ''})`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button
            onClick={handleInc}
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
        <Grid container spacing={5}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <Autocomplete
                disablePortal
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                  setId(newValue?.id);
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
          <Grid item xs={3}>
            <FormControl size="small" fullWidth>
              <TextField
                fullWidth
                variant="outlined"
                label="Product Quantity"
                name="quantity"
                value={quantity}
                onChange={handleInputChange}
                type="number"
                inputProps={{
                  inputMode: 'numeric', pattern: '[0-9]*', min: 1,
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl margin="dense" fullWidth>
              <Button
                variant="contained"
                style={{
                  backgroundColor: '#3AB77D',
                }}
                onClick={handleAddProductQuantity}
              >
                Add Product Quantity
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
                    <TextField
                      className="product-count-input"
                      size="small"
                      id="outlined-number"
                      type="number"
                      value={item.quantity}
                      InputProps={{
                        inputProps: { min: '1', step: '1' },
                      }}
                      onChange={(e) => {
                        setProductArray(productArray.map(
                          (item2) => (item2.id === item.id
                            ? ({ ...item2, quantity: e.target.value })
                            : item2),
                        ));
                      }}
                    />
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
