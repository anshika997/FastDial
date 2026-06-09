import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { useAuth } from "../../context/AuthContext"; // Adjust the path as necessary
import HeartIcon from "../../assets/icons/heart.svg";
import { useRouter } from "expo-router";
import XIcon from "../../assets/icons/X.svg";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const { width: screenWidth } = Dimensions.get("window");
const rootOrigin = "https://experience-pavillion.com";

const HomeScreen = () => {
  const { token, user, LogoutUser } = useAuth();
  const router = useRouter();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(
          `${rootOrigin}/api/v1/classadmin/data/getBoards`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        if (response.ok) {
          const courseNames = data.map((board) => board.board_name);
          setCourses(courseNames);
        } else {
          console.error("Failed to fetch courses:", data.message || data);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [token, rootOrigin]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0455BF" />
      </View>
    );
  }

  const handleLogout = async () => {
    try {
      await LogoutUser(); // Call LogoutUser to clear token and user state
      router.push("/"); // Navigate to the login screen after logout
    } catch (error) {
      console.error("Logout failed: ", error);
    }
  };

  const handleBoardClick = (boardName) => {
    router.push(`/boards/${boardName}`); // Navigate to a dynamic route with the board name
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.greetingText}>Hi! {user?.name || "User"}</Text>
          <Text style={styles.subText}>Let's start Learning</Text>
        </View>
        <TouchableOpacity onPress={handleLogout}>
          <MaterialCommunityIcons name="logout" size={35} color="black" />
        </TouchableOpacity>
      </View>

      {/* Courses Section */}
      <View style={styles.coursesSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Boards</Text>
        </View>
        <FlatList
          horizontal
          data={courses}
          keyExtractor={(item, index) => `${item}-${index}`}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.coursesList}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.courseCard}
              onPress={() => handleBoardClick(item)} // Handle board click
            >
              <Text style={styles.courseTitle}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Banner Section */}
      <View style={styles.bannerContainer}>
        <View style={{ flex: 1 }}>
          <Image
            source={require("../../assets/images/banner-placeholder.png")}
            style={styles.bannerImage}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.bannerText}>What you want </Text>
          <Text style={styles.bannerText}>to learn?</Text>
          <TouchableOpacity style={styles.bannerButton}>
            <Text style={styles.bannerButtonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Recently Lessons */}
      <View style={styles.recentLessonsSection}>
        <Text style={styles.sectionTitle}>Recently Lessons</Text>
        <View style={styles.lessonCardContainer}>
          <View style={[styles.lessonCard, styles.lessonCardBlue]}>
            <View>
              <XIcon width={50} height={50} />
            </View>
            <View>
              <Text style={styles.lessonTitle}>Quantum Energy</Text>
              <Text style={styles.lessonSubTitle}>Quantum Theory</Text>
            </View>
            <View>
              <Text style={styles.lessonProgress}>90%</Text>
            </View>
          </View>
          <View style={[styles.lessonCard, styles.lessonCardPink]}>
            <View>
              <HeartIcon width={50} height={50} />
            </View>
            <View>
              <Text style={styles.lessonTitle}>Heart Functions</Text>
              <Text style={styles.lessonSubTitle}>Human Anatomy</Text>
            </View>
            <View>
              <Text style={styles.lessonProgress}>90%</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Features Section */}
      <View style={styles.featuresSection}>
        <View style={styles.featureCard}>
          <Image
            source={require("../../assets/images/amico.png")}
            style={styles.featureImage}
          />
          <View style={{ marginLeft: 10, flex: 1 }}>
            <Text style={styles.featureTitle}>Pre-Recorded Videos</Text>
            <Text style={styles.featureDescription}>
              Watch and learn from videos anytime.
            </Text>
          </View>
        </View>
        <View style={styles.featureCard}>
          <Image
            source={require("../../assets/images/styuding.png")}
            style={styles.featureImage}
          />
          <View style={{ marginLeft: 10, flex: 1 }}>
            <Text style={styles.featureTitle}>Downloadable Notes</Text>
            <Text style={styles.featureDescription}>
              Access PDFs and materials after classes.
            </Text>
          </View>
        </View>
        <View style={styles.featureCard}>
          <Image
            source={require("../../assets/images/pana.png")}
            style={styles.featureImage}
          />
          <View style={{ marginLeft: 10, flex: 1 }}>
            <Text style={styles.featureTitle}>Doubt Clearing Sessions</Text>
            <Text style={styles.featureDescription}>
              Live sessions for all doubts after chapters.
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  headerContainer: {
    backgroundColor: "#0455BF",
    paddingVertical: 20,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    height: 120,
  },
  greetingText: {
    fontSize: 24,
    color: "#FFF",
    fontWeight: "bold",
  },
  subText: {
    color: "#DDEFFF",
  },
  notificationIcon: {
    alignSelf: "flex-end",
  },
  coursesSection: {
    marginVertical: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  viewAll: {
    color: "#007BFF",
    fontWeight: "bold",
  },
  coursesList: {
    padding: 10,
    backgroundColor: "#fff",
  },
  courseCard: {
    width: 150,
    height: 100,
    backgroundColor: "#C7DFFF",
    borderRadius: 10,
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  bannerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#74B0FF",
    borderRadius: 10,
    margin: 20,
    padding: 20,
  },
  bannerImage: {
    width: "100%",
    height: 120,
    resizeMode: "contain",
  },
  bannerText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    color: "#FFFFFF",
    marginLeft: 10,
  },
  bannerButton: {
    backgroundColor: "#0455BF",
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    marginLeft: 10,
    width: "100%",
  },
  bannerButtonText: {
    color: "#FFFFFF",
  },
  recentLessonsSection: {
    margin: 20,
  },
  lessonCardContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  lessonCard: {
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 5,
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  lessonCardBlue: {
    backgroundColor: "#C7DFFF",
  },
  lessonCardPink: {
    backgroundColor: "rgba(234, 67, 53, 0.32)",
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  lessonSubTitle: {
    fontSize: 14,
  },
  lessonProgress: {
    fontSize: 16,
    marginTop: 10,
  },
  featuresSection: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  featureCard: {
    alignItems: "center",
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexWrap: "wrap",
    padding: 10,
  },

  featureImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 5,
    flexWrap: "wrap",
  },
  featureDescription: {
    fontSize: 14,
    textAlign: "center",
    color: "#666",
    flexWrap: "wrap",
    marginTop: 5,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
