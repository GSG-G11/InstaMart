import React from 'react';
import { Header } from '../../Components';
// eslint-disable-next-line no-unused-vars
import { DashboardTables, DashboardAside } from '../../Components/Dashboard';
import './dashboard.css';

function Dashboard() {
  return (
    <div>
      <Header />
      <div className="right-side">
        <DashboardTables />
      </div>

      {/* <div>
      <DashboardAside />
      </div>
      <div className="PageDash">
        <Header cartitems={[]} />
        <DashboardTables />
      </div> */}
    </div>
  );
}
export default Dashboard;
