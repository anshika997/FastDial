import { useAuth } from "../context/AuthContext";
import { useRouter } from "expo-router";
import { useEffect } from "react";

const Middleware = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/loginScreen"); // Redirect to login if not logged in
    }
  }, [isLoggedIn, router]); // Effect runs when `isLoggedIn` changes

  if (!isLoggedIn) {
    return null; // Render nothing until the redirect happens
  }

  return children; // Render the protected page if logged in
};

export default Middleware;
