import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, tableCellClasses, TableContainer,
  TableHead, TableRow, Paper, Button, TextField,
  styled,
  IconButton,
} from '@mui/material';
import axios from 'axios';
import './DashboardTables.css';
import { Delete, Edit } from '@mui/icons-material';
import ProductFormModal from '../ProductFormModal/ProductFormModal';

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
  const [open, setOpen] = useState(false);
  const [idN, setId] = useState(0);
  const [dataChangeToggle, setDataChangeToggle] = useState(false);
  const [item, setItem] = useState({
    name: '', imageUrl: '', price: 0, details: '', categoryId: 1,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const handleInputChange = ({ target: { value } }) => {
    setSearchTerm(value);
  };
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
  }, [dataChangeToggle]);
  return (
    <div className="table-container">
      <ProductFormModal
        id={idN}
        open={open}
        setOpen={setOpen}
        product={item}
        setDataChangeToggle={setDataChangeToggle}
        dataChangeToggle={dataChangeToggle}
      />
      <div className="TitleContainer">
        <h2>Products</h2>
      </div>
      <div className="inputSearchAndButton">
        <TextField size="large" label="Search" onChange={handleInputChange} className="inputSearch" />
        <Button
          variant="contained"
          style={{
            backgroundColor: '#3AB77D',
            width: '169px',
            fontWeight: 'bold',
          }}
          onClick={() => {
            setId(0);
            setOpen(true);
            setItem({
              name: '', imageUrl: '', price: 0, details: '', categoryId: 1,
            });
          }}
        >
          Add Product

        </Button>
      </div>
      <TableContainer component={Paper}>
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
            {products.filter(({ name }) => name.toLowerCase().includes(searchTerm.toLowerCase()))
              .map(({
                id, name, categoryId, price, details, imageUrl, category,
              }) => (
                <StyledTableRow key={id}>
                  <StyledTableCell align="center">{id}</StyledTableCell>
                  <StyledTableCell align="center">{name}</StyledTableCell>
                  <StyledTableCell align="center">{category.name}</StyledTableCell>
                  <StyledTableCell align="center">{price}</StyledTableCell>
                  <StyledTableCell align="center">{details}</StyledTableCell>
                  <StyledTableCell align="center" className="dashicon">
                    <IconButton
                      onClick={() => {
                        setId(id);
                        setItem({
                          id, name, categoryId, price, details, imageUrl,
                        });
                        setOpen(true);
                      }}
                    >
                      <Edit color="success" />
                    </IconButton>
                    {' '}
                    <IconButton>
                      <Delete color="error" />
                    </IconButton>

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
