import React, { createContext, useState } from "react";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { Navbar, SideBar, SignInSignUp } from "./scenes";
import { Outlet } from "react-router-dom";

export const ToggledContext = createContext(null);

function App() {
  const [theme, colorMode] = useMode();
  const [toggled, setToggled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State for authentication
  const values = { toggled, setToggled };

  const handleAuthChange = (isSignIn, email, password, confirmPassword) => {
    console.log("isSignIn:", isSignIn);
    console.log("Email:", email);
    console.log("Password:", password);
    if (!isSignIn) {
      console.log("Confirm Password:", confirmPassword);
    }
    // Implement your authentication logic here
    setIsAuthenticated(true); // Set authentication status to true
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ToggledContext.Provider value={values}>
          {isAuthenticated ? (
            <Box sx={{ display: "flex", height: "100vh", maxWidth: "100%" }}>
              <SideBar />
              <Box
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  maxWidth: "100%",
                }}
              >
                <Navbar />
                <Box sx={{ overflowY: "auto", flex: 1, maxWidth: "100%" }}>
                  <Outlet />
                </Box>
              </Box>
            </Box>
          ) : (
            <SignInSignUp onAuthChange={handleAuthChange} />
          )}
        </ToggledContext.Provider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
