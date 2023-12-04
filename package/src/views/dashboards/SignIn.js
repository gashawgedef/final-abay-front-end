import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Alert, Card, Divider } from "@mui/material";
import LogoIcon from "../../layouts/FullLayout/Logo/LogoIcon";
export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username === "") {
      setErrorMessage("Please provide a username");
    } else if (password === "") {
      setErrorMessage("Please provide a password");
    } else {
      try {
        setIsLoading(true);
        const response = await axios.post("http://10.1.50.152:8080/api/login", {
          username,
          password,
        });
          const token = response.data.accessToken;
          localStorage.setItem("token", token);
          navigate("/dashboards/dashboard1");
      } catch (error) {
        let message=error.response.data.message;
        if(error.response.status===500){
          message="System Connection Problem tray again";
        }
        setErrorMessage(message);
      }
      finally {
        setIsLoading(false); // Enable inputs and button
      }
    }
  };
  return (
    <Container component="main" maxWidth="xs" sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
       justifyContent: "center",
       marginTop:"50px"
      }}>
      <Typography variant="h2" sx={{fontWeight:'600',fontFamily:'sans-serif'}}>Employee Tax Record System</Typography>
      <Card sx={{border: "1px solid #ccc", backgroundColor: "#f8f8f8" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >

        <Box sx={{ display: "flex", alignItems: "Center" }}>
          <LogoIcon/>
        </Box>
        <Divider sx={{ my: 2 }} />
          <Typography component="h1" variant="h2" sx={{fontFamily:"sans-serif",fontWeight:'600',fontSize:'15px'}}> 
           Please Sign In
          </Typography>
          <Divider sx={{ my: 2 }} />

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              autoComplete="current-password"
              disabled={isLoading}
            />
             <Button type="submit" fullWidth variant="contained" disabled={isLoading}>
              {isLoading ? "Signing In..." : "Sign In"} {/* Display appropriate text based on isLoading */}
            </Button>
            <Divider sx={{ my: 2 }} />

            {errorMessage !== "" ? (
  <div className="error">
    <Alert severity="error">{errorMessage}</Alert>
  </div>
) : null}
          </Box>
        </Box>
      </Card>
    </Container>
  );
}