import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Button,
  Image,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useAuth } from "../../context/AuthContext"; // Adjust the path as necessary
import Toast from "react-native-toast-message"; // Import Toast library
import { AntDesign } from "@expo/vector-icons"; // For back arrow

const BoardDetails = () => {
  const { token, user, LogoutUser } = useAuth();
  const router = useRouter();
  const { boardName } = useLocalSearchParams(); // Get the board name from the route

  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const rootOrigin = "https://experience-pavillion.com";

  const fetchClasses = async () => {
    setLoading(true);
    setError(null);
    try {
      // console.log("Fetching classes...");
      const response = await fetch(
        `${rootOrigin}/api/v1/classuser/data/getClasses`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // console.log("API Response status:", response.status);

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      // console.log("API Response data:", data);

      if (Array.isArray(data)) {
        const filteredClasses = data.filter(
          (item) => item.board_name === boardName
        );
        // console.log("Filtered classes:", filteredClasses);
        setClasses(filteredClasses);
        Toast.show({
          type: "success",
          text1: "Classes loaded successfully!",
        });
      } else {
        console.error("Unexpected API response format:", data);
        setError("Unexpected API response format.");
        Toast.show({
          type: "error",
          text1: "Error loading classes",
          text2: "Unexpected API response format.",
        });
      }
    } catch (err) {
      console.error("Error fetching classes:", err);
      setError(err.message);
      Toast.show({
        type: "error",
        text1: "Error loading classes",
        text2: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, [boardName]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading classes...</Text>
      </View>
    );
  }

  const handleSubjectClick = (subjectName) => {
    // console.log(subjectName);
    router.push({
      pathname: `/subjects/${subjectName.class_name}`, // Dynamic route
      params: { subjectData: JSON.stringify(subjectName) }, // Pass the whole object
    });
  };

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Failed to load classes: {error}</Text>
        <Button title="Retry" onPress={fetchClasses} color="#007bff" />
      </View>
    );
  }

  if (classes.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No classes found for {boardName}</Text>
        <Button title="Reload" onPress={fetchClasses} color="#007bff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Toast />
      <View style={styles.header}>
        <AntDesign
          name="arrowleft"
          size={24}
          color="#333"
          onPress={router.back}
          style={styles.backArrow}
        />
        <Image
          source={require("../../assets/images/logo.png")} // Adjust path as necessary
          style={styles.logo}
        />
        <Text style={styles.headerTitle}>{boardName}</Text>
      </View>
      <FlatList
        data={classes}
        keyExtractor={(item) => `${item.class_id}`}
        numColumns={2} // 2 cards per row
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              handleSubjectClick(item);
            }}
          >
            <Text style={styles.cardTitle}>{item.class_name}</Text>
            <Text style={styles.cardSubtitle}>Price: ₹{item.class_price}</Text>
            <Text style={styles.cardCreator}>
              Created By: {item.class_created_by || "N/A"}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backArrow: {
    marginRight: 10,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  row: {
    justifyContent: "space-between",
  },
  card: {
    flex: 1,
    backgroundColor: "#C7DFFF",
    padding: 15,
    margin: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
    maxWidth: "48%", // Ensure 2 cards fit in a row
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  cardSubtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  cardCreator: {
    fontSize: 14,
    color: "#777",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
});

export default BoardDetails;
