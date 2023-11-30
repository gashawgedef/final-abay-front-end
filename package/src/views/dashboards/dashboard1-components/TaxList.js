import React, { useEffect, useState } from "react";
import numeral from "numeral";
import * as XLSX from "xlsx";
import PrintIcon from "@mui/icons-material/Print";
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  TablePagination,
  Paper,
  Select,
  MenuItem,
  Autocomplete,
  TextField

} from "@mui/material";
import { useLocation } from "react-router-dom";
import { branch_employees_tax, month_list } from "../../../services/taxapi";
import { ERP_Branch_List } from "../../../services/erpBranchapi";
import { currentUser } from "../../../utils/tokenUtils";

const TaxList = () => {
  const user = currentUser();
  // const branch=user.branch_id;
  const branch = 120;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [branchOptions, setBranchOptions] = useState([]);
  const [monthOptions, setMonthOptions] = useState([]);
  const [data, setData] = useState([]);
  const location = useLocation();
  const stateData = location.state;
  const currentDate = new Date();
  const currentmonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();
  let currentMonth = `${currentmonth}/${currentYear}`;
  if (stateData !== null) {
    const year = stateData.year;
    const month = stateData.month;
    currentMonth = `${month}/${year}`;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await branch_employees_tax(branch, currentMonth);
        setData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchBranchOptions = async () => {
      const options = await BranchOptionsList();
      setBranchOptions(options);
    };

    fetchBranchOptions();
  }, []);

  useEffect(() => {
    const fetchMonthOptions = async () => {
      const options = await monthOptionsList();
      setMonthOptions(options);
    };

    fetchMonthOptions();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };



  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleBranchChange = (event, value) => {
    setSelectedBranch(value);
  };

  const BranchOptionsList = async () => {
    const data = await ERP_Branch_List();
    const branches = data.map((branch) => ({
      id: branch.id,
      name: branch.name,
    }));
    return branches;
  };

  const monthOptionsList = async () => {
    const data = await month_list();
    const months = data.map((month, index) => ({
      month: month.month,
    }));
    return months;
  };

  const handleSearch = async () => {
    try {
      const data = await branch_employees_tax(selectedBranch.id, selectedMonth);
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleExport = () => {
    const headers = ["Name", "Tin", "House","Transport","Benefit"]
    const newdata=[headers, ...data.map((item) => [item.fullName, item.tin, item.house,item.transport,item.benefit])];
    // Create a new workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(newdata);
  
    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  
    // Generate an Excel file
    const excelBuffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
  
    // Save the Excel file
    const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    const fileName = "export.xlsx";
    if (navigator.msSaveBlob) {
      // For IE 10 and above
      navigator.msSaveBlob(blob, fileName);
    } else {
      // For other browsers
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
      URL.revokeObjectURL(link.href);
    }
  };

  return (
    <Box>
   <Box display="flex" justifyContent="flex-end" alignItems="center">
    <Box display="flex" alignItems="right" gap={2}>
      <Autocomplete
        value={selectedBranch}
        onChange={handleBranchChange}
        options={branchOptions}
        getOptionLabel={(option) => option.name||"select Branch"}
        renderInput={(params) => <TextField {...params}  />}
        sx={{ width: "200px" }}
      />
    
      <Select
        value={selectedMonth}
        onChange={handleMonthChange}
        displayEmpty
        sx={{ width: "200px" }}
      >
        <MenuItem value="">Select Month</MenuItem>
        {monthOptions.map((option) => (
          <MenuItem key={option.month} value={option.month}>
            {option.month}
          </MenuItem>
        ))}
      </Select>
    </Box>
  
    <Box ml={2}>
      <Button onClick={handleSearch} variant="contained" color="success">
        Search
      </Button>
    </Box>
    <Box ml={2}>
      <Button onClick={handleExport} startIcon={<PrintIcon />} variant="contained" color="secondary">
        Export
      </Button>
    </Box>
  </Box>
 
    <TableContainer component={Paper}>
      <Table
        aria-label="simple table"
        sx={{
          mt: 3,
          whiteSpace: "nowrap"
        }}
      >
        <TableHead>
          <TableRow>
          <TableCell>
      <Typography color="textSecondary" variant="h6">
        #
      </Typography>
    </TableCell>
            <TableCell>
              <Typography align="left" color="textSecondary" variant="h6">
                Employee Name
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Tin Number
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Basic Salary
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Transport 
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                House 
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Benefit
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Branch
              </Typography>
            </TableCell>

            <TableCell>
              <Typography color="textSecondary" variant="h6">
                month
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((emp,index) => (
              <TableRow key={emp.id}>
                <TableCell>
          <Typography variant="h6">
            {page * rowsPerPage + index + 1}
          </Typography>
        </TableCell>
               
                <TableCell>
                  <Typography variant="h6">
                    {emp.fullName}
                    
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">{emp.tin}</Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    {numeral(emp.salary).format("0,0")}
                  </Typography>
                </TableCell>
                <TableCell >
                  <Typography variant="h6">
                    {numeral(emp.transport).format("0,0")} 
                  </Typography>
                </TableCell>
                <TableCell >
                  <Typography variant="h6">
                    {numeral(emp.house).format("0,0")} 
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                  {numeral(emp.benefit).format("0,0")} 
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography>
                  {emp.branch}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                  {emp.month} 
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
    </Box>
  );
};
export default TaxList;