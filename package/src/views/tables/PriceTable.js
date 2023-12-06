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
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import PriceListTable from "../tables/PriceListTable";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { RecordNewPrice } from "../../services/gaspriceapi";
import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
const PriceTable = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    price: "",
    status: true,
  });
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset: resetForm } = useForm();
  const {
    mutate,
    isLoading: isSaving,
    reset: resetMutation,
  } = useMutation({
    mutationFn: RecordNewPrice,
    onSuccess: () => {
      toast.success("You have successfully registered");
      setIsModalOpen(false);
      queryClient.invalidateQueries("price");
      resetForm();
      resetMutation();
    },
    onError: () => {
      toast.error("An error occurred while registering");
    },
  });

  function onSubmit(data) {
    mutate(data);
  }

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };
  
  // const handleFormChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };


  // const handleSave = async (e) => {
  //   e.preventDefault();
  //   if (isSaving) {
  //     return;
  //   }
  //   setIsSaving(true);
  //   try {
  //     await RecordNewPrice(formData);
  //     toast.success("You have successfully registered");
  //     setIsModalOpen(false);
  //     // window.location.reload();
  //   } catch (error) {
  //     toast.error("An error occurred while registering");
  //     console.error(error);
  //   } finally {
  //     setIsSaving(false);
  //   }
  // };

  const handleCancel = () => {
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
          <Typography variant="h3">Gas Price List</Typography>
          <Button
            variant="contained"
            onClick={handleModalToggle}
            color="success"
          >
            <AddIcon />
            Add new Price
          </Button>
        </Box>
        <Box sx={{ overflow: "auto", mt: 3 }}>
          <PriceListTable />
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
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={handleModalToggle}>
              <CloseIcon />
            </Button>
          </Box>
          <Typography variant="h5" component="h2" sx={{ mb: 3 }}>
            Add New Price
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container>
              <TextField
                type="number"
                label="Price"
                name="price"
                {...register("price")}
                fullWidth
                margin="normal"
                required
              />
            </Grid>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
              <Button onClick={handleCancel} variant="outlined" sx={{ mr: 2 }}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="success"
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save"}
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </Box>
  );
};

export default PriceTable;
