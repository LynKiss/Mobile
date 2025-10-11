import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  TextInput,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../contexts/ThemeContext";
import { useFocusEffect } from "@react-navigation/native";
import Header from "../components/Header";
import Card from "../components/Card";
import { theme } from "../styles/theme";

interface SupportItem {
  id: number;
  ma_nguoi_dung: number;
  tieu_de: string;
  noi_dung: string;
  trang_thai: string;
  ngay_tao: string;
  ten_nguoi_gui: string;
  replies?: {
    id: number;
    noi_dung: string;
    ngay_tao: string;
    nguoi_tra_loi: string;
  }[];
}

const ManHinhHoTro = ({ navigation }: any) => {
  const { theme: currentTheme } = useTheme();

  // State for support request form
  const [supportTitle, setSupportTitle] = useState("");
  const [supportContent, setSupportContent] = useState("");
  const [supportHistory, setSupportHistory] = useState<SupportItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // State for filtering, searching, and sorting
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("Tất cả");
  const [sortBy, setSortBy] = useState<string>("Mới nhất");
  const [showFilters, setShowFilters] = useState(false);

  // Fetch support history on component mount and when screen comes into focus
  useEffect(() => {
    fetchSupportHistory();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchSupportHistory();
    }, [])
  );

  // Function to fetch user's support history
  const fetchSupportHistory = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) return;

      const response = await fetch("http://localhost:3000/api/ho_tro/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setSupportHistory(data);
      }
    } catch (error) {
      console.error("Error fetching support history:", error);
    }
  };

  // Function to submit support request
  const submitSupportRequest = async () => {
    if (!supportTitle.trim() || !supportContent.trim()) {
      Alert.alert("Lỗi", "Vui lòng điền đầy đủ tiêu đề và nội dung!");
      return;
    }

    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        Alert.alert("Lỗi", "Không tìm thấy token đăng nhập!");
        return;
      }

      const response = await fetch("http://localhost:3000/api/ho_tro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          tieu_de: supportTitle.trim(),
          noi_dung: supportContent.trim(),
        }),
      });

      if (response.ok) {
        Alert.alert("Thành công", "Yêu cầu hỗ trợ đã được gửi thành công!");
        setSupportTitle("");
        setSupportContent("");
        setShowForm(false);
        fetchSupportHistory(); // Refresh history
      } else {
        const errorData = await response.json();
        Alert.alert(
          "Lỗi",
          errorData.message || "Có lỗi xảy ra khi gửi yêu cầu!"
        );
      }
    } catch (error) {
      console.error("Error submitting support request:", error);
      Alert.alert("Lỗi", "Không thể kết nối đến máy chủ!");
    } finally {
      setLoading(false);
    }
  };

  const handleSupportItemPress = (item: SupportItem) => {
    navigation.navigate("SupportDetail", { supportItem: item });
  };

  // Filter, search, and sort support history
  const filteredSupportHistory = supportHistory
    .filter((item) => {
      // Filter by status
      if (statusFilter !== "Tất cả" && item.trang_thai !== statusFilter) {
        return false;
      }
      // Search by title or content
      if (
        searchText.trim() !== "" &&
        !(
          item.tieu_de.toLowerCase().includes(searchText.toLowerCase()) ||
          item.noi_dung.toLowerCase().includes(searchText.toLowerCase())
        )
      ) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      // Sort by latest reply date or creation date
      const getLatestReplyDate = (item: SupportItem) => {
        if (item.replies && item.replies.length > 0) {
          return new Date(
            item.replies.reduce((latest, reply) =>
              new Date(reply.ngay_tao) > new Date(latest.ngay_tao)
                ? reply
                : latest
            ).ngay_tao
          );
        }
        return new Date(item.ngay_tao);
      };
      const dateA = getLatestReplyDate(a);
      const dateB = getLatestReplyDate(b);
      if (sortBy === "Mới nhất") {
        return dateB.getTime() - dateA.getTime();
      } else {
        return dateA.getTime() - dateB.getTime();
      }
    });

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: currentTheme.colors.background,
      }}
    >
      <Header
        title="Hỗ trợ & Yêu cầu"
        leftIcon="arrow-back"
        onLeftPress={() => navigation.goBack()}
        rightIcon="add"
        onRightPress={() => setShowForm(!showForm)}
      />

      <ScrollView
        style={{ flex: 1, padding: theme.spacing.md }}
        showsVerticalScrollIndicator={false}
      >
        {/* Search and Filter Section */}
        <View
          style={{
            marginBottom: theme.spacing.md,
            flexDirection: "row",
            alignItems: "center",
            gap: theme.spacing.sm,
          }}
        >
          <TextInput
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: currentTheme.colors.border,
              borderRadius: theme.borderRadius.md,
              padding: theme.spacing.md,
              fontSize: 16,
              color: currentTheme.colors.text,
              backgroundColor: currentTheme.colors.surface,
            }}
            placeholder="Tìm kiếm theo tiêu đề hoặc nội dung"
            placeholderTextColor={currentTheme.colors.textSecondary}
            value={searchText}
            onChangeText={setSearchText}
          />
          <TouchableOpacity
            style={{
              padding: theme.spacing.md,
              backgroundColor: currentTheme.colors.primary,
              borderRadius: theme.borderRadius.md,
            }}
            onPress={() => setShowFilters(!showFilters)}
          >
            <Ionicons name="filter" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Filters and Sorting */}
        {showFilters && (
          <View
            style={{
              marginBottom: theme.spacing.lg,
              backgroundColor: currentTheme.colors.surface,
              borderRadius: theme.borderRadius.md,
              padding: theme.spacing.md,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: currentTheme.colors.text,
                marginBottom: theme.spacing.sm,
              }}
            >
              Lọc theo trạng thái
            </Text>
            <View style={{ flexDirection: "row", gap: theme.spacing.md }}>
              {["Tất cả", "Đã xử lý", "Đang xử lý", "Chưa xử lý"].map(
                (status) => (
                  <TouchableOpacity
                    key={status}
                    style={{
                      paddingVertical: theme.spacing.xs,
                      paddingHorizontal: theme.spacing.sm,
                      borderRadius: theme.borderRadius.sm,
                      backgroundColor:
                        statusFilter === status
                          ? currentTheme.colors.primary
                          : currentTheme.colors.surface,
                      borderWidth: 1,
                      borderColor:
                        statusFilter === status
                          ? currentTheme.colors.primary
                          : currentTheme.colors.border,
                    }}
                    onPress={() => setStatusFilter(status)}
                  >
                    <Text
                      style={{
                        color:
                          statusFilter === status
                            ? "#fff"
                            : currentTheme.colors.text,
                        fontWeight: "600",
                      }}
                    >
                      {status}
                    </Text>
                  </TouchableOpacity>
                )
              )}
            </View>

            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: currentTheme.colors.text,
                marginTop: theme.spacing.md,
                marginBottom: theme.spacing.sm,
              }}
            >
              Sắp xếp theo
            </Text>
            <View style={{ flexDirection: "row", gap: theme.spacing.md }}>
              {["Mới nhất", "Cũ nhất"].map((sortOption) => (
                <TouchableOpacity
                  key={sortOption}
                  style={{
                    paddingVertical: theme.spacing.xs,
                    paddingHorizontal: theme.spacing.sm,
                    borderRadius: theme.borderRadius.sm,
                    backgroundColor:
                      sortBy === sortOption
                        ? currentTheme.colors.primary
                        : currentTheme.colors.surface,
                    borderWidth: 1,
                    borderColor:
                      sortBy === sortOption
                        ? currentTheme.colors.primary
                        : currentTheme.colors.border,
                  }}
                  onPress={() => setSortBy(sortOption)}
                >
                  <Text
                    style={{
                      color:
                        sortBy === sortOption
                          ? "#fff"
                          : currentTheme.colors.text,
                      fontWeight: "600",
                    }}
                  >
                    {sortOption}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Support Request Form */}
        {showForm && (
          <Card style={{ marginBottom: theme.spacing.lg }}>
            <View style={{ padding: theme.spacing.md }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "600",
                  color: currentTheme.colors.text,
                  marginBottom: theme.spacing.md,
                }}
              >
                Gửi yêu cầu hỗ trợ
              </Text>

              <View style={{ marginBottom: theme.spacing.lg }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "500",
                    color: currentTheme.colors.text,
                    marginBottom: theme.spacing.sm,
                  }}
                >
                  Tiêu đề *
                </Text>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: currentTheme.colors.border,
                    borderRadius: theme.borderRadius.md,
                    padding: theme.spacing.md,
                    fontSize: 16,
                    color: currentTheme.colors.text,
                    backgroundColor: currentTheme.colors.surface,
                  }}
                  placeholder="Nhập tiêu đề yêu cầu hỗ trợ"
                  placeholderTextColor={currentTheme.colors.textSecondary}
                  value={supportTitle}
                  onChangeText={setSupportTitle}
                  maxLength={100}
                />
              </View>

              <View style={{ marginBottom: theme.spacing.lg }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "500",
                    color: currentTheme.colors.text,
                    marginBottom: theme.spacing.sm,
                  }}
                >
                  Nội dung *
                </Text>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: currentTheme.colors.border,
                    borderRadius: theme.borderRadius.md,
                    padding: theme.spacing.md,
                    fontSize: 16,
                    color: currentTheme.colors.text,
                    backgroundColor: currentTheme.colors.surface,
                    height: 120,
                    textAlignVertical: "top",
                  }}
                  placeholder="Mô tả chi tiết vấn đề bạn gặp phải..."
                  placeholderTextColor={currentTheme.colors.textSecondary}
                  value={supportContent}
                  onChangeText={setSupportContent}
                  multiline
                  maxLength={500}
                />
                <Text
                  style={{
                    fontSize: 12,
                    color: currentTheme.colors.textSecondary,
                    textAlign: "right",
                    marginTop: theme.spacing.xs,
                  }}
                >
                  {supportContent.length}/500
                </Text>
              </View>

              <View style={{ flexDirection: "row", gap: theme.spacing.md }}>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    backgroundColor: loading
                      ? currentTheme.colors.textSecondary
                      : currentTheme.colors.primary,
                    padding: theme.spacing.md,
                    borderRadius: theme.borderRadius.md,
                    alignItems: "center",
                  }}
                  onPress={submitSupportRequest}
                  disabled={loading}
                >
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 16,
                      fontWeight: "600",
                    }}
                  >
                    {loading ? "Đang gửi..." : "Gửi yêu cầu"}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    flex: 1,
                    backgroundColor: currentTheme.colors.surface,
                    borderWidth: 1,
                    borderColor: currentTheme.colors.border,
                    padding: theme.spacing.md,
                    borderRadius: theme.borderRadius.md,
                    alignItems: "center",
                  }}
                  onPress={() => {
                    setShowForm(false);
                    setSupportTitle("");
                    setSupportContent("");
                  }}
                >
                  <Text
                    style={{
                      color: currentTheme.colors.text,
                      fontSize: 16,
                      fontWeight: "600",
                    }}
                  >
                    Hủy
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Card>
        )}

        {/* Support History Section */}
        <View style={{ marginBottom: theme.spacing.xl }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "600",
              color: currentTheme.colors.text,
              marginBottom: theme.spacing.md,
            }}
          >
            Lịch sử yêu cầu hỗ trợ
          </Text>

          {filteredSupportHistory.length > 0 ? (
            <FlatList
              data={filteredSupportHistory}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleSupportItemPress(item)}>
                  <Card style={{ marginBottom: theme.spacing.sm }}>
                    <View style={{ padding: theme.spacing.md }}>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          marginBottom: theme.spacing.sm,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: "600",
                            color: currentTheme.colors.text,
                            flex: 1,
                            marginRight: theme.spacing.md,
                          }}
                        >
                          {item.tieu_de}
                        </Text>
                        <View
                          style={{
                            paddingHorizontal: theme.spacing.sm,
                            paddingVertical: theme.spacing.xs,
                            borderRadius: theme.borderRadius.sm,
                            backgroundColor:
                              item.trang_thai === "Đã xử lý"
                                ? "#34C759"
                                : item.trang_thai === "Đang xử lý"
                                ? "#FF9500"
                                : "#FF3B30",
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 12,
                              fontWeight: "600",
                              color: "#fff",
                            }}
                          >
                            {item.trang_thai}
                          </Text>
                        </View>
                      </View>
                      <Text
                        style={{
                          fontSize: 14,
                          color: currentTheme.colors.textSecondary,
                          lineHeight: 20,
                          marginBottom: theme.spacing.sm,
                        }}
                        numberOfLines={2}
                      >
                        {item.noi_dung}
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 12,
                            color: currentTheme.colors.textSecondary,
                          }}
                        >
                          {new Date(item.ngay_tao).toLocaleDateString("vi-VN")}
                        </Text>
                        {item.replies && item.replies.length > 0 && (
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <Ionicons
                              name="chatbubble-ellipses"
                              size={14}
                              color={currentTheme.colors.primary}
                              style={{ marginRight: theme.spacing.xs }}
                            />
                            <Text
                              style={{
                                fontSize: 12,
                                color: currentTheme.colors.primary,
                                fontWeight: "500",
                              }}
                            >
                              {item.replies.length} phản hồi
                            </Text>
                          </View>
                        )}
                      </View>
                    </View>
                  </Card>
                </TouchableOpacity>
              )}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
            />
          ) : (
            <View
              style={{
                padding: theme.spacing.xl,
                alignItems: "center",
                backgroundColor: currentTheme.colors.surface,
                borderRadius: theme.borderRadius.md,
              }}
            >
              <Ionicons
                name="document-text-outline"
                size={48}
                color={currentTheme.colors.textSecondary}
                style={{ marginBottom: theme.spacing.md }}
              />
              <Text
                style={{
                  fontSize: 16,
                  color: currentTheme.colors.textSecondary,
                  textAlign: "center",
                }}
              >
                Chưa có yêu cầu hỗ trợ nào
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ManHinhHoTro;
