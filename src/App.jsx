import React, { createContext, useState } from "react";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { Navbar, SideBar, SignInSignUp } from "./scenes";
import { Outlet } from "react-router-dom";
import { supabase } from "./lib/helper/supabaseClient";
import { useSession } from "./context/SessionContext";

export const ToggledContext = createContext(null);

function App() {
  const sessionCtx = useSession();

  const [theme, colorMode] = useMode();
  const [toggled, setToggled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State for authentication
  const values = { toggled, setToggled };

  const handleAuthChange = (isSignIn, email, password, confirmPassword) => {
    //console.log("isSignIn:", isSignIn);
    //console.log("Email:", email);
    //console.log("Password:", password);
    //if (!isSignIn) {
    //  console.log("Confirm Password:", confirmPassword);
    //}
    // Implement your authentication logic here
    setIsAuthenticated(true); // Set authentication status to true
  };

  const signInWithOAuth = (authType) => {
    switch (authType) {
      case "google":
        supabase.auth.signInWithOAuth({
          provider: "google",
        });
        break;
      default:
        break;
    }
  };
  // Todo: pending logout implementation
  const logout = () => {
    supabase.auth.signOut();
    setIsAuthenticated(false);
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ToggledContext.Provider value={values}>
          {sessionCtx.session ? (
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
            <SignInSignUp
              onAuthChange={handleAuthChange}
              onAuthWithOAuth={signInWithOAuth}
            />
          )}
        </ToggledContext.Provider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
