import React, { useState, useEffect } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {
  Table, TableBody, TableCell, tableCellClasses, TableContainer,
  TableHead, TableRow, Paper, TextField,
  styled,
} from '@mui/material';
import axios from 'axios';
import './order.css';
import {
  Delete, Edit, Visibility,
} from '@mui/icons-material';

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

export default function OrdersTables() {
  const [orders, setorders] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [editOrder, setEditOrder] = useState({});
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const updateStatus = async (id, value) => {
    try {
      const order = await axios.patch(`/api/v1/admin/order/${id}`, { status: value });
      if (order && order.data) {
        setEditOrder(order.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getOrders = async () => {
      try {
        const result = await axios.get('/api/v1/admin/order');
        if (result && result.data) {
          setorders(result.data.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getOrders();
  }, [editOrder]);
  return (
    <div className="dashboard">
      <div className="TitleContainer">
        <h2>Orders</h2>
      </div>
      <div className="inputSearchAndButton">
        <TextField size="large" label="Search" className="inputSearch" variant="filled" />
      </div>
      <TableContainer component={Paper} style={{ width: 1200, margin: 70, marginTop: 20 }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">ID</StyledTableCell>
              <StyledTableCell align="center">Mobile</StyledTableCell>
              <StyledTableCell align="center">Total Price</StyledTableCell>
              <StyledTableCell align="center">paidPrice</StyledTableCell>
              <StyledTableCell align="center">In/Out</StyledTableCell>
              <StyledTableCell align="center">Address</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">Date</StyledTableCell>
              <StyledTableCell align="center">Options</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <StyledTableRow key={order.id}>
                <StyledTableCell align="center">{order.id}</StyledTableCell>
                <StyledTableCell align="center">{order.mobile}</StyledTableCell>
                <StyledTableCell align="center">{order.totalPrice}</StyledTableCell>
                <StyledTableCell align="center">{order.paidPrice}</StyledTableCell>
                <StyledTableCell align="center">{order.isSupplied ? 'Out' : 'In'}</StyledTableCell>
                <StyledTableCell align="center">{order.address }</StyledTableCell>
                <StyledTableCell align="center">{order.status}</StyledTableCell>
                <StyledTableCell align="center">{order.date}</StyledTableCell>
                <StyledTableCell align="center" className="dashicon">
                  <Visibility color="primary" />
                  {' '}
                  <Edit color="success" onClick={handleClick} type="submit" />
                  <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    className="profile-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                  >
                    <MenuItem onClick={() => updateStatus(order.id, 'pending')}>Pending</MenuItem>
                    <MenuItem onClick={() => updateStatus(order.id, 'Rejected')}>Rejected</MenuItem>
                    <MenuItem onClick={() => updateStatus(order.id, 'Approved')}>Approved</MenuItem>
                  </Menu>
                  {' '}
                  <Delete color="error" />
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
