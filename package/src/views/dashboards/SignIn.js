import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState } from "react";
import { Alert, Card } from "@mui/material";
import { useNavigate  } from "react-router-dom";


export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "") {
      setErrorMessage("please provide username");
    } else if (password === "") {
      setErrorMessage("please provide password");
    } else {
      navigate("/dashboards/dashboard1", { replace: true });

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
            label="username  "
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            // sx={{ mt: 3, mb: 2 }} href="dashboards/dashboard1"
          >
            Sign In
          </Button>

          {/* {errorMessage? errorMessage:""} */}
          {errorMessage !== "" ? (
            <div className="error">
              <Alert severity="warning">{errorMessage}</Alert>
            </div>
          ) : (
            ""
          )}
          {/* <Grid container>
            <Grid item xs>
              <Link href="dashboards/dashboard1" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid> */}
        </Box>
      </Box>
      </Card>
    </Container>
  );
}
