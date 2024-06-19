import React, { createContext, useState, ReactNode } from "react";
import { AuthContextType } from "../../hooks/logins/models";

const defaultAuthState: AuthContextType = {
  auth: {
    user: null,
    accessToken: null,
    roles: [],
    // Add other properties of auth here
    // Initialize other properties of auth
  },
  setAuth: () => {
    // Placeholder function; actual implementation will depend on how you plan to update the auth state
    throw new Error("setAuth function not implemented.");
  },
};

const AuthContext = createContext<AuthContextType>({
  auth: defaultAuthState.auth, // Use the auth property directly
  setAuth: defaultAuthState.setAuth, // Now providing a reference to the setAuth function
});

export const AuthProvider: React.FC<{ children: ReactNode }> = (props) => {
  const [auth, setAuth] = useState(defaultAuthState.auth); // Initialize state with the auth part of defaultAuthState

  // Provide a functional implementation for setAuth that updates the auth state
  const updateAuth = (newAuthState: React.SetStateAction<{ user: string | null; accessToken: string | null; roles: string[]; }>) => {
    setAuth(newAuthState);
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth: updateAuth }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
