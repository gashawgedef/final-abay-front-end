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
  TextField,
} from "@mui/material";
import { Edit,Save} from "@mui/icons-material";
import { getPrice, updatePrice } from "../../../services/gaspriceapi";
import { branch_employees,updateTin } from "../../../services/employeeapi";
import {currentUser} from "../../../utils/tokenUtils";
import toast from "react-hot-toast";
import { useQuery,useQueryClient  } from "@tanstack/react-query";
const EmployeeTin = () => {
  // const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editIndex, setEditIndex] = useState(-1);
  const [editedTin, setEditedTin] = useState("");
  const user = currentUser();
  const branch=user.branch_id;

  const queryClient = useQueryClient();
  const { isLoading, data:tin, error } = useQuery({ queryKey: ['todos', branch], queryFn: () => branch_employees(branch) });
  
  // useQuery(['tin', branch], {
  //   queryFn: () => branch_employees(branch),
  // });

  if(isLoading){
    return <p>Loading ...</p>
  }
  if(error){
    return <p>Error</p>
  }
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const data = await branch_employees(branch);
  //       setData(data);
  //     } catch (error) {
  //       alert("Error Check Your data");
  //     }
  //   };
  //   fetchData();
  // }, []);

  const handleEdit = (row) => {
    setEditIndex(row.Employee.User.id); 
    setEditedTin(row.Employee.User.tin_number); 
  };

  const handleSave = async (row) => {
    try {
      const data={
        "id":row.Employee.User.id ,
        "tin_number":editedTin
      }
      await updateTin(data); 
      setEditIndex(-1); 
      toast.success("You have successfully updated");
      queryClient.invalidateQueries('tin')
      // window.location.reload();
    } catch (error) {
      toast.error("Error Check Your data");
      // Handle error if needed
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  const count = tin.length;
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
                Emp_Id
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Name
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Tin Number
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
          {tin
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((emp, index) => (
              <TableRow key={emp.id}>
                <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontWeight: "500"
                    }}
                  >
                    {emp.id}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">
                  {emp.Employee.User.Person.first_name}{" "}
                    {emp.Employee.User.Person.middle_name}
                  </Typography>
                </TableCell>
                
                <TableCell>
                  {editIndex === emp.Employee.User.id ? (
                    <TextField
                     type="number"
                      value={editedTin}
                      onChange={(e) => setEditedTin(e.target.value)}
                      fullWidth
                      autoFocus
                    />
                  ) : (
                    <Typography variant="h6">{emp.Employee.User.tin_number}</Typography>
                  )}
                </TableCell>
                <TableCell>
                <Typography>  
                  {editIndex === emp.Employee.User.id ? (
                    <IconButton
                      onClick={() => handleSave(emp)}
                      aria-label="Save"
                      color="primary"
                    >
                      <Save />
                    </IconButton>
                  ) : (
                    <IconButton
                      onClick={() => handleEdit(emp)}
                      aria-label="Edit"
                      color="primary"
                    >
                      <Edit />
                    </IconButton>
                  )}
                   </Typography>
                </TableCell>
              </TableRow>
            ))}
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

export default EmployeeTin;