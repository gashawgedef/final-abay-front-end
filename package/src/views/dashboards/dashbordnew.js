import React, { useEffect, useState } from "react";
import {
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
  Box,
  Select,
  MenuItem,
} from "@mui/material";
import { currentUser } from "../../utils/tokenUtils";
import { get_Submit_branches, month_list, branch_employee_tax_by_status } from "../../services/taxapi";
import { Addis_Branch_List, Branch_fc_code } from "../../services/erpBranchapi";
import { test_branch_type } from "../../utils/constants";
import PdfViewer from '../../components/PdfViewer';  // Adjust the import path accordingly

const Dashboard1 = () => {
  const user = currentUser();
  const branch = user.branch_id;
  const branch_type = user.branch_type;
  const currentDate = new Date();
  const currentmonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();
  let currentMonth = `${currentmonth}/${currentYear}`;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState([]);
  const [allBranch, setBranch] = useState([]);
  const [fc_code, setFcCode] = useState(133);
  const [submittedData, setsubmittedData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [monthOptions, setMonthOptions] = useState([]);
  const [showPdf, setShowPdf] = useState(false);
  const pdfUrl = "path/to/your/pdf-file.pdf"; // Replace with your PDF file path
  
  useEffect(() => {
    const fetchFcCode = async () => {
      try {
        const fccode = await Branch_fc_code(branch);
        setFcCode(fccode);
      } catch (error) {
        console.error('Error fetching fc_code:', error);
      }
    };
  
    if (branch) { // Ensure branch is valid before fetching
      fetchFcCode();
    }
  }, [branch]);

  useEffect(() => {
    const fetchData = async () => {    
      try {
        const allBranchs = await Addis_Branch_List();
        setBranch(allBranchs);
        const submittedBranch = await get_Submit_branches(selectedMonth);
        setData(submittedBranch);
        if (fc_code) {
          const data = await branch_employee_tax_by_status(fc_code, selectedMonth, "Submitted");
          setsubmittedData(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [fc_code, selectedMonth]);

  useEffect(() => {
    const fetchMonthOptions = async () => {
      const options = await monthOptionsList();
      setMonthOptions(options);
    };

    fetchMonthOptions();
  }, []);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getFc_code = async (branch_id) => {
    let fc_code = 0;
    try {
      const branch = await Branch_fc_code(branch_id);
      fc_code = branch.fc_code;
    } catch (error) {
      console.log(error);
    }

    return fc_code;
  }

  const monthOptionsList = async () => {
    const data = await month_list();
    return data.map((month) => ({
      month: month.month,
    }));
  };

  const handleSearch = async () => {
    try {
      const data = await get_Submit_branches(selectedMonth);
      setData(data);
      const submitedTaxData = await branch_employee_tax_by_status(fc_code, selectedMonth, "Submitted");
      setsubmittedData(submitedTaxData);
    } catch (error) {
      console.log(error);
    }
  };

  const doesBranchIdExist = (id) => {
    return data.some(branch => branch.branchId == id);
  };

  return (
    <>
      {branch_type === test_branch_type ? (
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
              <Button onClick={handleSearch} variant="contained" color="success">
                Search
              </Button>
            </Box>
          </Box>
          <Box display="flex" flexDirection="column" justifyContent="left" alignItems="left">
            <TableContainer
              component={Paper}
              sx={{
                mt: 3,
                whiteSpace: "nowrap",
                width: "600px",
              }}
            >
              <caption>
                Number of Branches Submitted for the month <strong style={{ color: "green", fontSize: 20 }}>
                  {selectedMonth} is {data.length}
                </strong>
              </caption>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography color="textSecondary" variant="h6">
                        #
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography align="left" color="textSecondary" variant="h4">
                        Branch Name
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="textSecondary" variant="h4">
                        Branch ID
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="textSecondary" variant="h4">
                        Status
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* Manually add the "Head Office" row with fc_code 000 */}
                  <TableRow key="head-office">
                    <TableCell>
                      <Typography>1</Typography> {/* Static entry index */}
                    </TableCell>
                    <TableCell>
                      <Typography align="left">Head Office</Typography>
                    </TableCell>
                    <TableCell>000</TableCell>
      
                    <TableCell style={{ color: doesBranchIdExist('000') ? 'green' : '#D2691E' }}>
                      {doesBranchIdExist('000') ? "submitted" : "Not Submitted"}
                    </TableCell>
                  </TableRow>

                  {/* Dynamically add other branches */}
                  {allBranch
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const isSubmitted = doesBranchIdExist(row.fc_code);
                      return (
                        <TableRow key={row.id}>
                          <TableCell>
                            <Typography>{index + 2}</Typography> {/* Increment by 2 to account for "Head Office" */}
                          </TableCell>
                          <TableCell>
                            <Typography align="left">{row.name}</Typography>
                          </TableCell>
                          <TableCell>{row.fc_code}</TableCell>
                          <TableCell style={{ color: isSubmitted ? 'green' : '#D2691E' }}>
                            {isSubmitted ? "submitted" : "Not Submitted"}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                component="div"
                count={allBranch.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableContainer>
          </Box>
          <Box mt={4}>
            <Button onClick={() => setShowPdf(!showPdf)} variant="contained" color="primary">
              {showPdf ? "Hide User Guidelines" : "Show User Guidelines"}
            </Button>
            {showPdf && <PdfViewer pdfUrl={pdfUrl} />}
          </Box>
        </Box>
      ) : (
        <TableContainer
          component={Paper}
          sx={{
            mt: 3,
            whiteSpace: "nowrap",
            width: "600px",
          }}
        >
          <h1>Welcome to Abay Bank Branch Pages</h1>
        </TableContainer>
      )}
    </>
  );
};

export default Dashboard1;
