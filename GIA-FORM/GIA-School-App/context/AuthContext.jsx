import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { use } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  // Store token and user in AsyncStorage and update state
  const storeTokenAndUser = async (serverToken, userData) => {
    setToken(serverToken);
    setUser(userData);
    await AsyncStorage.setItem("token", serverToken);
    await AsyncStorage.setItem("user", JSON.stringify(userData));
  };

  // Remove token and user from AsyncStorage and clear state
  const LogoutUser = async () => {
    setToken(null);
    setUser(null);
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");
  };

  // Fetch token and user from AsyncStorage on app load
  useEffect(() => {
    const fetchAuthData = async () => {
      const storedToken = await AsyncStorage.getItem("token");
      const storedUser = await AsyncStorage.getItem("user");
      if (storedToken) {
        setToken(storedToken);
      }
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };
    fetchAuthData();
  }, []);

  const updateCartInfo = (info) => {
    setCartInfo(info); // Merge or replace as needed
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        storeTokenAndUser,
        LogoutUser,
        user,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return authContextValue;
};
