import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {
  Grid,
  Box,
  Button,
  Modal,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Input,
  FormHelperText,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 400,
  width: '70%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const { textField } = makeStyles(() => ({
  textField: {
    p: 4,
  },
}));
const gridWidth = 6;
function ProductFormModal({
  id, open, setOpen, product, setDataChangeToggle, dataChangeToggle,
}) {
  const handleClose = () => setOpen(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [values, setValues] = useState(product);
  const [errorMsgs, setErrorMsgs] = useState({
    name: '', imageUrl: '', price: '', details: '', categoryId: '',
  });

  const validateInputs = () => {
    const msgs = {};
    msgs.categoryId = values.categoryId ? '' : 'You are probably not connected to server at the moment.';
    msgs.details = values.details ? '' : 'Details field is required';
    msgs.imageUrl = values.imageUrl ? '' : 'Product should have a valid image.';
    msgs.name = values.name ? '' : 'Product should have name.';
    msgs.price = values.price ? '' : 'Price should be greater than zero.';
    setErrorMsgs(msgs);
    return Object.values(msgs).every((msg) => msg === '');
  };
  const handleInputChange = ({ target: { name, value } }) => {
    setValues({ ...values, [name]: value });
  };

  const handleImgSelect = ({ target }) => {
    const file = target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image')) {
      setValues({ ...values, imageUrl: '' });
      return;
    }
    setIsLoading(true);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const imageUrl = reader.result;
      setIsLoading(false);
      setValues({ ...values, imageUrl });
    };
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateInputs()) {
      setIsLoading(true);
      if (id) {
        // refactor to async/await later
        axios.patch('/api/v1/admin/product', { id, ...values }, {
          onUploadProgress: (progressEvent) => {
            setUploadProgress(parseInt(((progressEvent.loaded * 100) / progressEvent.total), 10));
          },
        }).then(() => {
          setIsLoading(false);
          handleClose();
          setDataChangeToggle(!dataChangeToggle);
        })
          .catch(() => {
            setIsLoading(false);
            // notify err
          });
      } else {
        axios.post('/api/v1/admin/product', values, {
          onUploadProgress: (progressEvent) => {
            setUploadProgress(parseInt(((progressEvent.loaded * 100) / progressEvent.total), 10));
          },
        })
          .then(() => {
            setIsLoading(false);
            handleClose();
            setDataChangeToggle(!dataChangeToggle);
          })
          .catch(() => {
            setIsLoading(false);
            // notify err
          });
      }
    }
  };
  useEffect(() => {
    (async () => {
      const {
        data: { data },
      } = await axios.get('/api/v1/categories');
      setCategories(data);
    })();
  }, []);
  useEffect(() => {
    setErrorMsgs({
      name: '', imageUrl: '', price: '', details: '', categoryId: '',
    });
    setValues(product);
  }, [open]);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-add-edit-product"
      aria-describedby="modal-add-edit-product-form"
    >
      <Box sx={style}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {isLoading && (
              <CircularProgress
                variant="determinate"
                value={uploadProgress}
                sx={{
                  color: '#3bb77e',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',

                }}
              />
            )}
            <Grid item md={gridWidth}>
              <Grid container spacing={1}>
                <Grid item xs={12}>

                  <TextField
                    fullWidth
                    className={textField}
                    variant="outlined"
                    label="Product Name"
                    name="name"
                    value={values.name}
                    onChange={handleInputChange}
                    error={errorMsgs.name}
                    helperText={errorMsgs.name}
                  />
                </Grid>

                <Grid item xs={12}>

                  <TextField
                    fullWidth
                    className={textField}
                    variant="outlined"
                    label="Product Price"
                    name="price"
                    value={values.price}
                    onChange={handleInputChange}
                    type="number"
                    inputProps={{
                      inputMode: 'numeric', pattern: '[0-9]*', min: 0, step: 0.1,
                    }}
                    error={errorMsgs.price}
                    helperText={errorMsgs.price}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    fullWidth
                    error={errorMsgs.categoryId}
                    helperText={errorMsgs.categoryId}
                  >
                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={values.categoryId}
                      label="Category"
                      name="categoryId"
                      onChange={handleInputChange}
                    >
                      {categories.map(({ id: value, name }) => (
                        <MenuItem
                          className={textField}
                          key={name}
                          value={value}
                        >
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={gridWidth}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    className={textField}
                    variant="outlined"
                    label="Product Details"
                    name="details"
                    rows={5}
                    value={values.details}
                    onChange={handleInputChange}
                    error={errorMsgs.details}
                    helperText={errorMsgs.details}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    error={errorMsgs.imageUrl}
                  >
                    <span>Product Image </span>
                    <Input
                      type="file"
                      name="image"
                      id="product-image"
                      accept=".gif,.jpg,.jpeg,.png"
                      onChange={handleImgSelect}
                    />
                    <FormHelperText id="my-helper-text">{errorMsgs.imageUrl}</FormHelperText>
                  </FormControl>

                </Grid>
              </Grid>

            </Grid>
            <Grid item xs={12}>
              <Button
                disabled={isLoading}
                type="submit"
                variant="contained"
                style={{
                  backgroundColor: '#3AB77D',
                }}
              >
                Submit

              </Button>
            </Grid>

          </Grid>
        </form>
      </Box>
    </Modal>
  );
}

ProductFormModal.propTypes = {
  id: PropTypes.number.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  dataChangeToggle: PropTypes.bool.isRequired,
  setDataChangeToggle: PropTypes.func.isRequired,

  product: PropTypes.shape({

    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    details: PropTypes.string.isRequired,
    categoryId: PropTypes.number.isRequired,

  }).isRequired,
};

export default ProductFormModal;
