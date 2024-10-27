import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../lib/helper/supabaseClient";

// Create a Session Context
const SessionContext = createContext();

// Custom hook to access the context
export const useSession = () => {
  return useContext(SessionContext);
};

// Provider component to wrap around the app
export const SessionProvider = ({ children }) => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data?.session) {
        console.log(data.session);
        setSession(data.session);
      }
    };

    getSession();

    // Listen to auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN") {
          setSession(session);
        } else if (event === "SIGNED_OUT") {
          console.log("User signed out");
          setSession(null); // Clear session on logout
        } // end of if event
      } // end of (event, session) => {}
    ); // end of onAuthStateChange

    // Cleanup subscription
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []); // end of useEffect

  return (
    <SessionContext.Provider value={{ session }}>
      {children}
    </SessionContext.Provider>
  );
}; // end of SessionProvider
