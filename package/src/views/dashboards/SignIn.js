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
import { Alert, Card } from "@mui/material";
export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username === "") {
      setErrorMessage("Please provide a username");
    } else if (password === "") {
      setErrorMessage("Please provide a password");
    } else {
      try {
        const response = await axios.post("http://10.1.50.152:8080/api/login", {
          username,
          password,
        });
          const token = response.data.accessToken;
          localStorage.setItem("token", token);
          navigate("/dashboards/dashboard1");
      } catch (error) {
        setErrorMessage("Invalid username or password");
      }
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <Typography variant="h2"></Typography>
      <Card>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

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
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button type="submit" fullWidth variant="contained">
              Sign In
            </Button>

            {errorMessage !== "" ? (
              <div className="error">
                <Alert severity="warning">{errorMessage}</Alert>
              </div>
            ) : null}
          </Box>
        </Box>
      </Card>
    </Container>
  );
}