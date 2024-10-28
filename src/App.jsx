import React, { createContext, useState, useEffect } from "react";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { Navbar, SideBar, SignInSignUp } from "./scenes";
import { Outlet, useNavigate } from "react-router-dom";
import { supabase } from "./lib/helper/supabaseClient";
import { useSession } from "./context/SessionContext";

export const ToggledContext = createContext(null);

function App() {
  const sessionCtx = useSession();
  const navigate = useNavigate();
  let isNewUser = false;

  useEffect(() => {
    if (sessionCtx.session != null) {
      const TIME_THRESHOLD = 1000 * 60 * 5; // 5 minutes
      const user = sessionCtx.session.user;
      isNewUser = new Date() - new Date(user.created_at) < TIME_THRESHOLD;

      if (isNewUser) {
        navigate("/tiers");
      } else {
        navigate("/");
      }
    }
  }, [sessionCtx.session, navigate]);

  const [theme, colorMode] = useMode();
  const [toggled, setToggled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State for authentication
  const values = { toggled, setToggled };

  const handleAuthChange = (isSignIn, email, password, confirmPassword) => {
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
                <Navbar logout={logout} />
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
