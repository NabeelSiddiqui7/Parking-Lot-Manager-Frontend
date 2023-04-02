import React, { useState, useEffect } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: { isLoggedIn: boolean, userName: string }) => void;
  userName: String;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = React.createContext<AuthContextType>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  userName: '',
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<{ isLoggedIn: boolean; userName: string }>(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    const storedUserName = localStorage.getItem("userName");
    return {
      isLoggedIn: storedIsLoggedIn ? JSON.parse(storedIsLoggedIn) : false,
      userName: storedUserName ? JSON.parse(storedUserName) : "",
    };
  });

  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn.isLoggedIn));
    localStorage.setItem("userName", JSON.stringify(isLoggedIn.userName));
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider value={{ isLoggedIn: isLoggedIn.isLoggedIn, setIsLoggedIn, userName: isLoggedIn.userName }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
