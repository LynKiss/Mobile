import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  Image,
  ActivityIndicator,
} from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import { useBooks } from "../navigation/BookContext";
import styles from "../styles/WishlistScreen.styles";
import GradientBox from "../components/GradientBox";
import * as Animatable from "react-native-animatable";
import AsyncStorage from "@react-native-async-storage/async-storage";

const WishlistScreen = ({ navigation }: any) => {
  const { theme } = useTheme();
  const { wishlistItems, removeFromWishlist, loadWishlist } = useBooks();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWishlistData();
  }, []);

  const loadWishlistData = async () => {
    setLoading(true);
    await loadWishlist();
    setLoading(false);
  };

  const handleRemoveFromWishlist = async (bookId: string, title: string) => {
    Alert.alert(
      "Xác nhận xóa",
      `Bạn có muốn xóa "${title}" khỏi danh sách yêu thích không?`,
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Xóa",
          style: "destructive",
          onPress: async () => {
            const success = await removeFromWishlist(bookId);
            if (success) {
              Alert.alert("Thành công", "Đã xóa khỏi danh sách yêu thích");
            } else {
              Alert.alert("Lỗi", "Không thể xóa sách khỏi danh sách yêu thích");
            }
          },
        },
      ]
    );
  };

  const getAvailabilityStatus = (book: any) => {
    if (book.so_luong > 5) return "available";
    if (book.so_luong === 0) return "unavailable";
    return "limited";
  };

  const getAvailabilityText = (book: any) => {
    if (book.so_luong > 5) return "✅ Có sẵn";
    if (book.so_luong === 0) return "❌ Đã hết";
    return `⏳ Còn ${book.so_luong} cuốn`;
  };

  const getAvailabilityStyle = (book: any) => {
    const status = getAvailabilityStatus(book);
    switch (status) {
      case "available":
        return styles.availableText;
      case "unavailable":
        return styles.unavailableText;
      case "limited":
        return styles.limitedText;
      default:
        return styles.availableText;
    }
  };

  const getRandomGradient = (): [string, string] => {
    const gradients: [string, string][] = [
      ["#6366f1", "#4338ca"],
      ["#14b8a6", "#0f766e"],
      ["#f59e0b", "#d97706"],
      ["#ef4444", "#dc2626"],
      ["#8b5cf6", "#7c3aed"],
      ["#06b6d4", "#0891b2"],
    ];
    return gradients[Math.floor(Math.random() * gradients.length)];
  };

  const renderBook = ({ item, index }: any) => {
    const book = item.book;
    const availability = getAvailabilityStatus(book);
    const isAvailable = availability === "available";
    const isUnavailable = availability === "unavailable";
    const isLimited = availability === "limited";

    return (
      <Animatable.View
        animation="fadeInUp"
        duration={600}
        delay={index * 120}
        useNativeDriver
      >
        <View style={styles.bookCard}>
          {/* Bìa sách */}
          <GradientBox colors={getRandomGradient()} style={styles.bookCover}>
            {book.hinh_bia ? (
              <Image
                source={{ uri: book.hinh_bia }}
                style={styles.bookCoverImage}
                resizeMode="cover"
              />
            ) : (
              <Text style={styles.bookEmoji}>📚</Text>
            )}
          </GradientBox>

          {/* Thông tin */}
          <View style={styles.bookInfo}>
            <Text style={styles.bookTitle} numberOfLines={2}>
              {book.tieu_de}
            </Text>
            <Text style={styles.bookAuthor}>Tác giả: {book.tac_gia}</Text>

            <Text style={getAvailabilityStyle(book)}>
              {getAvailabilityText(book)}
            </Text>

            {/* Buttons */}
            <View style={styles.actionRow}>
              {isAvailable && (
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={[styles.button, styles.borrowBtn]}
                  onPress={() => navigation.navigate("Borrow", { book })}
                >
                  <Text style={styles.borrowBtnText}>Mượn ngay</Text>
                </TouchableOpacity>
              )}
              {isUnavailable && (
                <TouchableOpacity
                  style={[styles.button, styles.disabledBtn]}
                  disabled
                >
                  <Text style={styles.disabledBtnText}>Hết sách</Text>
                </TouchableOpacity>
              )}
              {isLimited && (
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={[styles.button, styles.borrowBtn]}
                  onPress={() => navigation.navigate("Borrow", { book })}
                >
                  <Text style={styles.borrowBtnText}>Mượn ngay</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                activeOpacity={0.8}
                style={[styles.button, styles.removeBtn]}
                onPress={() =>
                  handleRemoveFromWishlist(item.ma_sach, book.tieu_de)
                }
              >
                <Text style={styles.removeBtnText}>🗑️</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Animatable.View>
    );
  };

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          styles.loadingContainer,
          { backgroundColor: theme.colors.background },
        ]}
      >
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={styles.loadingText}>Đang tải danh sách yêu thích...</Text>
      </View>
    );
  }

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.header}>
        <Text style={styles.title}>❤️ Danh sách yêu thích</Text>
        <Text style={styles.countText}>{wishlistItems.length} cuốn</Text>
      </View>

      <FlatList
        data={wishlistItems}
        keyExtractor={(item) => item.id}
        renderItem={renderBook}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Animatable.View
            animation="fadeIn"
            duration={500}
            style={styles.emptyBox}
          >
            <Text style={styles.emptyText}>Danh sách trống</Text>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.button, styles.borrowBtn]}
              onPress={() => navigation.navigate("Search")}
            >
              <Text style={styles.borrowBtnText}>Tìm sách</Text>
            </TouchableOpacity>
          </Animatable.View>
        }
      />
    </View>
  );
};

export default WishlistScreen;
