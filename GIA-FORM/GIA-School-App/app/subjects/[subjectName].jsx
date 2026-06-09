import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Button,
  SafeAreaView,
  Image,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useAuth } from "../../context/AuthContext"; // Adjust the path as necessary
import Toast from "react-native-toast-message"; // Import Toast library
import { AntDesign } from "@expo/vector-icons"; // For back arrow

const Subjects = () => {
  const { token } = useAuth();
  const router = useRouter();
  const { subjectData } = useLocalSearchParams();
  const subject = subjectData ? JSON.parse(subjectData) : null;

  const [subSubjects, setSubSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const rootOrigin = "https://experience-pavillion.com";

  const fetchSubSubjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${rootOrigin}/api/v1/classuser/data/getSubSubjects?class_name=${subject.class_name}&board_name=${subject.board_name}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();

      if (Array.isArray(data)) {
        setSubSubjects(data);
        Toast.show({
          type: "success",
          text1: "Sub-subjects loaded successfully!",
        });
      } else {
        setError("Unexpected API response format.");
        Toast.show({
          type: "error",
          text1: "Error loading sub-subjects",
          text2: "Unexpected API response format.",
        });
      }
    } catch (err) {
      setError(err.message);
      Toast.show({
        type: "error",
        text1: "Error loading sub-subjects",
        text2: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubSubjects();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading sub-subjects...</Text>
      </View>
    );
  }

  const handleSubSubjectClick = (subSubject) => {
    router.push({
      pathname: `/aboutSubject/${subSubject.sub_subject_name}`,
      params: { subSubjectData: JSON.stringify(subSubject) },
    });
  };

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>
          Failed to load sub-subjects: {error}
        </Text>
        <Button title="Retry" onPress={fetchSubSubjects} color="#007bff" />
      </SafeAreaView>
    );
  }

  if (subSubjects.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
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
          <Text style={styles.headerTitle}>{subject.class_name}</Text>
        </View>
        <Text style={styles.title}>No Data Available</Text>
        {/* <Button title="Reload" onPress={fetchSubSubjects} color="#007bff" /> */}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
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
        <Text style={styles.headerTitle}>{subject.class_name}</Text>
      </View>
      <FlatList
        data={subSubjects}
        keyExtractor={(item) => `${item.sub_subject_id}`}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => handleSubSubjectClick(item)}
          >
            <Text style={styles.cardTitle}>{item.sub_subject_name}</Text>
            <Text style={styles.cardSubtitle}>
              Subject: {item.subject_name}
            </Text>
            <Text style={styles.cardDetail}>Board: {item.board_name}</Text>
            <Text style={styles.cardDetail}>Price: ₹{item.subject_price}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
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
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  backArrow: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  row: {
    justifyContent: "space-between",
  },
  card: {
    flex: 1,
    backgroundColor: "#36454F",
    padding: 15,
    margin: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
    maxWidth: "48%",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  cardSubtitle: {
    fontSize: 16,
    color: "white",
    fontWeight: "semibold",
    fontStyle: "italic",
    marginBottom: 5,
  },
  cardDetail: {
    fontSize: 14,
    color: "white",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
});

export default Subjects;
