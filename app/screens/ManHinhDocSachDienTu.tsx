import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";

const ManHinhDocSachDienTu = ({ navigation, route }: any) => {
  const [isReading, setIsReading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Giả sử nhận thông tin sách từ route params
  const book = route?.params?.book || {
    title: "Sách Mẫu",
    author: "Tác giả Mẫu",
    type: "PDF",
  };

  // Hàm xử lý đọc sách
  const handleReadBook = () => {
    setIsReading(true);
    Alert.alert("Đọc sách", "Chức năng đọc sách sẽ được triển khai sau");
    setIsReading(false);
  };

  // Hàm xử lý nghe audio
  const handlePlayAudio = () => {
    setIsPlaying(!isPlaying);
    Alert.alert(
      isPlaying ? "Dừng nghe" : "Nghe sách",
      isPlaying
        ? "Đã dừng nghe sách nói"
        : "Bắt đầu nghe sách nói (chức năng sẽ được triển khai)"
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Đọc Sách Điện Tử</Text>

      <View style={styles.bookInfo}>
        <Text style={styles.bookTitle}>{book.title}</Text>
        <Text style={styles.bookAuthor}>Tác giả: {book.author}</Text>
        <Text style={styles.bookType}>Định dạng: {book.type}</Text>
      </View>

      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={styles.optionButton}
          onPress={handleReadBook}
          disabled={isReading}
        >
          <Text style={styles.optionIcon}>📖</Text>
          <Text style={styles.optionText}>Đọc PDF/eBook</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.optionButton, isPlaying && styles.activeButton]}
          onPress={handlePlayAudio}
        >
          <Text style={styles.optionIcon}>{isPlaying ? "⏸️" : "▶️"}</Text>
          <Text style={styles.optionText}>
            {isPlaying ? "Dừng nghe" : "Nghe Audio Book"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.controlsContainer}>
        <TouchableOpacity style={styles.controlButton}>
          <Text style={styles.controlText}>⏮️</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.controlButton}>
          <Text style={styles.controlText}>⏯️</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.controlButton}>
          <Text style={styles.controlText}>⏭️</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.note}>
        * Chức năng đọc sách và nghe audio sẽ được tích hợp đầy đủ trong phiên
        bản sau
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  bookInfo: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  bookTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  bookAuthor: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
  },
  bookType: {
    fontSize: 14,
    color: "#999",
  },
  optionsContainer: {
    marginBottom: 30,
  },
  optionButton: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  activeButton: {
    backgroundColor: "#e7f3ff",
    borderColor: "#007bff",
  },
  optionIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
  controlsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  controlButton: {
    backgroundColor: "#007bff",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  controlText: {
    fontSize: 24,
    color: "#fff",
  },
  note: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    fontStyle: "italic",
  },
});

export default ManHinhDocSachDienTu;
