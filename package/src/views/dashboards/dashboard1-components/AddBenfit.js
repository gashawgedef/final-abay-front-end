import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import ExTable from "../dashboard1-components/ExTable";
import AddIcon from "@mui/icons-material/Add";
import { currentUser } from "../../../utils/tokenUtils";
import { branch_employees_salary } from "../../../services/employeeapi";

// Function to decode a JWT token (example implementation)
const AddBenefit = () => {
  const user = currentUser();
  const navigate = useNavigate();
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

  const handleTINChange = (index, value) => {
    const updatedEmployeeData = [...employeeData];
    updatedEmployeeData[index].position_id = value;
    setEmployeeData(updatedEmployeeData);
  };

  const handleSalaryChange = (index, value) => {
    const updatedEmployeeData = [...employeeData];
    updatedEmployeeData[index].salary = value;
    setEmployeeData(updatedEmployeeData);
  };

  const handleTransportChange = (index, value) => {
    const updatedEmployeeData = [...employeeData];
    updatedEmployeeData[index].allowance.transport = value;
    setEmployeeData(updatedEmployeeData);
  };

  const handleHouseChange = (index, value) => {
    const updatedEmployeeData = [...employeeData];
    updatedEmployeeData[index].allowance.house = value;
    setEmployeeData(updatedEmployeeData);
  };

  const handleAddBenfit = () => {
    navigate("/tables/basic-table");
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
          <Button color="success" variant="outlined" onClick={handleAddBenfit}> Back</Button>
        </Box>
      </CardContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>TIN</TableCell>
                <TableCell>Salary</TableCell>
                <TableCell>Transport</TableCell>
                <TableCell>House</TableCell>
                <TableCell>Benefit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employeeData.map((employee, index) => (
                <TableRow key={employee.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    {employee.Employee.User.Person.first_name} 
                    {employee.Employee.User.Person.last_name}
                  </TableCell>
                  <TableCell>
                    <TextField
                      type="number"
                      size="small"
                      color="secondary"
                      value={employee.position_id}
                      onChange={(e) => handleTINChange(index, e.target.value)}
                      error={employee.position_id === ""}
                      helperText={employee.position_id === "" ? "Required" : ""}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      type="number"
                      size="small"
                      color="secondary"
                      value={employee.salary}
                      onChange={(e) => handleSalaryChange(index, e.target.value)}
                      error={employee.salary === ""}
                      helperText={employee.salary === "" ? "Required" : ""}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      type="number"
                      size="small"
                      color="secondary"
                      value={employee.allowance.transport}
                      onChange={(e) => handleTransportChange(index, e.target.value)}
                      error={employee.allowance.transport === ""}
                      helperText={employee.allowance.transport === "" ? "Required" : ""}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      type="number"
                      size="small"
                      color="secondary"
                      value={employee.allowance.house}
                      onChange={(e) => handleHouseChange(index, e.target.value)}
                      error={employee.allowance.house === ""}
                      helperText={employee.allowance.house === "" ? "Required" : ""}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      type="number"
                      size="small"
                      color="secondary"
                      value={employee.benefit}
                      onChange={(e) => handleBenefitChange(index, e.target.value)}
                      error={employee.benefit === ""}
                      helperText={employee.benefit === "" ? "Required" : ""}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
       

        
          <Button onClick={handleCloseDialog} color="error">
            Cancel
          </Button>
          <Button onClick={handleSave} color="success">
            Save
          </Button>
        
     
    </Box>
  );
};

export default AddBenefit;