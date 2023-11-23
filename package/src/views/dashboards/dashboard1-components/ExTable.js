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

// const products = [
//   {
//     id: "1",
//     name: "Sunil Joshi",
//     post: "Web Designer",
//     pname: "Elite Admin",
//     priority: "Low",
//     pbg: "primary.main",
//     budget: "3.9",
//   },
//   {
//     id: "2",
//     name: "Andrew McDownland",
//     post: "Project Manager",
//     pname: "Real Homes WP Theme",
//     priority: "Medium",
//     pbg: "secondary.main",
//     budget: "24.5",
//   },
//   {
//     id: "3",
//     name: "Christopher Jamil",
//     post: "Project Manager",
//     pname: "MedicalPro WP Theme",
//     priority: "High",
//     pbg: "error.main",
//     budget: "12.8",
//   },
//   {
//     id: "4",
//     name: "Nirav Joshi",
//     post: "Frontend Engineer",
//     pname: "Hosting Press HTML",
//     priority: "Critical",
//     pbg: "success.main",
//     budget: "2.4",
//   },
// ];

const ExTable = () => {
  const[data,setData]=useState([])
  useEffect(()=>{
    fetch('http://127.0.0.1:8000/emplyee_tax/')
    .then(response=>response.json())
    .then(data=>setData(data))
    .catch(error=>console.log(error))
  })

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
             Id Num
            </Typography>
          </TableCell>
          <TableCell>
            <Typography color="textSecondary" variant="h6">
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
              Additional Benefits
            </Typography>
          </TableCell>
          <TableCell align="right">
            <Typography color="textSecondary" variant="h6">
              Taxable Income
            </Typography>
          </TableCell>
          <TableCell align="right">
            <Typography color="textSecondary" variant="h6">
              Tax With Hold
            </Typography>
          </TableCell>
          <TableCell align="right">
            <Typography color="textSecondary" variant="h6">
              Net Pay
            </Typography>
          </TableCell>
          <TableCell align="right">
            <Typography color="textSecondary" variant="h6">
              Branch Name
            </Typography>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((product) => (
          <TableRow key={product.id}>
            <TableCell>
              <Typography
                sx={{
                  fontSize: "15px",
                  fontWeight: "500",
                }}
              >
                {product.id}
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="h6">{product.employee_name}k</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="h6">{product.tin_no}</Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                {product.basic_salary}
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="h6">{product.transport_allowance}  Birr</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="h6">{product.additional_benefits} Birr</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="h6">{product.taxable_income} Birr</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="h6">{product.tax_with_hold} Birr</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="h6">{product.net_pay} Birr</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="h6">{product.additional_benefits} Birr</Typography>
            </TableCell>
            <TableCell>
              <IconButton onClick={() => handleEdit()} aria-label="Edit" color="primary">
                <Edit />
              </IconButton>
              <IconButton onClick={() => handleDelete()} aria-label="Delete" color="error">
                <Delete />
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
