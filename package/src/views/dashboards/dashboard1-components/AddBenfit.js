import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
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
  Dialog, DialogTitle, DialogContent, DialogActions
} from "@mui/material";
import { currentUser } from "../../../utils/tokenUtils";
import { branch_employees_salary } from "../../../services/employeeapi";
import { bulkTaxRecord } from "../../../services/taxapi";

const AddBenefit = () => {
  const user = currentUser();
  const navigate = useNavigate();
  const location = useLocation();
  const stateData = location.state;
  const year = stateData.year;
  const month = stateData.month;
  const currentMonth=`${month}/${year}`;
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const openConfirmationDialog = () => {
    setIsConfirmationOpen(true);
  };
  const closeConfirmationDialog = () => {
    setIsConfirmationOpen(false);
  };

  const [employeeData, setEmployeeData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const employees = await branch_employees_salary(120, month, year);
        const initializedEmployees = employees.map((employee) => ({
          ...employee,
          benefit: 0,
        }));
        setEmployeeData(initializedEmployees);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleSave = () => {
    const hasEmptyFields = employeeData.some(
      (employee) => employee.benefit === "" || employee.bonus === ""
    );
    if (hasEmptyFields) {
      alert("Error: Required fields are empty");
      return;
    }
    openConfirmationDialog();
  };

  const handleConfirmSave = () => {
   const taxRecords = []; 
   employeeData.forEach((employee, index) => {
     const emp = {
       fullname:
         employee.Employee.User.Person.first_name +
         " " +
         employee.Employee.User.Person.middle_name +
         " " +
         employee.Employee.User.Person.last_name,
       benefit: employee.benefit,
       branch: employee.branch_id,
       grade_id: employee.grade_id,
       step_id: employee.step_id,
       house: employee.allowance.house,
       transport: employee.allowance.transportAllowance,
       tin: employee.position_id,
       month: currentMonth,
       salary: employee.salary
     };
     taxRecords.push(emp);
   });
    bulkTaxRecord(taxRecords)
    .then(registerData => {
      closeConfirmationDialog();
      alert("You have sucussfully registered");
      navigate("/dashboards/tax-list", {state: stateData});
    })
    .catch(error => {
      alert("You have an error");
      console.error(error);
    });
  };

    const handleBenefitChange = (index, value) => {
    const updatedEmployeeData = [...employeeData];
    updatedEmployeeData[index].benefit= value;
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

  const handletransportAllowanceChange = (index, value) => {
    const updatedEmployeeData = [...employeeData];
    updatedEmployeeData[index].allowance.transportAllowance = value;
    setEmployeeData(updatedEmployeeData);
  };

  const handleHouseChange = (index, value) => {
    const updatedEmployeeData = [...employeeData];
    updatedEmployeeData[index].allowance.house = value;
    setEmployeeData(updatedEmployeeData);
  };

  const backToBasic = () => {
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
          <Typography variant="h3">
            {user.branch} Employee List Add Benfit for {month}/{year}
          </Typography>
          <Button color="success" variant="outlined" onClick={backToBasic}>
            {" "}
            Back
          </Button>
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
                  value={employee.allowance.transportAllowance}
                  onChange={(e) =>
                    handletransportAllowanceChange(index, e.target.value)
                  }
                  error={employee.allowance.transportAllowance === ""}
                  helperText={
                    employee.allowance.transportAllowance === ""
                      ? "Required"
                      : ""
                  }
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

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "1rem",
          margin: "1rem",
        }}
      >
        <Button onClick={backToBasic} color="error" variant="contained">
          Cancel
        </Button>
        <Button onClick={handleSave} color="success" variant="contained">
          Save
        </Button>
      </Box>

      <Dialog open={isConfirmationOpen} onClose={closeConfirmationDialog}>
  <DialogTitle>Confirm Save</DialogTitle>
  <DialogContent>
    Are you sure you want to save the employee data?
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

export default AddBenefit;
