import React, { useEffect, useState } from "react";
import numeral from "numeral";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  TablePagination,
  Paper
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { branch_employees_tax } from "../../../services/taxapi";
import {currentUser} from "../../../utils/tokenUtils"
 
  const TaxList = () => {
  const user = currentUser();
  // const branch=user.branch_id;
  const branch=120;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState([]);
  const location = useLocation();
  const stateData = location.state;
  const currentDate = new Date();
 const currentmonth = currentDate.getMonth() + 1; 
 const currentYear = currentDate.getFullYear();
 let currentMonth=`${currentmonth}/${currentYear}`;
  if (stateData !== null) {
    const year = stateData.year;
    const month = stateData.month;
    currentMonth=`${month}/${year}`;
  } 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await branch_employees_tax(branch,currentMonth);
        setData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <TableContainer component={Paper}>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
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
    </TableContainer>
  );
};
export default TaxList;