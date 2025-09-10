import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Dimensions,
  ScrollView,
} from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");

const normalizeBook = (raw: any) => ({
  id: raw.ma_sach,
  title: raw.ten_sach,
  author: raw.tac_gia,
  category: raw.ma_the_loai,
  publisher: raw.ma_nxb,
  year: raw.nam_xuat_ban,
  pages: raw.so_trang,
  isbn: raw.isbn,
  location: raw.ma_khu_vuc,
  quantity: raw.so_luong,
  description: raw.mo_ta,
  image: raw.hinh_anh
    ? { uri: "http://160.250.132.142/uploads/" + raw.hinh_anh }
    : require("../../assets/images/adaptive-icon.png"),
});

const HomeScreen = ({ navigation }: any) => {
  const { theme } = useTheme();
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("userToken");
      const response = await fetch("http://160.250.132.142/api/sach", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setBooks(data.map((b: any) => normalizeBook(b)));
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderBookCard = ({ item }: any) => (
    <TouchableOpacity
      style={[styles.bookCard, { backgroundColor: theme.colors.surface }]}
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
          numberOfLines={1}
        >
          {item.author}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      {/* Banner */}
      <View style={[styles.banner, { backgroundColor: theme.colors.primary }]}>
        <Text style={styles.bannerText}>
          📚 Chào mừng bạn đến với Thư viện Quốc gia
        </Text>
      </View>

      {/* Thông báo nhanh */}
      <View
        style={[styles.notification, { backgroundColor: theme.colors.surface }]}
      >
        <Text style={[styles.notificationTitle, { color: theme.colors.text }]}>
          🔔 Thông báo
        </Text>
        <Text
          style={[
            styles.notificationItem,
            { color: theme.colors.textSecondary },
          ]}
        >
          - Hạn trả sách: 3 cuốn
        </Text>
        <Text
          style={[
            styles.notificationItem,
            { color: theme.colors.textSecondary },
          ]}
        >
          - Sách sắp hết: 2 cuốn
        </Text>
      </View>

      {/* Sách nổi bật */}
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          🔥 Sách nổi bật
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Search", { featuredOnly: true })}
        >
          <Text style={[styles.viewAll, { color: theme.colors.primary }]}>
            Xem tất cả
          </Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator
          size="large"
          color={theme.colors.primary}
          style={{ marginTop: 20 }}
        />
      ) : (
        <FlatList
          data={books.slice(0, 6)}
          renderItem={renderBookCard}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          contentContainerStyle={{ paddingBottom: 20 }}
          scrollEnabled={false} // để scroll bằng ScrollView
        />
      )}

      {/* Có thể thêm mục “Đề xuất cho bạn” */}
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          ✨ Đề xuất cho bạn
        </Text>
      </View>
      <FlatList
        data={books.slice(6, 10)}
        renderItem={renderBookCard}
        keyExtractor={(item) => "rec-" + item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 30 }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  banner: {
    padding: 16,
    borderRadius: 12,
    margin: 12,
    alignItems: "center",
  },
  bannerText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  notification: {
    marginHorizontal: 12,
    marginBottom: 15,
    padding: 14,
    borderRadius: 12,
    elevation: 3,
  },
  notificationTitle: {
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 6,
  },
  notificationItem: {
    fontSize: 13,
    marginBottom: 3,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 12,
    marginVertical: 8,
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  viewAll: {
    fontSize: 14,
    fontWeight: "600",
  },
  bookCard: {
    width: (width - 40) / 2,
    marginBottom: 15,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 4,
  },
  bookImage: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  bookInfo: {
    padding: 10,
  },
  bookTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
  },
  bookAuthor: {
    fontSize: 12,
  },
});

export default HomeScreen;
