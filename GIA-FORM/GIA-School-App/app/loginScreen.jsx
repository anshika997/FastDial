import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";
import GoogleIcon from "../assets/icons/google.svg";
import { useAuth } from "../context/AuthContext";
const rootOrigin = "https://experience-pavillion.com";

const LoginScreen = () => {
  const { storeTokenAndUser } = useAuth();
  const router = useRouter();

  const loginValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleLogin = async (values, actions) => {
    const { email, password } = values;

    try {
      actions.setSubmitting(true);

      const response = await fetch(
        `${rootOrigin}/api/v1/classuser/login/request`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();

        throw new Error(errorData.message || "Login failed.");
      }

      const { accessToken, user } = await response.json();

      await storeTokenAndUser(accessToken, user);

      Toast.show({
        type: "success",
        text1: "Login Successful",
        text2: `Welcome ${user.name}`,
      });

      setTimeout(() => {
        router.push("/HomePage");
      }, 1000);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Login Failed",
        text2: error.message,
      });
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign In</Text>
      <Text style={styles.subtitle}>Let’s sign you in</Text>
      <Text style={styles.smallSubtitle}>
        Welcome back, you have been missed
      </Text>

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginValidationSchema}
        onSubmit={handleLogin}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isSubmitting,
        }) => (
          <>
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#999"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {errors.email && touched.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
            </View>

            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor="#999"
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                secureTextEntry
              />
              {errors.password && touched.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
            </View>

            <TouchableOpacity>
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.loginButtonText}>Sign in</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.googleButton}>
              <GoogleIcon width={20} height={20} />
              <Text style={styles.googleButtonText}>Sign in with Google</Text>
            </TouchableOpacity>

            <View style={styles.createAccountContainer}>
              <Text style={styles.createAccountText}>
                Don’t have an account?{" "}
              </Text>
              <TouchableOpacity onPress={() => router.push("/signupScreen")}>
                <Text style={styles.createAccountLink}>Create One.</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>

      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "left",
    marginBottom: 10,
  },
  smallSubtitle: {
    fontSize: 14,
    color: "#888",
    textAlign: "left",
    marginBottom: 30,
  },
  inputWrapper: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  errorText: {
    fontSize: 12,
    color: "#ff5a5f",
    marginTop: 5,
  },
  forgotPassword: {
    textAlign: "left",
    color: "#1e90ff",
    fontSize: 14,
    marginVertical: 10,
  },
  loginButton: {
    backgroundColor: "#0455BF",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  googleButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    paddingVertical: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  googleButtonText: {
    fontSize: 16,
    marginLeft: 10,
  },
  createAccountContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  createAccountText: {
    fontSize: 14,
    color: "#888",
  },
  createAccountLink: {
    fontSize: 14,
    color: "#1e90ff",
  },
});

export default LoginScreen;
