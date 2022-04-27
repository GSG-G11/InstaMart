// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function CustomizedTables() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      try {
        const result = await axios.get('/api/v1/products');
        if (result && result.data) {
          setProducts(result.data.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, []);
  return (
    <TableContainer component={Paper} style={{ width: 1200, margin: 70 }}>
      <Table sx={{ minWidth: 700 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell align="right">Item</StyledTableCell>
            <StyledTableCell align="right">Category</StyledTableCell>
            <StyledTableCell align="right">Price</StyledTableCell>
            <StyledTableCell align="right">Description</StyledTableCell>
            <StyledTableCell align="right">Options</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <StyledTableRow key={product.id}>
              <StyledTableCell>
                {product.id}
              </StyledTableCell>
              <StyledTableCell align="right">{product.name}</StyledTableCell>
              <StyledTableCell align="right">{product.categoryId}</StyledTableCell>
              <StyledTableCell align="right">{product.price}</StyledTableCell>
              <StyledTableCell align="right">{product.details}</StyledTableCell>
              <StyledTableCell align="right"><MoreVertIcon /></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
