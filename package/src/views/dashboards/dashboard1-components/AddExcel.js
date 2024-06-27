import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { currentUser } from "../../../utils/tokenUtils"; // Ensure this is correctly imported
import * as XLSX from "xlsx";
import { bulkTaxRecord } from "../../../services/taxapi";
import { Branch_fc_code } from "../../../services/erpBranchapi";
import toast from "react-hot-toast";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

const AddExcel = () => {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);
  const [errors, setErrors] = useState([]);  // State for tracking field errors
  const [editingRowIndex, setEditingRowIndex] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [employeeData, setEmployeeData] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const stateData = location.state || {};
  const { year, month } = stateData;
  const user = currentUser();
  const userName = user.first_name + " " + user.middle_name;
  const currentMonth = `${month}/${year}`;

  const openConfirmationDialog = () => {
    setIsConfirmationOpen(true);
  };

  const closeConfirmationDialog = () => {
    setIsConfirmationOpen(false);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const binaryStr = event.target.result;
        const workbook = XLSX.read(binaryStr, { type: "binary" });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const fileData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        const headers = fileData[0];
        const rows = fileData.slice(1);
        const formattedData = rows.map((row) => {
          let rowData = {};
          headers.forEach((header, index) => {
            rowData[header] = row[index];
          });
          return rowData;
        });

        console.log("Formatted Data:", formattedData);
        setData(formattedData);
        setErrors(formattedData.map(() => ({
          Employee_Name: false,
          Tin_number: false,
          Basic_Salary: false,
          Transport_Allowance: false,
          House_Allowance: false,
          Other_Benefit: false,
        })));
      };
      reader.readAsBinaryString(file);
    } else {
      toast.error("No file selected");
    }
  };

  const handleEdit = (index, field, value) => {
    const updatedData = [...data];
    updatedData[index][field] = value;
    setData(updatedData);

    // Clear the error if the user fixes the input
    const updatedErrors = [...errors];
    if (value) {
      updatedErrors[index][field] = false;
    }
    setErrors(updatedErrors);
  };

  const toggleEditMode = (index) => {
    setEditingRowIndex(index === editingRowIndex ? null : index);
  };
  const validateData = () => {
    const newErrors = data.map((row) => ({
      Employee_Name: !row.Employee_Name,
      Tin_number: !row.Tin_number,
      Basic_Salary: !row.Basic_Salary,
     Transport_Allowance: !row.Transport_Allowance,
      House_Allowance: !row.House_Allowance,
    }));
    setErrors(newErrors);

   
    return newErrors.every((rowErrors) =>
      Object.values(rowErrors).every((error) => !error)
    );
  };
  const handleSave = (e) => {
    if (!validateData()) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setEmployeeData(data);
    openConfirmationDialog();
  };
  const handleConfirmSave = async () => {
    try{
      const taxRecords = await Promise.all(employeeData.map(async (employee) => {
        const newBranch = await getFc_code(user.branch_id,); 
   
    return{
      fullName: employee.Employee_Name,
      benefit: employee.Other_Benefit,
      branch: newBranch,
      house: employee.House_Allowance,
      transport: employee.Transport_Allowance,
      tin: employee.Tin_number,
      month: currentMonth,
      status: "Draft",
      salary: employee.Basic_Salary,
      draftby: userName,
    }
    }));
console.log(taxRecords)
    bulkTaxRecord(taxRecords)
      .then((registerData) => {
        closeConfirmationDialog();
        toast.success("Successfully registered.");
        navigate("/dashboards/tax-list", { state: stateData });
      })
     .catch((error) => {
        console.error(error);
        toast.error("An error occurred while saving data.");
      });
  } catch (error) {
    // Handle any errors that occur during the process
    console.error('Error saving tax records:', error);
  }
  }
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const backToBasic = () => {
    navigate("/tables/basic-table");
  };

  const getFc_code=async(branch_id)=>{
    let fc_code=0;
    try {
      const branch = await Branch_fc_code(branch_id);
      fc_code=branch.fc_code;
    } catch (error) {
      console.log(error);
    }

    return fc_code;
  }
  return (
    <>
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Typography variant="h4">Excel File Uploader</Typography>
          <Typography variant="h6">
            {user.branch} Employee List - Add Benefit for {month}/{year}
          </Typography>
          <Button color="success" variant="outlined" onClick={backToBasic}>
            Back
          </Button>
        </Box>

        <Box sx={{ mb: 2 }}>
          <input type="file" accept=".xlsx" onChange={handleFileChange} />
          <Button
            variant="contained"
            color="primary"
            onClick={handleFileUpload}
            sx={{ ml: 2 }}
          >
            Upload
          </Button>
        </Box>

        {data.length > 0 && (
          <>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Employee_Name</TableCell>
                  <TableCell>Tin_number</TableCell>
                  <TableCell>Basic_Salary</TableCell>
                  <TableCell>Transport_Allowance </TableCell>
                  <TableCell>House_Allowance</TableCell>
                  <TableCell>Other_Benefit</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : data
                ).map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell>
                      {editingRowIndex === index ? (
                        <TextField
                          type="text"
                          name="Employee_Name"
                          value={row.Employee_Name || ""}
                          onChange={(e) =>
                            handleEdit(index, "Employee_Name", e.target.value)
                          }
                          size="small"
                          variant="outlined"
                          error={errors[index]?.Employee_Name}
                          helperText={errors[index]?.Employee_Name ? "Required" : ""}
                        />
                      ) : (
                        row.Employee_Name || ""
                      )}
                    </TableCell>
                    <TableCell>
                      {editingRowIndex === index ? (
                        <TextField
                          type="text"
                          name="Tin_number"
                          value={row.Tin_number || ""}
                          onChange={(e) =>
                            handleEdit(index, "Tin_number", e.target.value)
                          }
                          size="small"
                          variant="outlined"
                          error={errors[index]?.Tin_number}
                          helperText={errors[index]?.Tin_number ? "Required" : ""}
                        />
                      ) : (
                        row.Tin_number || ""
                      )}
                    </TableCell>
                    <TableCell>
                      {editingRowIndex === index ? (
                        <TextField
                          type="number"
                          name="Basic_Salary"
                          value={row.Basic_Salary || ""}
                          onChange={(e) =>
                            handleEdit(index, "Basic_Salary", e.target.value)
                          }
                          size="small"
                          variant="outlined"
                          error={errors[index]?.Basic_Salary}
                          helperText={errors[index]?.Salary ? "Required" : ""}
                        />
                      ) : (
                        row.Basic_Salary || ""
                      )}
                    </TableCell>
                    <TableCell>
                      {editingRowIndex === index ? (
                        <TextField
                          type="number"
                          name="Transport_Allowance"
                          value={row.Transport_Allowance || ""}
                          onChange={(e) =>
                            handleEdit(index, "Transport_Allowance", e.target.value)
                          }
                          size="small"
                          variant="outlined"
                          error={errors[index]?.Transport_Allowance}
                          helperText={errors[index]?.Transport_Allowance ? "Required" : ""}
                        />
                      ) : (
                        row.Transport_Allowance || ""
                      )}
                    </TableCell>
                    <TableCell>
                      {editingRowIndex === index ? (
                        <TextField
                          type="number"
                          name="House_Allowance"
                          value={row.House_Allowance || ""}
                          onChange={(e) =>
                            handleEdit(index, "House_Allowance", e.target.value)
                          }
                          size="small"
                          variant="outlined"
                          error={errors[index]?.House_Allowance}
                          helperText={errors[index]?.House_Allowance ? "Required" : ""}
                        />
                      ) : (
                        row.House_Allowance || ""
                      )}
                    </TableCell>
                    <TableCell>
                      {editingRowIndex === index ? (
                        <TextField
                          type="number"
                          name="Other_Benefit"
                          value={row.Other_Benefit || ""}
                          onChange={(e) =>
                            handleEdit(index, "Other_Benefit", e.target.value)
                          }
                          size="small"
                          variant="outlined"
                          error={errors[index]?.Other_Benefit}
                          helperText={errors[index]?.Other_Benefit ? "Required" : ""}
                        />
                      ) : (
                        row.Other_Benefit || ""
                      )}
                    </TableCell>
                    <TableCell>
                      <Button onClick={() => toggleEditMode(index)}>
                        {editingRowIndex === index ? "Save" : "Edit"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              component="div"
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        )}

        {data.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleSave}
            >
              Save
            </Button>
          </Box>
        )}
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
    </>
  );
};
export default AddExcel;
