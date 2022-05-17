import React from 'react';
import { Modal } from '@mui/material';
import PropTypes from 'prop-types';
import './ViewProducts.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function ProductOrderModel({
  open, setOpen, orders, orderId,
}) {
  const orderById = orders.find((order) => order.id === orderId)?.products;
  return (
    <Modal open={open} onClose={() => setOpen(false)} variant="contained" className="view-product-modal">
      <div className="view-modal-table">
        <button onClick={() => setOpen(false)} type="submit" className="cancl-btn-view-modal">X</button>
        <Table sx={{ minWidth: 500 }} size="small" aria-label="a dense table" className="view-product-table">
          <TableHead>
            <TableRow>
              <TableCell className="table-product-head" align="center">Name</TableCell>
              <TableCell className="table-product-head" align="center"> Quantity</TableCell>
              <TableCell className="table-product-head" align="center">Price</TableCell>
              <TableCell className="table-product-head" align="center">Quantity * Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderById?.map((product) => (
              <TableRow
                key={product.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="center">
                  {product.name}
                </TableCell>
                <TableCell align="center">{product.productOrder.quantity}</TableCell>
                <TableCell align="center">
                  {product.price}
                  $
                </TableCell>
                <TableCell align="center">
                  {product.productOrder.quantity * product.price}
                  $
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Modal>

  );
}
ProductOrderModel.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  orders: PropTypes.arrayOf.isRequired,
  orderId: PropTypes.number.isRequired,
};

export default ProductOrderModel;
