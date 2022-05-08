import React from 'react';
import { Header } from '../../Components';
import { CustomizedTables, DashboardAside } from '../../Components/Dashboard';
import './dashboard.css';

function Dashboard() {
  return (
    <>
      <Header cartitems={[]} />
      <div className="PageDash">
        <DashboardAside />
        <CustomizedTables />
      </div>
    </>
  );
}
export default Dashboard;
