import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

const HomeScreen = () => {
  const router = useRouter();

  const handleGetStartedPress = () => {
    router.push("/loginScreen"); // Replace with the actual path to the next screen
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/study_illustration3.png")}
        style={styles.illustration}
      />

      <Text style={styles.title}>Achieve More!</Text>
      <Text style={styles.description}>
        Achieve more by pushing past limits and embracing every challenge.
        Success grows when effort and ambition unite.
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleGetStartedPress}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  illustration: {
    width: "80%", // Adjust width as needed
    height: "40%", // Adjust height as needed
    marginBottom: 40,
    resizeMode: "contain", // or 'cover' depending on your desired behavior
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    marginBottom: 40,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default HomeScreen;
