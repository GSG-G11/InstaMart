import React from 'react';
import Header from '../../Components/header/Header';
import { CustomizedTables, DashboardAside } from '../../Components/Dashboard';
import './dash.css';

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
