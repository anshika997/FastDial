import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

const HomeScreen = () => {
  const router = useRouter();

  const handleNextPress = () => {
    router.push("/IntroPages/thirdIntro"); // Replace with the actual path to the next screen
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/study_illustration2.png")}
        style={styles.illustration}
      />
      
      <Text style={styles.title}>Dream Bigger!</Text>
      <TouchableOpacity style={styles.button} onPress={handleNextPress}>
        <Text style={styles.buttonText}>Next</Text>
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
  },
  illustration: {
    width: 250,
    height: 250,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
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
