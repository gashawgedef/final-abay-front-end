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
import { getPrice, updatePrice } from "../../services/gaspriceapi";
import toast from "react-hot-toast";
import { useQuery,useQueryClient  } from "@tanstack/react-query";


const PriceListTable = () => {
  // const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editIndex, setEditIndex] = useState(-1);
  const [editedPrice, setEditedPrice] = useState("");

  const queryClient = useQueryClient();

  const {isLoading,data,error}=useQuery({
    queryKey:['price'],
    queryFn:getPrice
  })

  if(isLoading){
    return <p>loading ...</p>
  }
  if (error){
    return <div>No data Found</div>
  }

  // console.log("data:",data)
  // const getpriceData=async()=>{
  //   const data = await getPrice();
  //   setData(data);
  // }
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       await getpriceData();
  //     } catch (error) {
  //       alert("Error Check Your data");
  //     }
  //   };
  //   fetchData();
  // }, []);

  const handleEdit = (row) => {
    setEditIndex(row.id);  
    setEditedPrice(row.price); 
  };

const handleSave = async (row) => {
  try {
    const data = {
      "id": row.id,
      "price": editedPrice
    };
    await updatePrice(data);
    setEditIndex(-1);
    toast.success("You have successfully updated");
    queryClient.invalidateQueries(['price']); 
  } catch (error) {
    toast.error("Error: Check Your data");
  }
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
                Created Date
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Updated Date
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
          {data
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((price, index) => (
              <TableRow key={price.id}>
                <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
                <TableCell>
                  {editIndex === price.id ? (
                    <TextField
                    type="number"
                      value={editedPrice}
                      onChange={(e) => setEditedPrice(e.target.value)}
                      fullWidth
                      autoFocus 
                      sx={{ height: "60px", width: "80px" }}
                    />
                  ) : (
                    <Typography variant="h6">{price.price}</Typography>
                  )}
                </TableCell>
                <TableCell>
                  <Typography variant="h6">
                    {new Date(price.createdAt).toLocaleDateString()}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">
                    {new Date(price.updatedAt).toLocaleDateString()}
                  </Typography>
                </TableCell>
                
                <TableCell>
                {index==0 ?(<Typography>  
                  {editIndex === price.id ? (
                    <IconButton
                      onClick={() => handleSave(price)}
                      aria-label=" Save"
                      color="primary"
                    >
                      <Save />
                    </IconButton>
                  ) : (
                    <IconButton
                      onClick={() => handleEdit(price)}
                      aria-label="Edit"
                      color="primary"
                    >
                      <Edit />
                    </IconButton>
                  )}
                   </Typography>) :(<Typography>No Action</Typography>)}
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

export default PriceListTable;