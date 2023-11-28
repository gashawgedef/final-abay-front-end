import React, { useEffect, useState } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
} from "@mui/material";
import { IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const PriceListTable = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://10.1.50.152:8080/price")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.log(error));
  });

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
                Price
              </Typography>
            </TableCell>

            <TableCell >
              <Typography color="textSecondary" variant="h6">
                Month
              </Typography>
            </TableCell>
            <TableCell >
              <Typography color="textSecondary" variant="h6">
                Year
              </Typography>
            </TableCell>

            <TableCell >
              <Typography color="textSecondary" variant="h6">
                Year Month
              </Typography>
            </TableCell>
            <TableCell >
              <Typography color="textSecondary" variant="h6">
                Status
              </Typography>
            </TableCell>
            <TableCell >
              <Typography color="textSecondary" variant="h6">
                Action
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((price) => (
            <TableRow key={price.id}>
              <TableCell>
                <Typography variant="h6" >
                  {price.price}
                </Typography>
              </TableCell>
              <TableCell >
                <Typography variant="h6">{price.month}</Typography>
              </TableCell>
              <TableCell >
                <Typography variant="h6">{price.year}</Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  {price.status}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  {price.yearmonth}
                </Typography>
              </TableCell>

              <TableCell>
                <IconButton
                  onClick={() => handleEdit()}
                  aria-label="Edit"
                  color="primary"
                >
                  <Edit />
                </IconButton>
                <IconButton
                  onClick={() => handleDelete()}
                  aria-label="Delete"
                  color="error"
                >
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

export default PriceListTable;
