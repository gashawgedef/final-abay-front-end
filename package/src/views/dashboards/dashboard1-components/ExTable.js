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
import { branch_employees_salary } from "../../../services/employeeapi";
import {currentUser} from "../../../utils/tokenUtils"
  const ExTable = () => {
  const user = currentUser();
  // const branch=user.branch_id;
  const branch=120;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState([]);
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; 
  const currentYear = currentDate.getFullYear();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const employees = await branch_employees_salary(branch,currentMonth, currentYear);
        setData(employees);
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
              <Typography color="textSecondary" variant="h6">
                Emp_Id
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
                Transport Allowance
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                House Allowance
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
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontWeight: "500"
                    }}
                  >
                    {emp.id}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">
                    {emp.Employee.User.Person.first_name}{" "}
                    {emp.Employee.User.Person.middle_name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">{emp.position_id}</Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    {numeral(emp.salary).format("0,0")}
                  </Typography>
                </TableCell>
                <TableCell >
                  <Typography variant="h6">
                    {numeral(emp.allowance.transport).format("0,0")} Liter
                  </Typography>
                </TableCell>
                <TableCell >
                  <Typography variant="h6">
                    {numeral(emp.allowance.house).format("0,0")} ETB
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default ExTable;