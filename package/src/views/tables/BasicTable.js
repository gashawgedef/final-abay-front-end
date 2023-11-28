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
import { currentUser } from "../../utils/tokenUtils";
import { branch_employees_salary } from "../../services/employeeapi";

// Function to decode a JWT token (example implementation)
const BasicTable = () => {
  const user = currentUser();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleAddBenefit = () => {
    const data = {
      year: selectedYear,
      month: selectedMonth,
    };

    navigate("/tables/add-benefit", { state: data });
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const generateYearOptions = () => {
    const years = [];
    for (let year = 2010; year <= 2050; year++) {
      years.push(
        <MenuItem key={year} value={year}>
          {year}
        </MenuItem>
      );
    }
    return years;
  };

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
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Choose Year and Month</DialogTitle>

        <DialogContent>
          <Select
            value={selectedYear}
            onChange={handleYearChange}
            displayEmpty
          >
            <MenuItem value="">Select Year</MenuItem>
            {generateYearOptions()}
          </Select>

          <Select
            value={selectedMonth}
            onChange={handleMonthChange}
            displayEmpty
          >
            <MenuItem value="">Select Month</MenuItem>
            <MenuItem value={1}>January</MenuItem>
            <MenuItem value={2}>February</MenuItem>
            <MenuItem value={3}>March</MenuItem>
            {/* Add more months as needed */}
          </Select>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDialog} color="error">
            Cancel
          </Button>
          <Button onClick={handleAddBenefit} color="success">
            Open
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
export default BasicTable;