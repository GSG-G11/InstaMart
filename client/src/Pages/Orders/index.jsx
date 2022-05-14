import React from 'react';
// eslint-disable-next-line no-unused-vars
import { Header, DashboardAside, OrdersTables } from '../../Components';

function OrderPage() {
  return (
    <div>
      <Header />
      <div className="order-page-container">
        {/* <DashboardAside /> */}
        <div>
          <OrdersTables />
        </div>
      </div>
    </div>
  );
}
export default OrderPage;
