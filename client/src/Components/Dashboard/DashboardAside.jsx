import React from 'react';
import { LeaderboardTwoTone, BorderAllTwoTone } from '@mui/icons-material';
import './DashboardAside.css';

function DashboardAside() {
  return (
    <aside className="navigation">
      <div>
        <LeaderboardTwoTone />
      </div>
      <div>
        <BorderAllTwoTone />
      </div>
    </aside>

  );
}
export default DashboardAside;
