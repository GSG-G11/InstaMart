import React from 'react';
// eslint-disable-next-line no-unused-vars
import { Header, DashboardAside, OrdersTables } from '../../Components';

function OrderPage() {
  return (
    <div>
      <Header />
      {/* <div>
        <DashboardAside />
      </div> */}
      <div className="PageOrrder">
        <OrdersTables />
      </div>
    </div>
  );
}
export default OrderPage;
