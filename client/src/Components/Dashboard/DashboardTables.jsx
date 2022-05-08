import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, tableCellClasses, TableContainer,
  TableHead, TableRow, Paper, Button, TextField,
  styled,
} from '@mui/material';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './DashboardTables.css';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.action.hover,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
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
    <div className="dashboard">
      <div className="TitleContainer">
        <h2>Products</h2>
      </div>
      <div className="inputSearchAndButton">
        <TextField size="large" label="Search" className="inputSearch" variant="filled" />
        <Button
          variant="contained"
          style={{
            backgroundColor: '#3AB77D',
            width: '169px',
            height: '45px',
            fontWeight: 'bold',
          }}
        >
          Add Product

        </Button>
      </div>
      <TableContainer component={Paper} style={{ width: 1200, margin: 70, marginTop: 20 }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">ID</StyledTableCell>
              <StyledTableCell align="center">Item</StyledTableCell>
              <StyledTableCell align="center">Category</StyledTableCell>
              <StyledTableCell align="center">Price</StyledTableCell>
              <StyledTableCell align="center">Description</StyledTableCell>
              <StyledTableCell align="center">Options</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <StyledTableRow key={product.id}>
                <StyledTableCell align="center">{product.id}</StyledTableCell>
                <StyledTableCell align="center">{product.name}</StyledTableCell>
                <StyledTableCell align="center">{product.category.name}</StyledTableCell>
                <StyledTableCell align="center">{product.price}</StyledTableCell>
                <StyledTableCell align="center">{product.details}</StyledTableCell>
                <StyledTableCell align="center" className="dashicon">
                  <EditIcon color="success" />
                  {' '}
                  <DeleteIcon color="error" />
                  {' '}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
