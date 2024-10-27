import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Tabs,
  Tab,
  Card,
} from "@mui/material";
import "./index.css";

const SignInSignUp = ({ onAuthChange }) => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleTabChange = (event, newValue) => {
    setIsSignIn(newValue === 0);
  };

  const handleSubmit = () => {
    onAuthChange(isSignIn, email, password, confirmPassword);
  };

  return (
    <Box className="auth-container">
      <Card className="auth-card" sx={{ width: "400px" }}>
        <Tabs
          value={isSignIn ? 0 : 1}
          onChange={handleTabChange}
          textColor="inherit"
          sx={{
            "& .MuiTab-root": {
              color: "gray", // Default color for both tabs
            },
            "& .Mui-selected": {
              color: "white", // Color for the selected tab
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "white", // Color for the tab indicator
            },
          }}
        >
          <Tab label="Sign In" sx={{ color: isSignIn ? "green" : "red" }} />
          <Tab label="Sign Up" sx={{ color: !isSignIn ? "green" : "red" }} />
        </Tabs>
        <Typography variant="h4" gutterBottom sx={{ mt: 3 }}>
          {isSignIn ? "Sign In" : "Sign Up"}
        </Typography>
        <TextField
          label="Email"
          variant="outlined"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
        />
        {!isSignIn && (
          <TextField
            label="Confirm Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
          />
        )}
        <Button
          variant="contained"
          className="auth-button"
          onClick={handleSubmit}
          fullWidth
          sx={{ mt: 2 }}
        >
          {isSignIn ? "Sign In" : "Sign Up"}
        </Button>
      </Card>
    </Box>
  );
};

export default SignInSignUp;
