import React from 'react';
import { Header } from '../../Components';
import { DashboardTables, DashboardAside } from '../../Components/Dashboard';
import './dashboard.css';

function Dashboard() {
  return (
    <div className="tes">
      <div>
        <DashboardAside />
      </div>
      <div className="PageDash">
        <Header cartitems={[]} />
        <DashboardTables />
      </div>
    </div>
  );
}
export default Dashboard;
