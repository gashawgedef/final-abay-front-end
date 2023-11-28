import React, { useEffect, useState } from "react";
import {
  CardContent,
  Box,
  Typography,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import ExTable from "../dashboards/dashboard1-components/ExTable";
import AddIcon from "@mui/icons-material/Add";
import { currentUser } from "../../utils/tokenUtils";
import { branch_employees_salary } from "../../services/employeeapi";

// Function to decode a JWT token (example implementation)

const BasicTable = () => {
  const user = currentUser();
  const [openDialog, setOpenDialog] = useState(false);
  const [overtime, setOvertime] = useState("");
  const [bonus, setBonus] = useState("");
  const [employeeData, setEmployeeData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const employees = await branch_employees_salary(120, 2, 2023);
        setEmployeeData(employees);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSave = () => {
    // Check if any required fields are empty
    const hasEmptyFields = employeeData.some(
      (employee) => employee.benefit === "" || employee.bonus === ""
    );

    if (hasEmptyFields) {
      // Display an error message or handle the empty fields
      console.log("Error: Required fields are empty");
      return;
    }

    // Perform save logic here
    // Access employeeData array and save all the benefits and bonuses together

    // Reset the values
    setOvertime("");
    setBonus("");
    setOpenDialog(false);

    // Use the obtained data as per your requirement
    console.log("Employee Data:", employeeData);
  };

  const handleBenefitChange = (index, value) => {
    const updatedEmployeeData = [...employeeData];
    updatedEmployeeData[index].benefit = value;
    setEmployeeData(updatedEmployeeData);
  };

  const handleBonusChange = (index, value) => {
    const updatedEmployeeData = [...employeeData];
    updatedEmployeeData[index].bonus = value;
    setEmployeeData(updatedEmployeeData);
  };

  return (
    <Box>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h3">{user.branch} Employee List</Typography>
          <Button color="success" variant="outlined" onClick={handleOpenDialog}>
            <AddIcon />
            Add Benefit
          </Button>
        </Box>
        <Box sx={{ overflow: "auto", mt: 3 }}>
          <ExTable />
        </Box>
      </CardContent>
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth>
        <DialogTitle>Add Taxable Benefits</DialogTitle>

        <DialogContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Taxable Benefit</TableCell>
                <TableCell>None Taxable Benefit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employeeData.map((employee, index) => (
                <TableRow key={employee.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    {employee.Employee.User.Person.first_name}{" "}
                    {employee.Employee.User.Person.last_name}
                  </TableCell>
                  <TableCell>
                    <TextField 
                    type="number"
                    size="small"
                     color="secondary"
                      value={employee.benefit}
                      onChange={(e) =>
                        handleBenefitChange(index, e.target.value)
                      }
                      error={employee.benefit === ""}
                      helperText={employee.benefit === "" ? "Required" : ""}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                    type="number"
                      size="small"
                      color="secondary"
                      value={employee.bonus}
                      onChange={(e) => handleBonusChange(index, e.target.value)}
                      error={employee.bonus === ""}
                      helperText={employee.bonus === "" ? "Required" : ""}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} variant="contained" color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            color="success"
            disabled={
              !employeeData.every(
                (employee) => employee.benefit !== "" && employee.bonus !== ""
              )
            }
            >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BasicTable;
