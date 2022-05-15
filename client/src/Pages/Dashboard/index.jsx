import React from 'react';
import { Header, Footer } from '../../Components';
import { CustomizedTables, DashboardAside } from '../../Components/Dashboard';
import './dashboard.css';

function Dashboard() {
  return (
    <>
      <div className="tes">
        <div>
          <DashboardAside />
        </div>
        <div className="PageDash">
          <Header cartitems={[]} />
          <CustomizedTables />
        </div>
      </div>
      <Footer />
    </>
  );
}
export default Dashboard;
