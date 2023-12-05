import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CardContent,
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem
} from "@mui/material";
import ExTable from "../dashboards/dashboard1-components/ExTable";
import AddIcon from "@mui/icons-material/Add";
import {currentUser} from "../../utils/tokenUtils";
import { is_branch_employees_tax_exist } from "../../services/taxapi";
const BasicTable = () => {
  const user = currentUser();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedYear, setSelectedYear] = useState(2023);
  const [selectedMonth, setSelectedMonth] = useState(11);
  const branch=user.branch_id;
  //const branch=120;
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleAddBenefit = async () => {
    const data = {
      year: selectedYear,
      month: selectedMonth,
    };
    const month=`${selectedMonth}/${selectedYear}`;
    const record = await is_branch_employees_tax_exist(branch,month);
     if(record==0){
     navigate("/tables/add-benefit", { state: data });
     }
     else{
      alert("You registered this month data befor please check your selection");
     }
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const generateYearOptions = () => {
    const years = [];
    for (let year = 2010; year <= 2035; year++) {
      years.push(
        <MenuItem key={year} value={year}>
          {year}
        </MenuItem>
      );
    }
    return years;
  };

  const isButtonDisabled = selectedYear === "" || selectedMonth === "";

  return (
    <Box>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h3">{user.branch} Employee List</Typography>
          <Button color="success" variant="outlined" onClick={handleOpenDialog}>
            <AddIcon />
            Add Benefit
          </Button>
        </Box>
        <Box sx={{ overflow: "auto", mt: 3 }}>
           <ExTable />
        </Box>
      </CardContent>
      <Dialog open={openDialog} onClose={handleCloseDialog}  >
        <DialogTitle sx={{ textAlign: "center" }} >Choose Year and Month</DialogTitle>

        <DialogContent  sx={{ textAlign: "center" }}>
          <Box sx={{ marginBottom: "1rem" }}>
            <Select
              value={selectedYear}
              onChange={handleYearChange}
              displayEmpty
              sx={{ width: "400px" }}
            >
              <MenuItem value="">Select Year</MenuItem>
              {generateYearOptions()}
            </Select>
          </Box>

          <Select
            value={selectedMonth}
            onChange={handleMonthChange}
            displayEmpty
            sx={{ width: "400px" }}
          >
            <MenuItem value="">Select Month</MenuItem>
            <MenuItem value={1}>January</MenuItem>
            <MenuItem value={2}>February</MenuItem>
            <MenuItem value={3}>March</MenuItem>
            <MenuItem value={4}>April</MenuItem>
            <MenuItem value={5}>May</MenuItem>
            <MenuItem value={6}>June</MenuItem>
            <MenuItem value={7}>July</MenuItem>
            <MenuItem value={8}>August</MenuItem>
            <MenuItem value={9}>September</MenuItem>
            <MenuItem value={10}>October</MenuItem>
            <MenuItem value={11}>November</MenuItem>
            <MenuItem value={12}>December</MenuItem>
          </Select>
        </DialogContent>

        <DialogActions sx={{ textAlign: "center" }}>
  <Button onClick={handleCloseDialog} variant="contained" color="error">
    Cancel
  </Button>
  <Button onClick={handleAddBenefit} variant="contained" color="success" disabled={isButtonDisabled}>
    Open
  </Button>
</DialogActions>
      </Dialog>
    </Box>
  );
};

export default BasicTable;