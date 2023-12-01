import React from "react";
import { Grid, Box } from "@mui/material";
import {
  ProductPerformance,
  DailyActivities,
} from "./dashboard1-components";

const Dashboard1 = () => {
  return (
    <Box>
      <Grid container spacing={0}>
        <Grid item xs={12} lg={12}>
          <ProductPerformance />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard1;
