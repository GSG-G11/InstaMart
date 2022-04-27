import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import {
//   Link, useNavigate,
// } from 'react-router-dom';
import {
  TextField, Select, MenuItem, Pagination, InputLabel, FormControl, Box, Grid, Container,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import Card from '../../Components/header/Card';
// import Header from '../../Components/header/Header';
const useStyles = makeStyles({
  main: {
    height: 'calc(100vh - 79px)',
    display: 'flex',
    flexDirection: 'column',
  },
});
function Products() {
  const classes = useStyles();
  const [q, setQ] = useState('');
  const [sort, setSort] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [totalPages, settotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const handleQChange = ({ target: { value } }) => {
    setQ(value);
  };

  const handleSortChange = ({ target: { value } }) => {
    setSort(value);
  };
  const handleCategoryIdChange = ({ target: { value } }) => {
    setCategoryId(value);
  };

  const handlePageChange = (e, value) => {
    setPage(value);
  };

  useEffect(
    () => {
      (async () => {
        const { data } = await axios.get(`/api/v1/products?q=${q.trim()}&&categoryId=${categoryId.toString().trim()}&&sort=${sort.trim()}&&page=${page}&&limit=3`);
        if (data.totalPages !== totalPages) settotalPages(data.totalPages);
        setProducts(data.data);
      })();
    },
    [q, sort, categoryId, page],
  );
  useEffect(
    () => {
      (async () => {
        const { data: { data } } = await axios.get('/api/v1/categories');
        setCategories(data);
      })();
    },
    [],
  );
  return (
    <main className={classes.main}>
      <Box sx={{ display: 'flex', mt: '10px', p: '30px' }}>
        <FormControl sx={{ marginX: '15px' }} fullWidth>
          <TextField value={q} label="Search" onChange={handleQChange} />
        </FormControl>
        <FormControl sx={{ marginX: '15px' }} fullWidth>
          <InputLabel id="category-select">Category</InputLabel>
          <Select value={categoryId} label="Category" onChange={handleCategoryIdChange}>
            <MenuItem key="all" value=" ">All</MenuItem>
            {categories.map(({ id, name }) => <MenuItem key={name} value={id}>{name}</MenuItem>)}
          </Select>
        </FormControl>
        <FormControl sx={{ marginX: '15px' }} fullWidth>
          <InputLabel id="demo-simple-select-label">Sort By Price</InputLabel>
          <Select value={sort} label="Sort By Price" onChange={handleSortChange}>
            <MenuItem value=" ">Sort By Price</MenuItem>
            <MenuItem value="asc">Low to High</MenuItem>
            <MenuItem value="desc">High to low</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Container sx={{
        height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center',
      }}
      >
        <Grid container spacing={5}>
          {products.map(({
            id, name, price, imageUrl,
          }) => (<Card key={id} id={id} name={name} price={+price} imageUrl={imageUrl} />))}
        </Grid>
      </Container>
      <Box sx={{ display: 'flex', justifyContent: 'space-around', p: '15px' }}>
        <Pagination count={totalPages} page={page} onChange={handlePageChange} />
      </Box>
    </main>
  );
}

export default Products;
