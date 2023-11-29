import React, { useEffect, useState } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  TablePagination,
  Paper,
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { getPrice } from "../../services/gaspriceapi";

const PriceListTable = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPrice();
        setData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleEdit = (row) => {
    // Handle edit action for the row
    console.log("Edit row", row);
  };

  const handleDelete = (row) => {
    // Handle delete action for the row
    console.log("Delete row", row);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const count = data.length;

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
                #
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Price
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Month
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Year
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Year Month
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Status
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Action
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(data
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((price, index) => (
              <TableRow key={price.id}>
                <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
                <TableCell>
                  <Typography variant="h6">{price.price}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">{price.month}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">{price.year}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">{price.yearmonth}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">{price.status}</Typography>
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleEdit(price)}
                    aria-label="Edit"
                    color="primary"
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(price)}
                    aria-label="Delete"
                    color="error"
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            )))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25, 50, 100]} // Include 5 in the rows per page dropdown
      />
    </TableContainer>
  );
};

export default PriceListTable;