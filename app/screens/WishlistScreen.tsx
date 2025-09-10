import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { useTheme } from "../contexts/ThemeContext";

const WishlistScreen = ({ navigation }: any) => {
  const { theme } = useTheme();
  const [wishlistBooks, setWishlistBooks] = useState([
    {
      id: "1",
      title: "React Native Cơ Bản",
      author: "Nguyễn Văn A",
      publisher: "NXB Giáo dục",
      year: "2023",
      image: require("../../assets/images/adaptive-icon.png"),
      availability: "available", // available, borrowed, reserved
      addedDate: "2025-08-10",
    },
    {
      id: "2",
      title: "Thiết Kế Giao Diện",
      author: "Lê Văn C",
      publisher: "NXB Mỹ thuật",
      year: "2023",
      image: require("../../assets/images/adaptive-icon.png"),
      availability: "borrowed",
      addedDate: "2025-08-12",
    },
    {
      id: "3",
      title: "Toán Học Đại Cương",
      author: "Phạm Thị D",
      publisher: "NXB Đại học",
      year: "2021",
      image: require("../../assets/images/adaptive-icon.png"),
      availability: "available",
      addedDate: "2025-08-15",
    },
  ]);

  const handleRemoveFromWishlist = (bookId: string, bookTitle: string) => {
    Alert.alert(
      "Xác nhận xóa",
      `Bạn có muốn xóa "${bookTitle}" khỏi danh sách yêu thích không?`,
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Xóa",
          style: "destructive",
          onPress: () => {
            setWishlistBooks(
              wishlistBooks.filter((book) => book.id !== bookId)
            );
            Alert.alert("Thành công", "Đã xóa sách khỏi danh sách yêu thích!");
          },
        },
      ]
    );
  };

  const handleReserveBook = (bookId: string, bookTitle: string) => {
    Alert.alert(
      "Đặt chỗ sách",
      `Bạn có muốn đặt chỗ sách "${bookTitle}" không?`,
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Đặt chỗ",
          onPress: () => {
            Alert.alert(
              "Thành công",
              "Đã đặt chỗ sách thành công! Bạn sẽ được thông báo khi sách có sẵn."
            );
          },
        },
      ]
    );
  };

  const getAvailabilityText = (availability: string) => {
    switch (availability) {
      case "available":
        return "Có sẵn";
      case "borrowed":
        return "Đang được mượn";
      case "reserved":
        return "Đã đặt chỗ";
      default:
        return "Không xác định";
    }
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "available":
        return "#28a745";
      case "borrowed":
        return "#ffc107";
      case "reserved":
        return "#007bff";
      default:
        return "#6c757d";
    }
  };

  const renderBook = ({ item }: any) => (
    <View style={[styles.bookCard, { backgroundColor: theme.colors.surface }]}>
      <TouchableOpacity
        style={styles.bookContent}
        onPress={() => navigation.navigate("BookDetail", { book: item })}
      >
        <Image source={item.image} style={styles.bookImage} />
        <View style={styles.bookInfo}>
          <Text
            style={[styles.bookTitle, { color: theme.colors.text }]}
            numberOfLines={2}
          >
            {item.title}
          </Text>
          <Text
            style={[styles.bookAuthor, { color: theme.colors.textSecondary }]}
          >
            {item.author}
          </Text>
          <Text
            style={[styles.bookDetails, { color: theme.colors.textSecondary }]}
          >
            {item.publisher} • {item.year}
          </Text>
          <View style={styles.availabilityContainer}>
            <Text
              style={[
                styles.availabilityText,
                { color: getAvailabilityColor(item.availability) },
              ]}
            >
              {getAvailabilityText(item.availability)}
            </Text>
          </View>
          <Text
            style={[styles.addedDate, { color: theme.colors.textSecondary }]}
          >
            Thêm vào: {item.addedDate}
          </Text>
        </View>
      </TouchableOpacity>

      <View style={styles.actionButtons}>
        {item.availability === "available" && (
          <TouchableOpacity
            style={[
              styles.reserveButton,
              { backgroundColor: theme.colors.primary },
            ]}
            onPress={() => handleReserveBook(item.id, item.title)}
          >
            <Text
              style={[
                styles.reserveButtonText,
                { color: theme.colors.surface },
              ]}
            >
              Đặt chỗ
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.removeButton, { backgroundColor: "#dc3545" }]}
          onPress={() => handleRemoveFromWishlist(item.id, item.title)}
        >
          <Text style={[styles.removeButtonText, { color: "#fff" }]}>Xóa</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Sách Yêu Thích
        </Text>
        <Text style={[styles.countText, { color: theme.colors.textSecondary }]}>
          {wishlistBooks.length} sách
        </Text>
      </View>

      <FlatList
        data={wishlistBooks}
        keyExtractor={(item) => item.id}
        renderItem={renderBook}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: theme.colors.text }]}>
              Danh sách yêu thích trống
            </Text>
            <Text
              style={[
                styles.emptySubtext,
                { color: theme.colors.textSecondary },
              ]}
            >
              Hãy thêm sách vào danh sách yêu thích để dễ dàng theo dõi
            </Text>
            <TouchableOpacity
              style={[
                styles.browseButton,
                { backgroundColor: theme.colors.primary },
              ]}
              onPress={() => navigation.navigate("Search")}
            >
              <Text
                style={[
                  styles.browseButtonText,
                  { color: theme.colors.surface },
                ]}
              >
                Tìm sách
              </Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  countText: {
    fontSize: 16,
    color: "#666",
  },
  bookCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bookContent: {
    flexDirection: "row",
    marginBottom: 10,
  },
  bookImage: {
    width: 60,
    height: 80,
    borderRadius: 4,
    marginRight: 15,
  },
  bookInfo: {
    flex: 1,
    justifyContent: "center",
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  bookAuthor: {
    fontSize: 14,
    color: "#666",
    marginBottom: 2,
  },
  bookDetails: {
    fontSize: 12,
    color: "#888",
    marginBottom: 4,
  },
  availabilityContainer: {
    marginBottom: 4,
  },
  availabilityText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  addedDate: {
    fontSize: 12,
    color: "#999",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  reserveButton: {
    backgroundColor: "#007bff",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 6,
    flex: 1,
    marginRight: 10,
  },
  reserveButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  removeButton: {
    backgroundColor: "#dc3545",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 6,
    flex: 1,
  },
  removeButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 18,
    color: "#666",
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
    marginBottom: 20,
  },
  browseButton: {
    backgroundColor: "#007bff",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  browseButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default WishlistScreen;
