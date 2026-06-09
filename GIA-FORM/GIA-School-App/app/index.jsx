import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../context/AuthContext";

const HomeScreen = () => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  // State to handle loading
  const [loading, setLoading] = useState(true);

   useEffect(() => {
     const timeout = setTimeout(() => {
       // After 1 second, check the login status and redirect accordingly
       if (isLoggedIn) {
         router.replace("/HomePage");
       } else {
         router.replace("/IntroPages");
       }
     }, 1000); // 1 second delay

     return () => clearTimeout(timeout); // Cleanup timeout on component unmount
   }, [isLoggedIn, router]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/logo.png")} // Replace with your logo file
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.tagline}>Experience Pavilion</Text>

      {loading && <Text style={styles.loadingText}>Loading...</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: "60%", // Adjust width as per design
    height: 200,
  },
  tagline: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
  },
  loadingText: {
    fontSize: 16,
    color: "#555",
    marginTop: 20,
  },
});

export default HomeScreen;
