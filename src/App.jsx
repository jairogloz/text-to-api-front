import React, { createContext, useState, useEffect } from "react";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { Navbar, SideBar, SignInSignUp } from "./scenes";
import { Outlet, useNavigate } from "react-router-dom";
import { supabase } from "./lib/helper/supabaseClient";
import { useSession } from "./contexts/SessionContext";
import config from "./config";

export const ToggledContext = createContext(null);

function App() {
  const sessionCtx = useSession();
  const navigate = useNavigate();
  const [hasRedirected, setHasRedirected] = useState(false); // State to track redirection

  useEffect(() => {
    if (sessionCtx.session != null && !hasRedirected) {
      const TIME_THRESHOLD = 1000 * 60 * 5; // 5 minutes
      const user = sessionCtx.session.user;
      const isNewUser = new Date() - new Date(user.created_at) < TIME_THRESHOLD;

      // Todo: determine if customer needs to be created on stripe and, if so, send the request to the backend

      if (isNewUser) {
        navigate("/tiers");
      }
      setHasRedirected(true); // Set the state to true after redirection
    }
  }, [sessionCtx.session, hasRedirected, navigate]);

  const [theme, colorMode] = useMode();
  const [toggled, setToggled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State for authentication
  const values = { toggled, setToggled };

  const handleAuthChange = (isSignIn, email, password, confirmPassword) => {
    // Implement your authentication logic here
    setIsAuthenticated(true); // Set authentication status to true
    setHasRedirected(false); // Reset the redirection state on authentication change
  };

  const redirectTo =
    window.location.hostname === "localhost" ? config.localURL : config.prodURL;

  const signInWithOAuth = (authType) => {
    switch (authType) {
      case "google":
        supabase.auth.signInWithOAuth({
          provider: "google",
          options: { redirectTo },
        });
        break;
      default:
        break;
    }
  };

  const logout = () => {
    supabase.auth.signOut();
    setIsAuthenticated(false);
    setHasRedirected(false); // Reset the redirection state on logout
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
