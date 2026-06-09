import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

const HomeScreen = () => {
  const router = useRouter();

  const handleNextPress = () => {
    router.push("/IntroPages/secondIntro"); // Replace with the actual path to the next screen
  };

  const handleSkipPress = () => {
    router.push("/loginScreen"); // Replace with the actual path to the login screen
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/logo.png")}
        style={styles.logo}
      />
     
      <View style={styles.contentContainer}>
        <Image
          source={require("../../assets/images/study_illustration.png")}
          style={styles.illustration}
        />
        
        <Text style={styles.title}>Study Smarter!</Text>
        <Text style={styles.description}>
          Study more to expand your knowledge, achieve your goals, and unlock
          endless possibilities for success.
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSkipPress}>
          <Text style={styles.buttonText}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleNextPress}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
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
    width: 150,
    height: 150,
    marginBottom: 40,
  },
  contentContainer: {
    alignItems: "center",
  },
  illustration: {
    width: 250,
    height: 250,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 40,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default HomeScreen;
