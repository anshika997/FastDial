import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Button,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
  SafeAreaView,
} from "react-native";
import { RadioButton } from "react-native-paper";
import { useRouter, useLocalSearchParams } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { Video } from "expo-av"; // For video rendering
import { useAuth } from "../../context/AuthContext";

const AboutSubject = () => {
  const { subSubjectData } = useLocalSearchParams();
  const subSubject = subSubjectData ? JSON.parse(subSubjectData) : null;
  const { token } = useAuth();
  const [aboutSubjects, setAboutSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [videoLoading, setVideoLoading] = useState(false); // State for video loading
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility
  const [selectedOption, setSelectedOption] = useState("subSubject"); // Default to Sub Subject
  const [boughtSubjectName, setBoughtSubjectName] = useState(""); // To store the name of the bought subject
  const [purchaseSuccess, setPurchaseSuccess] = useState(false); // State to track purchase success

  const rootOrigin = "https://experience-pavillion.com";
  const router = useRouter();

  const fetchAboutSubjects = async () => {
    console.log(
      `${rootOrigin}/api/v1/classuser/data/getAboutSubjects?class_name=${subSubject.class_name}&board_name=${subSubject.board_name}&sub_subject_name=${subSubject.sub_subject_name}`
    );
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${rootOrigin}/api/v1/classuser/data/getAboutSubjects?class_name=${subSubject.class_name}&board_name=${subSubject.board_name}&sub_subject_name=${subSubject.sub_subject_name}`,
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
        setAboutSubjects(data);
      } else {
        setError("Unexpected API response format.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAboutSubjects();
  }, []);

  const handleVideoLoadStart = () => {
    setVideoLoading(true); // Start loading video
  };

  const handleVideoLoad = () => {
    setVideoLoading(false); // Stop loading video
  };

  const handleBuyPress = (subSubjectName) => {
    setBoughtSubjectName(subSubjectName);
    setModalVisible(true);
  };

  const handleCheckout = () => {
    // Logic to complete the purchase
    setPurchaseSuccess(true); // Mark purchase as successful
    setModalVisible(true); // Keep the modal visible
    setTimeout(() => {
      setModalVisible(false); // Close the modal after a delay
      router.back(); // Navigate back after success
    }, 2000); // 2 seconds delay before closing modal and redirecting
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading about subjects...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
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
          <Text style={styles.headerTitle}>{subSubject.sub_subject_name}</Text>
        </View>
        <Text style={styles.errorText}>
          Failed to load about subjects: {error}
        </Text>
        <Button title="Retry" onPress={fetchAboutSubjects} color="#007bff" />
      </View>
    );
  }

  if (aboutSubjects.length === 0) {
    return (
      <View style={styles.container}>
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
          <Text style={styles.headerTitle}>{subSubject.sub_subject_name}</Text>
        </View>
        <Text style={styles.title}>No Data Available</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Modal for Purchase Options */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {!purchaseSuccess ? (
              <>
                <Text style={styles.modalText}>
                  Choose your purchase option:
                </Text>
                <RadioButton.Group
                  onValueChange={(newValue) => setSelectedOption(newValue)}
                  value={selectedOption}
                >
                  <View style={styles.radioOption}>
                    <RadioButton value="wholeSubject" />
                    <Text style={styles.radioLabel}>
                      Whole Subject for ₹{aboutSubjects[0]?.subject_price}
                    </Text>
                  </View>
                  <View style={styles.radioOption}>
                    <RadioButton value="subSubject" />
                    <Text style={styles.radioLabel}>
                      Sub Subject for ₹{aboutSubjects[0]?.sub_subject_price}
                    </Text>
                  </View>
                </RadioButton.Group>

                <TouchableOpacity
                  style={styles.checkoutButton}
                  onPress={handleCheckout}
                >
                  <Text style={styles.checkoutButtonText}>Checkout</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.successText}>
                  Purchasing {boughtSubjectName} for ₹
                  {selectedOption === "wholeSubject"
                    ? aboutSubjects[0]?.subject_price
                    : aboutSubjects[0]?.sub_subject_price}{" "}
                  was successful!
                </Text>
                <Text style={styles.emoji}>🥳🙌</Text>
              </>
            )}
          </View>
        </View>
      </Modal>

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
        <Text style={styles.headerTitle}>{subSubject.sub_subject_name}</Text>
      </View>

      <FlatList
        data={aboutSubjects}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => `${item.about_subject_id}`}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>
              {item.sub_subject_name} - {item.subject_name}
            </Text>
            <View style={styles.videoContainer}>
              {videoLoading && (
                <ActivityIndicator
                  size="large"
                  color="white"
                  style={styles.videoLoader}
                />
              )}
              <Video
                source={{ uri: item.video_url }}
                useNativeControls
                resizeMode="contain"
                style={styles.video}
                onLoadStart={handleVideoLoadStart}
                onLoad={handleVideoLoad}
              />
            </View>

            <View style={styles.detailsContainer}>
              <Text style={styles.cardDetail}>Author: {item.author}</Text>
              <Text style={styles.cardDetail}>Language: {item.language}</Text>
              <Text style={styles.cardDetail}>
                {item.class_name} | {item.board_name}
              </Text>
              <Text style={styles.cardDetail}>
                Subject Price: ₹{item.subject_price}
              </Text>
              <Text style={styles.cardDetail}>
                Sub-Subject Price: ₹{item.sub_subject_price}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.buyButton}
              onPress={() => handleBuyPress(item.sub_subject_name)}
            >
              <Text style={styles.buyButtonText}>
                <AntDesign name="shoppingcart" size={20} color="black" /> Buy
              </Text>
            </TouchableOpacity>
          </View>
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
  card: {
    backgroundColor: "#36454F",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    marginBottom: 5,
  },
  detailsContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  cardDetail: {
    fontSize: 14,
    color: "white",
    marginVertical: 2,
  },
  video: {
    width: "100%",
    height: 200,
    marginVertical: 10,
  },
  videoLoader: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginLeft: -20,
    marginTop: -20,
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
  buyButton: {
    backgroundColor: "#f5fffa",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    elevation: 2, // optional, for shadow effect
  },
  buyButtonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 5, // Space between the icon and text
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalContent: {
    width: 250, // Fixed width for the modal
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  checkoutButton: {
    backgroundColor: "#36454F",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  checkoutButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  successText: {
    fontSize: 16,
    color: "#28a745",
    textAlign: "center",
  },
  emoji: {
    fontSize: 30,
    textAlign: "center",
  },
});

export default AboutSubject;
