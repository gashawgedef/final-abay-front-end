import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  TablePagination,
  Paper,
  Card,
  Grid,
  Box,
  Select,
  MenuItem,
  Avatar,
} from "@mui/material";
import { currentUser } from "../../utils/tokenUtils";
import { ProductPerformance, DailyActivities } from "./dashboard1-components";
import { get_Submit_branches, month_list,branch_employee_tax_by_status} from "../../services/taxapi";
const Dashboard1 = () => {
  const user = currentUser();
  const branch = user.branch_id;
  const branch_type=user.branch_type;
  const currentDate = new Date();
  const currentmonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();
  let currentMonth = `${currentmonth}/${currentYear}`;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState([]);
  const [submittedData, setsubmittedData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [monthOptions, setMonthOptions] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await get_Submit_branches(selectedMonth);
        setData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await branch_employee_tax_by_status(branch,selectedMonth,"Submitted");
        setsubmittedData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchMonthOptions = async () => {
      const options = await monthOptionsList();
      setMonthOptions(options);
    };

    fetchMonthOptions();
  }, []);

  const handleMonthChange = async(event) => {
    setSelectedMonth(event.target.value);
    const data = await get_Submit_branches(selectedMonth);
    setData(data);
    const submitedTaxData = await branch_employee_tax_by_status(branch,selectedMonth,"Submitted");
    setsubmittedData(submitedTaxData);

  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const monthOptionsList = async () => {
    const data = await month_list();
    const months = data.map((month, index) => ({
      month: month.month,
    }));
    return months;
  };
  // const handleSearch = async () => {
  //   try {
  //     const data = await get_Submit_branches(selectedMonth);
  //     setData(data);
  //     const submitedTaxData = await branch_employee_tax_by_status(branch,selectedMonth,"Submitted");
  //     setsubmittedData(submitedTaxData);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  return (
    <Box>
      <Box display="flex" justifyContent="flex-start" alignItems="center">
        <Box display="flex" alignItems="right" gap={2}>
          <Select
            value={selectedMonth}
            onChange={handleMonthChange}
            displayEmpty
            sx={{ width: "200px" }}
          >
            <MenuItem value={selectedMonth}>{selectedMonth}</MenuItem>
            {monthOptions.map((option) => (
              <MenuItem key={option.month} value={option.month}>
                {option.month}
              </MenuItem>
            ))}
          </Select>
        </Box>
         
        <Box ml={2}>
          {/* <Button onClick={handleSearch} variant="contained" color="success">
            Search
          </Button> */}
        </Box>
      </Box>
      <Box display="flex" flexDirection="column" justifyContent="left" alignItems="left">
      {branch_type=="HQ"?(
      <TableContainer
        component={Paper}
        sx={{
          mt: 3,
          whiteSpace: "nowrap",
          width: "600px",
        }}
      >
        <caption>
    Number of Branches Submitted for the month  <strong style={{ color: "red",fontSize:20 }}>
     {selectedMonth} is   {data.length}
    </strong>
  </caption>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  #
                </Typography>
              </TableCell>
              <TableCell>
                <Typography align="left" color="textSecondary" variant="h6">
                  Branch Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Branch ID
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell>
                    <Typography>{index + 1}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography align="left">{row.branchName}</Typography>
                  </TableCell>
                  <TableCell>{row.branchId}</TableCell>
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
      ):(
        <TableContainer
        component={Paper}
        sx={{
          mt: 3,
          whiteSpace: "nowrap",
          width: "600px",
        }}
      >
        <caption>
    Number of Employes Tax Submitted for the month  <strong style={{ color: "red",fontSize:20 }}>
     {selectedMonth} is   {submittedData.length}
    </strong>
  </caption>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  #
                </Typography>
              </TableCell>
              <TableCell>
                <Typography align="left" color="textSecondary" variant="h6">
                   Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                status
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {submittedData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell>
                    <Typography>{index + 1}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography align="left">{row.fullName}</Typography>
                  </TableCell>
                  <TableCell>{row.status}</TableCell>
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




      )}

      </Box>
    </Box>
  );
};

export default Dashboard1;
