import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, tableCellClasses, TableContainer,
  TableHead, TableRow, Paper,
  styled,
} from '@mui/material';
import axios from 'axios';

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

export default function BalancesTable() {
  const [balances, setBalances] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const result = await axios.get('/api/v1/admin/balances');
        if (result && result.data) {
          setBalances(result.data.data);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <div className="table-container">
      <div className="TitleContainer">
        <h2>Users Balances</h2>
        <br />
      </div>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">User Id</StyledTableCell>
              <StyledTableCell align="center">User Name</StyledTableCell>
              <StyledTableCell align="center">Total Price</StyledTableCell>
              <StyledTableCell align="center">Paid Price</StyledTableCell>
              <StyledTableCell align="center">Balance (Total - Paid)</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {balances.map((balance) => (
              <StyledTableRow key={balance.userId}>
                <StyledTableCell align="center">{balance.userId}</StyledTableCell>
                <StyledTableCell align="center">{balance.userName}</StyledTableCell>
                <StyledTableCell align="center">{balance.totalPrice}</StyledTableCell>
                <StyledTableCell align="center">{balance.paidPrice}</StyledTableCell>
                <StyledTableCell align="center">{balance.balance}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
