import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import styles from "../styles/BorrowScreen.styles";

const BorrowScreen = () => {
  // 📌 Mock dữ liệu ví dụ, bạn thay bằng API/context
  const borrowedBooks = [
    {
      id: "1",
      title: "JavaScript cơ bản",
      author: "Nguyễn Văn A",
      borrowDate: "2024-01-15",
      dueDate: "2024-01-29",
      daysLeft: 2,
      status: "due-soon",
    },
    {
      id: "2",
      title: "React Native Guide",
      author: "Nguyễn Văn B",
      borrowDate: "2024-01-20",
      dueDate: "2024-02-03",
      daysLeft: 7,
      status: "active",
    },
    {
      id: "3",
      title: "Mobile Development",
      author: "John Smith",
      borrowDate: "2024-01-18",
      dueDate: "2024-02-01",
      daysLeft: 10,
      status: "active",
    },
  ];

  const handleRenew = (title: string) => {
    console.log("Gia hạn:", title);
  };

  const handleReturn = (title: string) => {
    console.log("Trả sách:", title);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Tổng quan */}
      <View style={styles.overviewCard}>
        <Text style={styles.overviewTitle}>📊 Tổng quan</Text>
        <Text style={styles.overviewText}>
          Đang mượn: 3 cuốn | Sắp hết hạn: 1 cuốn
        </Text>
      </View>

      {/* Sắp hết hạn */}
      <View>
        <Text style={styles.sectionTitle}>⚠️ Sắp hết hạn</Text>
        {borrowedBooks
          .filter((b) => b.status === "due-soon")
          .map((book) => (
            <View key={book.id} style={[styles.bookCard, styles.dueSoonCard]}>
              <View style={styles.bookHeader}>
                <Text style={styles.bookTitle}>{book.title}</Text>
                <Text style={styles.badgeDanger}>{book.daysLeft} ngày</Text>
              </View>
              <Text style={styles.bookMeta}>
                Ngày mượn: {book.borrowDate} | Hạn trả: {book.dueDate}
              </Text>
              <View style={styles.actionRow}>
                <TouchableOpacity
                  style={[styles.actionBtn, styles.renewBtn]}
                  onPress={() => handleRenew(book.title)}
                >
                  <Text style={styles.actionText}>Gia hạn</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionBtn, styles.returnBtn]}
                  onPress={() => handleReturn(book.title)}
                >
                  <Text style={styles.actionText}>Trả sách</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
      </View>

      {/* Đang mượn */}
      <View>
        <Text style={styles.sectionTitle}>📚 Đang mượn</Text>
        {borrowedBooks
          .filter((b) => b.status === "active")
          .map((book) => (
            <View key={book.id} style={styles.bookCard}>
              <View style={styles.bookHeader}>
                <Text style={styles.bookTitle}>{book.title}</Text>
                <Text style={styles.badgeSuccess}>{book.daysLeft} ngày</Text>
              </View>
              <Text style={styles.bookMeta}>
                Ngày mượn: {book.borrowDate} | Hạn trả: {book.dueDate}
              </Text>
              <View style={styles.actionRow}>
                <TouchableOpacity
                  style={[styles.actionBtn, styles.renewBtn]}
                  onPress={() => handleRenew(book.title)}
                >
                  <Text style={styles.actionText}>Gia hạn</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionBtn, styles.returnBtn]}
                  onPress={() => handleReturn(book.title)}
                >
                  <Text style={styles.actionText}>Trả sách</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
      </View>
    </ScrollView>
  );
};

export default BorrowScreen;
