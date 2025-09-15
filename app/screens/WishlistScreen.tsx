import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import styles from "../styles/WishlistScreen.styles";
import GradientBox from "../components/GradientBox";
import * as Animatable from "react-native-animatable";

const WishlistScreen = ({ navigation }: any) => {
  const { theme } = useTheme();
  const [wishlistBooks, setWishlistBooks] = useState([
    {
      id: "1",
      title: "Advanced React Patterns",
      author: "Kent C. Dodds",
      availability: "available",
      gradient: ["#6366f1", "#4338ca"],
      emoji: "🔮",
    },
    {
      id: "2",
      title: "Clean Code",
      author: "Robert C. Martin",
      availability: "unavailable",
      gradient: ["#14b8a6", "#0f766e"],
      emoji: "🌊",
    },
    {
      id: "3",
      title: "System Design Interview",
      author: "Alex Xu",
      availability: "limited",
      gradient: ["#f59e0b", "#d97706"],
      emoji: "⚡",
    },
  ]);

  const handleRemoveFromWishlist = (id: string, title: string) => {
    Alert.alert(
      "Xác nhận xóa",
      `Bạn có muốn xóa "${title}" khỏi danh sách yêu thích không?`,
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Xóa",
          style: "destructive",
          onPress: () => {
            setWishlistBooks(wishlistBooks.filter((b) => b.id !== id));
          },
        },
      ]
    );
  };

  const renderBook = ({ item, index }: any) => {
    const isAvailable = item.availability === "available";
    const isUnavailable = item.availability === "unavailable";
    const isLimited = item.availability === "limited";

    return (
      <Animatable.View
        animation="fadeInUp"
        duration={600}
        delay={index * 120}
        useNativeDriver
      >
        <View style={styles.bookCard}>
          {/* Bìa sách */}
          <GradientBox colors={item.gradient} style={styles.bookCover}>
            <Text style={styles.bookEmoji}>{item.emoji}</Text>
          </GradientBox>

          {/* Thông tin */}
          <View style={styles.bookInfo}>
            <Text style={styles.bookTitle}>{item.title}</Text>
            <Text style={styles.bookAuthor}>Tác giả: {item.author}</Text>

            {isAvailable && <Text style={styles.availableText}>✅ Có sẵn</Text>}
            {isUnavailable && (
              <Text style={styles.unavailableText}>❌ Đã hết</Text>
            )}
            {isLimited && <Text style={styles.limitedText}>⏳ Còn 1 cuốn</Text>}

            {/* Buttons */}
            <View style={styles.actionRow}>
              {isAvailable && (
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={[styles.button, styles.borrowBtn]}
                  onPress={() => navigation.navigate("Borrow")}
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
                  onPress={() => navigation.navigate("Borrow")}
                >
                  <Text style={styles.borrowBtnText}>Mượn ngay</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                activeOpacity={0.8}
                style={[styles.button, styles.removeBtn]}
                onPress={() => handleRemoveFromWishlist(item.id, item.title)}
              >
                <Text style={styles.removeBtnText}>🗑️</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Animatable.View>
    );
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.header}>
        <Text style={styles.title}>❤️ Danh sách yêu thích</Text>
        <Text style={styles.countText}>{wishlistBooks.length} cuốn</Text>
      </View>

      <FlatList
        data={wishlistBooks}
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
