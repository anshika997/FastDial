import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { useAuth } from "../context/AuthContext";
import { AntDesign } from "@expo/vector-icons";
import GoogleIcon from "../assets/icons/google.svg";

const rootOrigin = "https://experience-pavillion.com";
console.log("Server URL:", rootOrigin);

const SignupScreen = () => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/HomePage");
    }
  }, [isLoggedIn]);

  const [formData, setFormData] = useState({
    user_name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const { user_name, email, password } = formData;
    if (!user_name || !email || !password) {
      Toast.show({
        type: "error",
        text1: "Validation Error",
        text2: "All fields are required.",
      });
      return false;
    }
    if (password.length < 8) {
      Toast.show({
        type: "error",
        text1: "Validation Error",
        text2: "Password must be at least 8 characters long.",
      });
      return false;
    }
    return true;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await fetch(
        `${rootOrigin}/api/v1/classuser/login/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (data.success === "true") {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Sign-up successful! Redirecting...",
        });
        setTimeout(() => {
          router.push("/loginScreen");
        }, 1000);
      } else {
        throw new Error(data.message || "Sign-up failed. Please try again.");
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Sign-up Error",
        text2: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Arrow */}
      <TouchableOpacity style={styles.backArrow} onPress={() => router.back()}>
        <AntDesign name="arrowleft" size={24} color="#333" />
      </TouchableOpacity>

      {/* Header */}
      <Text style={styles.header}>Sign In</Text>

      {/* Title and Subtitle */}
      <Text style={styles.title}>Welcome to ExperiencePavilion</Text>
      <Text style={styles.subtitle}>Welcome back, you have been missed</Text>

      {/* Input Fields */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          placeholderTextColor="#999"
          value={formData.user_name}
          onChangeText={(text) => setFormData({ ...formData, user_name: text })}
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#999"
          keyboardType="email-address"
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor="#999"
          secureTextEntry
          value={formData.password}
          onChangeText={(text) => setFormData({ ...formData, password: text })}
        />
      </View>

      {/* Signup Button */}
      {loading ? (
        <ActivityIndicator size="large" color="#0056FF" />
      ) : (
        <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
          <Text style={styles.signupButtonText}>Sign up</Text>
        </TouchableOpacity>
      )}

      {/* Google Sign-In Button */}
      <TouchableOpacity style={styles.googleButton}>
        <GoogleIcon width={20} height={20} />
        <Text style={styles.googleButtonText}>Sign In with Google</Text>
      </TouchableOpacity>

      {/* Link to Login */}
      <TouchableOpacity onPress={() => router.push("/loginScreen")}>
        <Text style={styles.existingText}>
          Already have an Account?{" "}
          <Text style={styles.signInText}>Sign in.</Text>
        </Text>
      </TouchableOpacity>

      {/* Toast Message */}
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  backArrow: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    color: "#666",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    color: "#333",
  },
  input: {
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    color: "#333",
    marginBottom: 15,
  },
  signupButton: {
    backgroundColor: "#0455BF",
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 15,
  },
  signupButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  googleButtonText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#666",
  },
  existingText: {
    fontSize: 14,
    textAlign: "center",
    color: "#666",
  },
  signInText: {
    fontWeight: "bold",
    color: "#0056FF",
  },
});

export default SignupScreen;
