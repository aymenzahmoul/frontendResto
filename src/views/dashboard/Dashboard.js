import React from 'react';
import { Grid, Box } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import SalesOverview from './components/SalesOverview';
import YearlyBreakup from './components/YearlyBreakup';
import MonthlyEarnings from './components/MonthlyEarnings';
import AjouteMap from '../Profils/AjouteMap';
import DataUsers from './components/datausers';
import PUB from './components/DataPublication';
const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={4}>
          <YearlyBreakup />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <PUB />
              </Grid>
              
            </Grid>
          </Grid>
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <DataUsers />
              </Grid>
              
            </Grid>
          </Grid>
          <Grid item xs={12} lg={4}>
          
          </Grid>
          <Grid item xs={14} lg={14}>
          <AjouteMap/>
          </Grid>
          <Grid item xs={12} >
           
          </Grid>
        
          
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
