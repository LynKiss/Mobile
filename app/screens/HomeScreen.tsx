import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import GradientView from "../components/GradientView";
import styles from "../styles/HomeScreen.styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = ({ navigation }: any) => {
  const currentUser = {
    name: "Nguyễn Văn A",
    avatar: "https://i.pravatar.cc/120",
    membershipType: "vip",
    readingStreak: 15,
    borrowedBooks: 3,
    totalBorrowed: 24,
    wishlist: 5,
  };

  const featuredBooks = [
    {
      id: 1,
      title: "Lập trình React Native",
      author: "Nguyễn Văn B",
      available: true,
      rating: 4.8,
      reviews: 124,
      spineColor: ["#f87171", "#dc2626"],
      icon: "📖",
    },
    {
      id: 2,
      title: "Mobile App Development",
      author: "John Smith",
      available: false,
      left: 2,
      rating: 4.6,
      reviews: 89,
      spineColor: ["#60a5fa", "#2563eb"],
      icon: "📱",
    },
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 120 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Welcome Card */}
      <GradientView colors={["#3b82f6", "#7c3aed"]} style={styles.welcomeCard}>
        <View style={styles.welcomeTop}>
          <View>
            <Image source={{ uri: currentUser.avatar }} style={styles.avatar} />
            <View style={styles.onlineDot} />
          </View>
          <View style={{ flex: 1, marginLeft: 35 }}>
            <Text style={styles.welcomeTitle}>Chào mừng trở lại!</Text>
            <Text style={styles.welcomeName}>{currentUser.name}</Text>
            <View style={styles.badgesRow}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  🏆 {currentUser.membershipType === "vip" ? "VIP" : "Member"}
                </Text>
              </View>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  🔥 Streak {currentUser.readingStreak} ngày
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View
            style={[
              styles.statBox,
              { backgroundColor: "rgba(255,255,255,0.1)" },
            ]}
          >
            <Text style={[styles.statNum, { color: "#facc15" }]}>
              {currentUser.borrowedBooks}
            </Text>
            <Text style={styles.statLabel}>📚 Đang mượn</Text>
            <Text style={styles.statSub}>Tối đa 5 cuốn</Text>
          </View>
          <View
            style={[
              styles.statBox,
              { backgroundColor: "rgba(255,255,255,0.1)" },
            ]}
          >
            <Text style={[styles.statNum, { color: "#22d3ee" }]}>
              {currentUser.totalBorrowed}
            </Text>
            <Text style={styles.statLabel}>✅ Đã mượn</Text>
            <Text style={styles.statSub}>Tổng cộng</Text>
          </View>
          <View
            style={[
              styles.statBox,
              { backgroundColor: "rgba(255,255,255,0.1)" },
            ]}
          >
            <Text style={[styles.statNum, { color: "#ec4899" }]}>
              {currentUser.wishlist}
            </Text>
            <Text style={styles.statLabel}>❤️ Yêu thích</Text>
            <Text style={styles.statSub}>Danh sách</Text>
          </View>
        </View>
      </GradientView>

      {/* Featured Books */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>📚 Sách nổi bật</Text>
          <TouchableOpacity>
            <Text style={styles.sectionLink}>Xem tất cả ›</Text>
          </TouchableOpacity>
        </View>
        {featuredBooks.map((book) => (
          <View key={book.id} style={styles.bookCard}>
            <GradientView colors={book.spineColor} style={styles.bookSpine}>
              <Text style={styles.spineIcon}>{book.icon}</Text>
            </GradientView>
            <View style={{ flex: 1 }}>
              <Text style={styles.bookTitle}>{book.title}</Text>
              <Text style={styles.bookAuthor}>✍️ {book.author}</Text>
              <View style={styles.bookMeta}>
                <Text
                  style={[
                    styles.bookStatus,
                    { backgroundColor: book.available ? "#dcfce7" : "#ffedd5" },
                  ]}
                >
                  {book.available ? "✅ Có sẵn" : `⏳ Còn ${book.left} cuốn`}
                </Text>
                <Text style={styles.bookRating}>
                  ⭐ {book.rating} ({book.reviews})
                </Text>
              </View>
              <TouchableOpacity style={styles.borrowBtn}>
                <Text style={styles.borrowBtnText}>Mượn ngay</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      {/* Important Notice */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔔 Thông báo quan trọng</Text>
        <View style={styles.noticeCard}>
          <View style={styles.noticeIcon}>
            <Text style={{ color: "#fff", fontWeight: "bold" }}>!</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: "600", marginBottom: 4 }}>
              Nhắc nhở quan trọng
            </Text>
            <Text>Sách "JavaScript cơ bản" sẽ hết hạn trong 2 ngày nữa</Text>
            <TouchableOpacity style={styles.noticeBtn}>
              <Text style={styles.noticeBtnText}>Gia hạn ngay</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* AI Recommendations */}
      <GradientView
        colors={["#a855f7", "#ec4899", "#ef4444"]}
        style={styles.aiCard}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <View style={styles.aiIcon}>
            <Text style={{ fontSize: 20 }}>🤖</Text>
          </View>
          <View>
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#fff" }}>
              AI Gợi ý cho bạn
            </Text>
            <Text style={{ color: "#fff", opacity: 0.9 }}>
              Dựa trên sở thích đọc của bạn
            </Text>
          </View>
        </View>
        <View style={styles.aiBook}>
          <View style={styles.aiBookSpine}>
            <Text style={{ color: "#fff" }}>🧠</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: "700", color: "#fff" }}>
              Machine Learning cơ bản
            </Text>
            <Text style={{ color: "#fff", opacity: 0.9 }}>
              Phù hợp với lịch sử đọc của bạn
            </Text>
            <View style={{ flexDirection: "row", marginTop: 4 }}>
              <Text style={styles.aiBadge}>⭐ 4.9</Text>
              <Text style={styles.aiBadge}>🔥 Trending</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.aiBtn}>
            <Text style={{ color: "#fff" }}>Xem ngay</Text>
          </TouchableOpacity>
        </View>
      </GradientView>

      {/* Goals & Rank */}
      <View style={styles.row}>
        <GradientView colors={["#3b82f6", "#9333ea"]} style={styles.goalCard}>
          <Text style={{ fontSize: 28 }}>🎯</Text>
          <Text style={styles.goalTitle}>Mục tiêu tháng</Text>
          <Text style={{ color: "#fff", opacity: 0.9 }}>8/10 cuốn</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: "80%" }]} />
          </View>
          <Text style={styles.goalSub}>Còn 2 cuốn nữa! 💪</Text>
        </GradientView>
        <GradientView colors={["#facc15", "#f97316"]} style={styles.goalCard}>
          <Text style={{ fontSize: 28 }}>🏆</Text>
          <Text style={styles.goalTitle}>Hạng độc giả</Text>
          <Text style={{ color: "#fff", opacity: 0.9 }}>Bạc</Text>
          <Text style={styles.rankSub}>Còn 6 cuốn để lên Vàng</Text>

          <View style={styles.rankDots}>
            <View style={[styles.rankDot, { backgroundColor: "#facc15" }]} />
            <View style={[styles.rankDot, { backgroundColor: "#facc15" }]} />
            <View style={[styles.rankDot, { backgroundColor: "#facc15" }]} />
            <View
              style={[
                styles.rankDot,
                { backgroundColor: "rgba(255,255,255,0.3)" },
              ]}
            />
            <View
              style={[
                styles.rankDot,
                { backgroundColor: "rgba(255,255,255,0.3)" },
              ]}
            />
          </View>
        </GradientView>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickCard}>
        <Text style={styles.quickTitle}>⚡ Thao tác nhanh</Text>
        <View style={styles.quickRow}>
          <TouchableOpacity
            style={[styles.quickBtn, { backgroundColor: "#dbeafe" }]}
          >
            <Text style={styles.quickIcon}>🔍</Text>
            <View>
              <Text style={styles.quickLabel}>Tìm sách</Text>
              <Text style={styles.quickSub}>Khám phá ngay</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.quickBtn, { backgroundColor: "#dcfce7" }]}
          >
            <Text style={styles.quickIcon}>📚</Text>
            <View>
              <Text style={styles.quickLabel}>Sách mượn</Text>
              <Text style={styles.quickSub}>Quản lý</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
