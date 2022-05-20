/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import PropTypes from 'prop-types';
import {
  Tabs, Tab, Typography, Box,
} from '@mui/material';
import {
  DashboardTable, OrdersTable, Header, AddOrder, BalancesTable,
} from '../../Components';
import './dashboard.css';

function TabPanel(props) {
  const {
    children, value, index, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      className="tabpanel-container"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Header />
      <Box
        sx={{
          flexGrow: 1, bgcolor: 'background.paper', display: 'flex',
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: 'divider', marginTop: 5 }}
        >
          <Tab label="Products" {...a11yProps(0)} />
          <Tab label="Orders" {...a11yProps(1)} />
          <Tab label="Supply Order" {...a11yProps(2)} />
          <Tab label="Users Balances" {...a11yProps(3)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <DashboardTable />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <OrdersTable />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <AddOrder />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <BalancesTable />
        </TabPanel>
      </Box>
    </>
  );
}
