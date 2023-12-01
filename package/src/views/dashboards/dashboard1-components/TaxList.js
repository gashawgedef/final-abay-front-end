import React, { useEffect, useState } from "react";
import numeral from "numeral";
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
  MenuItem
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { branch_employees_tax, month_list } from "../../../services/taxapi";
import { currentUser } from "../../../utils/tokenUtils";

const TaxList = () => {
  const user = currentUser();
  const branch = user.branch_id;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [monthOptions, setMonthOptions] = useState([]);
  const [editedData, setEditedData] = useState({});
 

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

  const monthOptionsList = async () => {
    const data = await month_list();
    const months = data.map((month, index) => ({
      month: month.month,
    }));
    return months;
  };

  const handleSearch = async () => {
    try {
      const data = await branch_employees_tax(branch, selectedMonth);
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (id) => {
    setEditedData((prevState) => ({
      ...prevState,
      [id]: true
    }));
  };
  
  const handleSave = (id) => {
    const editedRowData = editedData[id];
    // Perform the save operation with the editedRowData
    console.log(editedRowData);
  
    setEditedData((prevState) => ({
      ...prevState,
      [id]: false
    }));
  };
  const handleFieldChange = (event, id) => {
    const { name, value } = event.target;
  
    setEditedData((prevState) => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        [name]: value
      }
    }));
  };

  return (
    <Box>
      <Box display="flex" justifyContent="flex-end" alignItems="center">
        <Box display="flex" alignItems="right" gap={2}>
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
                <Typography color="textSecondary" variant="h6">House</Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">Benefit</Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Action
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
        <Typography align="left">{row.fullName}</Typography>
      </TableCell>
      <TableCell>
        {editedData[row.id] ? (
          <input
            type="text"
            name="tin"
            value={editedData[row.id]?.tin || row.tin}
            onChange={(event) => handleFieldChange(event, row.id)}
          />
        ) : (
          <Typography>{row.tin}</Typography>
        )}
      </TableCell>
      <TableCell>
        {editedData[row.id] ? (
          <input
            type="text"
            name="salary"
            value={editedData[row.id]?.salary || row.salary}
            onChange={(event) => handleFieldChange(event, row.id)}
          />
        ) : (
          <Typography>{numeral(row.salary).format("0,0.00")}</Typography>
        )}
      </TableCell>

      <TableCell>
        {editedData[row.id] ? (
          <input
            type="text"
            name="transport"
            value={editedData[row.id]?.transport || row.transport}
            onChange={(event) => handleFieldChange(event, row.id)}
          />
        ) : (
          <Typography>{numeral(row.transport).format("0,0.00")}</Typography>
        )}
      </TableCell>

      <TableCell>
        {editedData[row.id] ? (
          <input
            type="text"
            name="house"
            value={editedData[row.id]?.house || row.house}
            onChange={(event) => handleFieldChange(event, row.id)}
          />
        ) : (
          <Typography>{numeral(row.house).format("0,0.00")}</Typography>
        )}
      </TableCell>
     
      <TableCell>
        {editedData[row.id] ? (
          <input
            type="text"
            name="benefit"
            value={editedData[row.id]?.benefit || row.benefit}
            onChange={(event) => handleFieldChange(event, row.id)}
          />
        ) : (
          <Typography>{numeral(row.benefit).format("0,0.00")}</Typography>
        )}
      </TableCell>
      <TableCell>
        {editedData[row.id] ? (
          <Button
            variant="contained"
            onClick={() => handleSave(row.id)}
            color="success"
          >
            Save
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={() => handleEdit(row.id)}
            color="primary"
          >
            Edit
          </Button>
        )}
      </TableCell>
      </TableRow>
    ))}
</TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default TaxList;