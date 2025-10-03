import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import GradientView from "../components/GradientView";
import styles from "../styles/HomeScreen.styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../contexts/AuthContext";

const HomeScreen = ({ navigation }: any) => {
  const { user: authUser } = useAuth();
  const [user, setUser] = useState<any>(null);
  const [featuredBooks, setFeaturedBooks] = useState<any[]>([]);
  const [importantNotices, setImportantNotices] = useState<any[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        if (!token) {
          console.error("No user token found");
          setLoading(false);
          return;
        }

        let userId = await AsyncStorage.getItem("userId");
        if (!userId && authUser && authUser.id) {
          userId = authUser.id;
        }
        if (!userId) {
          console.error("No user ID found");
          setLoading(false);
          return;
        }

        const response = await fetch(
          `http://localhost:3000/api/nguoi_dung/home/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          console.error("API response not ok:", response.status);
          setLoading(false);
          return;
        }

        const data = await response.json();
        setUser(data.user);
        setFeaturedBooks(
          (data.featuredBooks || [])
            .map((book: any) => ({
              ...book,
              available: book.available === 1,
              rating: parseFloat(book.rating),
              reviews: book.reviews,
              left: parseInt(book.leftCopies),
              spineColor: ["#f87171", "#dc2626"],
              icon: "📖",
            }))
            .filter((book: any) => book.available)
            .slice(0, 2)
        );
        setImportantNotices(data.importantNotices || []);
        setRecommendations(data.recommendations || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [authUser]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Không có dữ liệu người dùng</Text>
      </View>
    );
  }

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
            <Image
              source={{ uri: user.avatar || "https://i.pravatar.cc/120" }}
              style={styles.avatar}
            />
            <View style={styles.onlineDot} />
          </View>
          <View style={{ flex: 1, marginLeft: 35 }}>
            <Text style={styles.welcomeTitle}>Chào mừng trở lại!</Text>
            <Text style={styles.welcomeName}>
              {user.name || "Không có tên"}
            </Text>
            <View style={styles.badgesRow}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  🏆{" "}
                  {user.membershipType === "vip"
                    ? "VIP"
                    : user.membershipType || "Member"}
                </Text>
              </View>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  🔥 Streak {user.readingStreak ?? 0} ngày
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
              {user.borrowedBooks ?? 0}
            </Text>
            <Text style={styles.statLabel}>📚 Đang mượn</Text>
            <Text style={styles.statSub}>Tối đa 15 cuốn</Text>
          </View>
          <View
            style={[
              styles.statBox,
              { backgroundColor: "rgba(255,255,255,0.1)" },
            ]}
          >
            <Text style={[styles.statNum, { color: "#22d3ee" }]}>
              {user.totalBorrowed ?? 0}
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
              {user.wishlist ?? 0}
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
        {featuredBooks.length === 0 ? (
          <Text>Không có sách nổi bật</Text>
        ) : (
          featuredBooks.map((book) => (
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
                      {
                        backgroundColor: book.available ? "#dcfce7" : "#ffedd5",
                      },
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
          ))
        )}
      </View>

      {/* Important Notice */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔔 Thông báo quan trọng</Text>
        {importantNotices.length === 0 ? (
          <Text>Không có thông báo quan trọng</Text>
        ) : (
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
        )}
      </View>

      {/* AI Recommendations */}
      {recommendations.length === 0 ? (
        <Text>Không có gợi ý</Text>
      ) : (
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
                {recommendations[0].title}
              </Text>
              <Text style={{ color: "#fff", opacity: 0.9 }}>
                {recommendations[0].description}
              </Text>
              <View style={{ flexDirection: "row", marginTop: 4 }}>
                <Text style={styles.aiBadge}>
                  ⭐ {recommendations[0].rating}
                </Text>
                <Text style={styles.aiBadge}>🔥 Trending</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.aiBtn}>
              <Text style={{ color: "#fff" }}>Xem ngay</Text>
            </TouchableOpacity>
          </View>
        </GradientView>
      )}

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
