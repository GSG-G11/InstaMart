import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  TextField,
  Select,
  MenuItem,
  Pagination,
  InputLabel,
  FormControl,
  Box,
  Grid,
  Container,
  CircularProgress,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useLocation } from 'react-router-dom';
import { Card, Header, Footer } from '../../Components';
// import { useCart } from '../../Hooks/useCart';

const colorsArr = [
  '#6f42c1',
  '#6610f2',
  '#d63384',
  '#fd7e14',
  '#dc3545',
  '#198754',
  '#ffc107',
  '#20c997',
  '#0dcaf0',
  '#6c757d',
  '#0d6efd',
  '#198754',
  '#0dcaf0',
  '#ffc107',
  '#dc3545',
  '#212529'];
const useStyles = makeStyles({
  main: {
    minHeight: 'calc(100vh - 79px)',
    display: 'flex',
    flexDirection: 'column',
  },
});
function Products() {
  const { state } = useLocation();
  const classes = useStyles();
  const [q, setQ] = useState('');
  const [sort, setSort] = useState('');
  const [categoryId, setCategoryId] = useState(state?.categoryId || '');
  const [totalPages, settotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const { addToCartLS } = useCart();

  const handleQChange = ({ target: { value } }) => {
    setIsLoading(true);
    setPage(1);
    setQ(value);
  };

  const handleSortChange = ({ target: { value } }) => {
    setIsLoading(true);
    setPage(1);
    setSort(value);
  };
  const handleCategoryIdChange = ({ target: { value } }) => {
    setIsLoading(true);
    setPage(1);
    setCategoryId(value);
  };

  const handlePageChange = (e, value) => {
    setIsLoading(true);
    setPage(value);
  };

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `/api/v1/products?q=${q.trim()}&&categoryId=${categoryId
          .toString()
          .trim()}&&sort=${sort.trim()}&&page=${page}&&limit=8`,
      );
      if (data.totalPages !== totalPages) settotalPages(data.totalPages);
      setProducts(data.data);
      setIsLoading(false);
    })();
  }, [q, sort, categoryId, page]);
  useEffect(() => {
    (async () => {
      const {
        data: { data },
      } = await axios.get('/api/v1/categories');
      setCategories(data);
    })();
  }, []);
  return (
    <>
      <Header />
      <main className={classes.main}>
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
                <TextField size="small" value={q} label="Search" onChange={handleQChange} />
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <FormControl size="small" fullWidth>
                <InputLabel id="category-select">Category</InputLabel>
                <Select
                  value={categoryId}
                  label="Category"
                  onChange={handleCategoryIdChange}
                >
                  <MenuItem key="all" value=" ">
                    All
                  </MenuItem>
                  {categories.map(({ id, name }) => (
                    <MenuItem key={name} value={id}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <FormControl size="small" fullWidth>
                <InputLabel id="demo-simple-select-label">Sort By Price</InputLabel>
                <Select
                  value={sort}
                  label="Sort By Price"
                  onChange={handleSortChange}
                >
                  <MenuItem value=" ">Sort By Price</MenuItem>
                  <MenuItem value="asc">Low to High</MenuItem>
                  <MenuItem value="desc">High to low</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Container>
        <Container
          sx={{
            height: '100%',
            display: 'flex',
            width: '100%',
            flexWrap: 'wrap',
            justifyContent: isLoading ? 'center' : 'space-between',
            alignItems: 'center',

          }}
        >
          {isLoading ? (
            <CircularProgress sx={{ color: '#3bb77e' }} />
          ) : products.map(({
            id, name, price, imageUrl, category: { name: category },
          }) => (
            <Card
              key={id}
              id={id}
              name={name}
              price={+price}
              imageUrl={imageUrl}
              category={category}
              color={colorsArr[id % colorsArr.length]}
            />
          ))}

        </Container>
        <Box sx={{ display: 'flex', justifyContent: 'space-around', p: '15px' }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
          />
        </Box>
      </main>
      <Footer />
    </>
  );
}

export default Products;
