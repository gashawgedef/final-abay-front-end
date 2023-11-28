import React,{ useEffect, useState } from "react";
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
import { IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import {branch_employees,branch_employees_salary} from "../../../services/employeeapi"

const ExTable = () => {
  const[data,setData]=useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        //const employees = await branch_employees(67);
        const employees = await branch_employees_salary(67,2,2023);
        console.log(employees);
        // Set the data in the state
        setData(employees);
      } catch (error) {
        console.log(error);
      }
    };
 fetchData();
  }, []); // Empty dependency array to run the effect only once
  const handleEdit = (row) => {
    // Handle edit action for the row
    console.log("Edit row", row);
  };

  const handleDelete = (row) => {
    // Handle delete action for the row
    console.log("Delete row", row);
  };
  return (
    <TableContainer component={Paper}>
    <Table
      aria-label="simple table"
      sx={{
        mt: 3,
        whiteSpace: "nowrap",
      }}
    >
      <TableHead>
        <TableRow>
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

          <TableCell align="right">
            <Typography color="textSecondary" variant="h6">
              House Allowance
            </Typography>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
       
        {data.map((emp) => (
          <TableRow key={emp.id}>
            <TableCell>
              <Typography
                sx={{
                  fontSize: "15px",
                  fontWeight: "500",
                }}
              >
                {emp.id}
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="h6">{emp.Employee.User.Person.first_name} {emp.Employee.User.Person.middle_name} </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="h6">{emp.position_id}</Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                {emp.salary}
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="h6">{emp.allowance.transportAllowance}</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="h6">{emp.allowance.house}</Typography>
            </TableCell>
            <TableCell>
              <IconButton onClick={() => handleEdit()} aria-label="Edit" color="primary">
                <Edit />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </TableContainer>
  );
};

export default ExTable;
