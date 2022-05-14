import React from 'react';
import { Header } from '../../Components';
// eslint-disable-next-line no-unused-vars
import { DashboardTables, DashboardAside } from '../../Components/Dashboard';
import './dashboard.css';

function Dashboard() {
  return (
    <div>
      <Header />
      {/* <div>
        <DashboardAside />
      </div> */}
      <div className="PageDash">
        <DashboardTables />
      </div>
    </div>
  );
}
export default Dashboard;
