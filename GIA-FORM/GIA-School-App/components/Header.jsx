import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Text,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import { useDrawer } from "../context/DrawerContext";
import { useAuth } from "../context/AuthContext"; 

const { height: screenHeight } = Dimensions.get("window");

const Header = ({ showProfileIcon = true }) => {
  const router = useRouter();
    const { openDrawer, closeDrawer } = useDrawer();
    const { LogoutUser } = useAuth();

  return (
    <View style={styles.container}>
      {/* Back Icon */}
      <TouchableOpacity style={styles.backIconContainer}>
        <AntDesign name="left" size={24} color="black" />
      </TouchableOpacity>

      {/* Logo */}
      <TouchableOpacity
        style={styles.logoContainer}
        onPress={() => router.push("/HomePage")}
      >
        <Image
          source={require("../assets/images/ExPavillion_Logo.jpeg")}
          style={styles.logo}
        />
      </TouchableOpacity>

      {/* Profile Icon */}
      {showProfileIcon && (
        <TouchableOpacity
          style={styles.profileIconContainer}
          onPress={() =>
            openDrawer(
              <View style={{ padding: 20 }}>
                <TouchableOpacity
                  style={styles.drawerButton}
                  onPress={() => {
                    console.log("My Profile pressed");
                    closeDrawer(); // Close the drawer
                  }}
                >
                  <Text style={styles.drawerButtonText}>My Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.drawerButton}
                  onPress={() => {
                    console.log("My Cart pressed");
                    closeDrawer(); // Close the drawer
                  }}
                >
                  <Text style={styles.drawerButtonText}>My Cart</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.drawerButton}
                  onPress={() => {
                    console.log("Purchased Courses pressed");
                    closeDrawer(); // Close the drawer
                  }}
                >
                  <Text style={styles.drawerButtonText}>Purchased Courses</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.drawerButton, { backgroundColor: "#FF5C5C" }]}
                  onPress={async () => {
                    try {
                      closeDrawer();
                      await LogoutUser(); // Call LogoutUser to clear token and user state
                      router.push("/"); // Navigate to the desired route after logout
                    } catch (error) {
                      console.error("Error during logout:", error);
                    } 
                  }}
                >
                  <Text style={styles.drawerButtonText}>Logout</Text>
                </TouchableOpacity>
              </View>
            )
          }
        >
          <FontAwesome name="user" size={40} color="black" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: screenHeight * 0.1, // Fixed height ratio
    paddingHorizontal: 10,
    backgroundColor: "#F5F5F5", // Adjust background color as needed
    borderBottomWidth: 1,
    borderBottomColor: "#CCC",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  backIconContainer: {
    flex: 1,
    justifyContent: "center",
  },
  logoContainer: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    height: "100%",
    width: "100%",
  },
  profileIconContainer: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
    paddingRight: 15,
  },
  drawerButton: {
    backgroundColor: "#007BFF", // Primary blue color
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  drawerButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default Header;
