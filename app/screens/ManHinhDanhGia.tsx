import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from "react-native";

interface Review {
  id: string;
  username: string;
  rating: number;
  comment: string;
}

const ManHinhDanhGia = ({ navigation, route }: any) => {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: "1",
      username: "Người dùng 1",
      rating: 4,
      comment: "Sách rất hay và hữu ích!",
    },
    {
      id: "2",
      username: "Người dùng 2",
      rating: 5,
      comment: "Tôi thích cách trình bày rõ ràng.",
    },
  ]);
  const [newRating, setNewRating] = useState<number | null>(null);
  const [newComment, setNewComment] = useState("");

  // Hàm thêm đánh giá mới
  const addReview = () => {
    if (newRating === null || newComment.trim() === "") {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ đánh giá và nhận xét");
      return;
    }

    const newReview: Review = {
      id: Date.now().toString(),
      username: "Bạn",
      rating: newRating,
      comment: newComment.trim(),
    };

    setReviews((prev) => [newReview, ...prev]);
    setNewRating(null);
    setNewComment("");
  };

  // Render sao đánh giá
  const renderStars = (count: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Text key={i} style={i <= count ? styles.starActive : styles.star}>
          ★
        </Text>
      );
    }
    return stars;
  };

  // Render từng đánh giá
  const renderReview = ({ item }: { item: Review }) => (
    <View style={styles.reviewContainer}>
      <Text style={styles.username}>{item.username}</Text>
      <View style={styles.starsContainer}>{renderStars(item.rating)}</View>
      <Text style={styles.comment}>{item.comment}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đánh Giá Sách</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Chọn số sao:</Text>
        <View style={styles.starsInputContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity
              key={star}
              onPress={() => setNewRating(star)}
              style={styles.starButton}
            >
              <Text
                style={
                  star <= (newRating || 0) ? styles.starActive : styles.star
                }
              >
                ★
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TextInput
        style={styles.textInput}
        placeholder="Viết nhận xét của bạn..."
        value={newComment}
        onChangeText={setNewComment}
        multiline
      />

      <TouchableOpacity style={styles.addButton} onPress={addReview}>
        <Text style={styles.addButtonText}>Gửi Đánh Giá</Text>
      </TouchableOpacity>

      <FlatList
        data={reviews}
        renderItem={renderReview}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.reviewsList}
      />
    </View>
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
    marginBottom: 15,
    color: "#333",
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#333",
  },
  starsInputContainer: {
    flexDirection: "row",
  },
  starButton: {
    marginRight: 5,
  },
  star: {
    fontSize: 30,
    color: "#ccc",
  },
  starActive: {
    fontSize: 30,
    color: "#f1c40f",
  },
  textInput: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    height: 100,
    textAlignVertical: "top",
    marginBottom: 15,
  },
  addButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  reviewsList: {
    paddingBottom: 20,
  },
  reviewContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  username: {
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  starsContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  comment: {
    fontSize: 16,
    color: "#555",
  },
});

export default ManHinhDanhGia;
