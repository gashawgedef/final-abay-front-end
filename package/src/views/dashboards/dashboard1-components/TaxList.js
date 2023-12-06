import React, { useEffect, useState } from "react";
import numeral from "numeral";
import {
  Box,
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
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,AlertTitle
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { bulkTaxUpdateInfo,updateTaxinfo,branch_employees_tax, month_list,branch_employee_tax_by_status} from "../../../services/taxapi";
import { currentUser } from "../../../utils/tokenUtils";
import toast from 'react-hot-toast'

const TaxList = () => {
  const user = currentUser();
  const branch = user.branch_id;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [monthOptions, setMonthOptions] = useState([]);
  const [editedData, setEditedData] = useState({});
  const [data, setData] = useState([]);
  const [getDraftData,setDraftData] = useState([]);
  const location = useLocation();
  const stateData = location.state;
  const currentDate = new Date();
  const currentmonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();
  let currentMonth = `${currentmonth}/${currentYear}`;

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const openConfirmationDialog = () => {
    setIsConfirmationOpen(true);
  };
  const closeConfirmationDialog = () => {
    setIsConfirmationOpen(false);
  };

  const status="Draft";
  if (stateData !== null) {
    const year = stateData.year;
    const month = stateData.month;
    currentMonth = `${month}/${year}`;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await branch_employees_tax(branch,currentMonth);
        const draftData=await branch_employee_tax_by_status(branch,currentMonth,status);
        setData(data);
        setDraftData(draftData);
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
      const data = await branch_employees_tax(branch,selectedMonth);
      const draftData=await branch_employee_tax_by_status(branch,selectedMonth,status);
      setDraftData(draftData);
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
  
  const handleSave = async (id) => {
    const editedRowData = {
      ...editedData[id],
      id: id
    };
    const isEmpty = Object.keys(editedRowData).length === 1; // Check if only the 'id' property exists
    if (isEmpty) {
      toast.error("Please Edit the field you want to Update first");
      return 0;
    }
    try {
      await updateTaxinfo(editedRowData);
      toast.success("You have successfully updated");
      window.location.reload();
    } catch (error) {
      toast.error("Error Check Your data");
      //console.error("Error updating employee data:", error);
      // Handle error here
    }
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


  const  submitToHeadoffice  = () => {
    if(getDraftData.length===0){
      toast.error("You either submit data befor or you try empty data");
      return 0;
      }
      openConfirmationDialog();
    
  }
 const handleConfirmSave =async()=>{
    if(getDraftData.length===0){
      toast.error("You either submit data befor or you try empty data");
      return 0;
      }
    const newData = getDraftData.map((data) => ({
      id: data.id,
      status: "Submitted"
    }));

    try {
      await bulkTaxUpdateInfo(newData);
      toast.success("You have successfully submitte the data");
      closeConfirmationDialog();
      window.location.reload();
    } catch (error) {
      toast.error("Error Check Your data");
      //console.error("Error updating employee data:", error);
      // Handle error here
    }
  }

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
          <TextField
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
          <TextField
          type="number"
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
          <TextField
          type="number"
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
          <TextField
          type="number"
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
          <TextField
          type="number"
            name="benefit"
            value={editedData[row.id]?.benefit || row.benefit}
            onChange={(event) => handleFieldChange(event, row.id)}
          />
        ) : (
          <Typography>{numeral(row.benefit).format("0,0.00")}</Typography>
        )}
      </TableCell>
      
      <TableCell>
      {row.status=='Draft'||row.status=='Rejected'?(
        <Typography>
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
        </Typography>):(<Typography>{row.status}</Typography>)}
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

      <Button variant="contained"
            onClick={() =>submitToHeadoffice()}
            color="primary">
            Submit Data
          </Button>


          <Dialog open={isConfirmationOpen} onClose={closeConfirmationDialog}>
        <DialogTitle>Confirm Save</DialogTitle>
        <DialogContent>
          Are you sure you want to submitte the employee data?
        </DialogContent>
        <DialogActions>
          <Button onClick={closeConfirmationDialog} color="error">
            Cancel
          </Button>
          <Button onClick={handleConfirmSave} color="success">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TaxList;