import React, { useState } from "react";
import {
  CardContent,
  Box,
  Typography,
  Button,
  Modal,
  TextField,
  Grid,
} from "@mui/material";
import ExTable from "../dashboards/dashboard1-components/ExTable";
import AddIcon from '@mui/icons-material/Add';
import Axios from 'axios'
import {currentUser} from "../../utils/tokenUtils"


// Function to decode a JWT token (example implementation)

const BasicTable = () => {
const user = currentUser();
console.log(user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValues, setInputValues] = useState({
    employee_name: "",
    tin_no: "",
    basic_salary: "",
    transport_allowance: "",
    additional_benefits: "",
    taxable_income: "",
    tax_with_hold: "",
    net_pay: "",
    branch_name: "",
  });

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  // const handleInputChange = (event) => {
  //   setInputValues({
  //     ...inputValues,
  //     [event.target.name]: event.target.value,
  //   });
  // };
  
  const handleSave = async (e) => {
    e.preventDefault();

    const { employee_name,  tin_no, basic_salary, transport_allowance,  additional_benefits, taxable_income, tax_with_hold, net_pay,branch_name } = inputValues;
    const data = { employee_name,  tin_no, basic_salary, transport_allowance,  additional_benefits, taxable_income, tax_with_hold, net_pay,branch_name };

    try {
      await Axios.post('http://127.0.0.1:8000/emplyee_tax/', data);
      console.log('Data submitted successfully');
    } catch (error) {
      console.error('Error submitting data:', error);
    }
    setIsModalOpen(false);
  };
  
  // let handleSave = async (e) => {
  //   e.preventDefault();
  //   try {
  //     let res = await fetch("http://127.0.0.1:8000/emplyee_tax/", {
  //       method: "POST",
  //       body: JSON.stringify({
  //         employee_name:employee_name,
  //         tin_no: employee_name,
  //         basic_salary: basic_salary,
  //         transport_allowance: transport_allowance,
  //         additional_benefits: additional_benefits,
  //         taxable_income: taxable_income,
  //         tax_with_hold: tax_with_hold,
  //         net_pay: net_pay,
  //         branch_name: branch_name
  //       }),
  //     });
  //     let resJson = await res.json();
  //     if (res.status === 200) {
  //       setEmployeeName("");
  //       setTinNumber("");
  //       setBasicSalary("");
  //       setAdditionalBenefits("");
  //       setMessage("User created successfully");
  //     } else {
  //       setMessage("Some error occured");
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  //   setIsModalOpen(false);
  // };



  const handleCancel = () => {
    // Reset the input values and close the modal
    setInputValues({
      employee_name: "",
      tin_no: "",
      basic_salary: "",
      transport_allowance: "",
      additional_benefits: "",
      taxable_income: "",
      tax_with_hold: "",
      net_pay: "",
      branch_name: "",
    });
    setIsModalOpen(false);
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
          <Typography variant="h3">Abay Bank Employee Tax Record</Typography>
          <Button variant="contained" onClick={handleModalToggle} color="success">
          <AddIcon />
          </Button>
        </Box>
        <Box sx={{ overflow: "auto", mt: 3 }}>
          <ExTable />
        </Box>
      </CardContent>
      <Modal open={isModalOpen} onClose={handleModalToggle}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            maxHeight: "90vh",
            overflowY: "auto",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h5" component="h2">
            Register Employee Tax
          </Typography>
          <form onSubmit={handleSave}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Employee Name"
                name="employee_name"
                value={inputValues.employee_name}
                onChange={(e) => setInputValues({ ...inputValues, employee_name: e.target.value })}
                fullWidth
                margin="normal"
              />
              <TextField
                label="TIN No"
                name="tin_no"
                value={inputValues.tin_no}
                onChange={(e) => setInputValues({ ...inputValues, tin_no: e.target.value })}
                type="number"
                fullWidth
                margin="normal"
              />
              <TextField
                label="Basic Salary"
                name="basic_salary"
                value={inputValues.basic_salary}
                onChange={(e) => setInputValues({ ...inputValues, basic_salary: e.target.value })}
                type="number"
                fullWidth
                margin="normal"
              />
              <TextField
                label="Transport Allowance"
                name="transport_allowance"
                value={inputValues.transport_allowance}
                onChange={(e) => setInputValues({ ...inputValues, transport_allowance: e.target.value })}
                type="number"
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Additional Benefits"
                name="additional_benefits"
                value={inputValues.additional_benefits}
                onChange={(e) => setInputValues({ ...inputValues, additional_benefits: e.target.value })}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Taxable Income"
                name="taxable_income"
                value={inputValues.taxable_income}
                onChange={(e) => setInputValues({ ...inputValues, taxable_income: e.target.value })}
                type="number"
                fullWidth
                margin="normal"
              />
              <TextField
                label="Tax Withhold"
                name="tax_with_hold"
                value={inputValues.tax_with_hold}
                onChange={(e) => setInputValues({ ...inputValues, tax_with_hold: e.target.value })}
                type="number"
                fullWidth
                margin="normal"
              />
              <TextField
                label="Net Pay"
                name="net_pay"
                value={inputValues.net_pay}
                onChange={(e) => setInputValues({ ...inputValues, net_pay: e.target.value })}
                type="number"
                fullWidth
                margin="normal"
              />
            
            </Grid>
            <TextField
                label="Branch Name"
                name="branch_name"
                value={inputValues.branch_name}
                onChange={(e) => setInputValues({ ...inputValues, branch_name: e.target.value })}
                fullWidth
                margin="normal"
              />
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
            <Button onClick={handleCancel} variant="outlined" sx={{ mr: 2 }}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="success">
              Save
            </Button>
          </Box>
          </form>
        </Box>
      </Modal>
    </Box>
  );
};

export default BasicTable;