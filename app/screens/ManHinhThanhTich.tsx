import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, ScrollView } from "react-native";

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
}

interface LeaderboardItem {
  id: string;
  username: string;
  points: number;
  rank: number;
}

const ManHinhThanhTich = ({ navigation }: any) => {
  const [userPoints] = useState(1250);
  const [badges] = useState<Badge[]>([
    {
      id: "1",
      name: "Độc giả mới",
      description: "Đọc 5 cuốn sách đầu tiên",
      icon: "🌟",
      earned: true,
    },
    {
      id: "2",
      name: "Độc giả chuyên nghiệp",
      description: "Đọc 20 cuốn sách",
      icon: "📚",
      earned: true,
    },
    {
      id: "3",
      name: "Độc giả xuất sắc",
      description: "Đọc 50 cuốn sách",
      icon: "🏆",
      earned: false,
    },
    {
      id: "4",
      name: "Người chia sẻ",
      description: "Viết 10 đánh giá sách",
      icon: "✍️",
      earned: true,
    },
  ]);

  const [leaderboard] = useState<LeaderboardItem[]>([
    { id: "1", username: "Nguyễn Văn A", points: 2500, rank: 1 },
    { id: "2", username: "Trần Thị B", points: 2200, rank: 2 },
    { id: "3", username: "Lê Văn C", points: 2000, rank: 3 },
    { id: "4", username: "Bạn", points: 1250, rank: 8 },
  ]);

  // Render từng huy hiệu
  const renderBadge = ({ item }: { item: Badge }) => (
    <View style={[styles.badgeContainer, !item.earned && styles.badgeLocked]}>
      <Text style={styles.badgeIcon}>{item.earned ? item.icon : "🔒"}</Text>
      <Text style={styles.badgeName}>{item.name}</Text>
      <Text style={styles.badgeDescription}>{item.description}</Text>
    </View>
  );

  // Render từng hạng trong bảng xếp hạng
  const renderLeaderboardItem = ({ item }: { item: LeaderboardItem }) => (
    <View
      style={[
        styles.leaderboardItem,
        item.username === "Bạn" && styles.currentUser,
      ]}
    >
      <Text style={styles.rank}>#{item.rank}</Text>
      <Text style={styles.username}>{item.username}</Text>
      <Text style={styles.points}>{item.points} điểm</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Thành Tích</Text>

      <View style={styles.pointsContainer}>
        <Text style={styles.pointsLabel}>Điểm thưởng của bạn:</Text>
        <Text style={styles.pointsValue}>{userPoints}</Text>
      </View>

      <Text style={styles.sectionTitle}>Huy hiệu đã nhận</Text>
      <FlatList
        data={badges}
        renderItem={renderBadge}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.badgesGrid}
      />

      <Text style={styles.sectionTitle}>Bảng xếp hạng</Text>
      <FlatList
        data={leaderboard}
        renderItem={renderLeaderboardItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.leaderboardContainer}
      />
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
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  pointsContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    alignItems: "center",
  },
  pointsLabel: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
  pointsValue: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#007bff",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  badgesGrid: {
    marginBottom: 20,
  },
  badgeContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    margin: 5,
    flex: 1,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#007bff",
  },
  badgeLocked: {
    backgroundColor: "#f8f9fa",
    borderColor: "#ccc",
  },
  badgeIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  badgeName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
    textAlign: "center",
  },
  badgeDescription: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  leaderboardContainer: {
    paddingBottom: 20,
  },
  leaderboardItem: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  currentUser: {
    backgroundColor: "#e7f3ff",
    borderWidth: 2,
    borderColor: "#007bff",
  },
  rank: {
    fontSize: 18,
    fontWeight: "bold",
    width: 50,
    color: "#333",
  },
  username: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  points: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007bff",
  },
});

export default ManHinhThanhTich;
