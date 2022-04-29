import React from 'react';
import LeaderboardTwoToneIcon from '@mui/icons-material/LeaderboardTwoTone';
import BorderAllTwoToneIcon from '@mui/icons-material/BorderAllTwoTone';
import './DashboardAside.css';

function DashboardAside() {
  return (
    <aside className="navigation">
      <div>
        <LeaderboardTwoToneIcon />
      </div>
      <div>
        <BorderAllTwoToneIcon />
      </div>
    </aside>

  );
}
export default DashboardAside;
