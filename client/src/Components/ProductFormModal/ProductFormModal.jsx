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
function ProductFormModal({ id }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [values, setValues] = useState({
    name: '', imageUrl: '', price: 0, details: '', categoryId: 1,
  });

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
    setIsLoading(true);
    if (id) {
      axios.patch('/admin/product', { id, ...values }, {
        onUploadProgress: (progressEvent) => {
          setUploadProgress(parseInt(((progressEvent.loaded * 100) / progressEvent.total), 10));
        },
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
        })
        .catch(() => {
          setIsLoading(false);
          // notify err
        });
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
  return (
    <div>

      <Button
        onClick={handleOpen}
        variant="contained"
      >
        Open modal
      </Button>
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
                      min="0"
                      inputProps={{
                        inputMode: 'numeric', pattern: '[0-9]*', min: 0, step: 0.1,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
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
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <span>Product Image </span>
                    <input
                      type="file"
                      name="image"
                      id="product-image"
                      accept=".gif,.jpg,.jpeg,.png"
                      onChange={handleImgSelect}
                    />
                  </Grid>
                </Grid>

              </Grid>
              <Grid item xs={12}>
                <Button
                  disabled={isLoading}
                  type="submit"
                  variant="contained"

                >
                  Submit

                </Button>
              </Grid>

            </Grid>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

ProductFormModal.propTypes = {
  id: PropTypes.number.isRequired,
};

export default ProductFormModal;
