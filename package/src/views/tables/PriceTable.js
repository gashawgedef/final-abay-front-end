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
import PriceListTable from "../tables/PriceListTable";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

const PriceTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false); 
  
  const [formData, setFormData] = useState({
    price: "",
    month: "",
    year: "",
    yearmonth: "",
    status: "",
  });

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSave = async (e) => {
    e.preventDefault();
    if (isSaving) {
      return; // Do nothing if saving is already in progress
    }
    setIsSaving(true); // Set isSaving to true to disable the save button
    try {
      const response = await fetch("http://10.1.50.152:8080/price", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log(response);
        // Handle successful response
        setIsModalOpen(false);
        setFormData({
          price: "",
          month: "",
          year: "",
          yearmonth: "",
          status: "",
        });
      } else {
        console.error("Failed to save data");
      }
    } catch (error) {
      console.error("Error occurred:", error);
    } finally {
      setIsSaving(false); // Set isSaving back to false after the request is complete
    }
  };

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
          <Typography variant="h3">Price</Typography>
          <Button
            variant="contained"
            onClick={handleModalToggle}
            color="success"
          >
            <AddIcon />
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
            Register Price
          </Typography>
          <form onSubmit={handleSave}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Price"
                  name="price"
                  value={formData.price}
                  onChange={handleFormChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Month"
                  name="month"
                  value={formData.month}
                  onChange={handleFormChange}
                  type="number"
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Year"
                  name="year"
                  value={formData.year}
                  onChange={handleFormChange}
                  type="number"
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Year Month"
                  name="yearmonth"
                  value={formData.yearmonth}
                  onChange={handleFormChange}
                  type="date"
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Status"
                  name="status"
                  value={formData.status}
                  onChange={handleFormChange}
                  fullWidth
                  margin="normal"
                />
              </Grid>
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

export default PriceTable;
