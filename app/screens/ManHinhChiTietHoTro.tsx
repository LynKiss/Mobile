import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Alert,
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

const ManHinhChiTietHoTro = ({ navigation, route }: any) => {
  const { theme: currentTheme } = useTheme();
  const { supportItem } = route.params;

  // State for reply functionality
  const [replyText, setReplyText] = useState("");
  const [loading, setLoading] = useState(false);
  const [replies, setReplies] = useState(supportItem.replies || []);

  // Function to add new reply to the replies state
  const addReply = (newReply: {
    id: number;
    noi_dung: string;
    ngay_tao: string;
    nguoi_tra_loi: string;
  }) => {
    setReplies((prevReplies: any) => [...prevReplies, newReply]);
  };

  // Function to refresh support item details from API
  const refreshSupportItem = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) return;

      const response = await fetch(
        `http://localhost:3000/api/ho_tro/${supportItem.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const updatedSupportItem = await response.json();
        setReplies(updatedSupportItem.replies || []);
      }
    } catch (error) {
      console.error("Error refreshing support item:", error);
    }
  };

  // Refresh data when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      refreshSupportItem();
    }, [])
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Đã xử lý":
        return "#34C759";
      case "Đang xử lý":
        return "#FF9500";
      default:
        return "#FF3B30";
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: currentTheme.colors.background,
      }}
    >
      <Header
        title="Chi tiết yêu cầu hỗ trợ"
        leftIcon="arrow-back"
        onLeftPress={() => navigation.goBack()}
      />

      <ScrollView
        style={{ flex: 1, padding: theme.spacing.md }}
        showsVerticalScrollIndicator={false}
      >
        {/* Support Request Details */}
        <Card style={{ marginBottom: theme.spacing.lg }}>
          <View style={{ padding: theme.spacing.md }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: theme.spacing.md,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "600",
                  color: currentTheme.colors.text,
                  flex: 1,
                  marginRight: theme.spacing.md,
                }}
              >
                {supportItem.tieu_de}
              </Text>
              <View
                style={{
                  paddingHorizontal: theme.spacing.sm,
                  paddingVertical: theme.spacing.xs,
                  borderRadius: theme.borderRadius.sm,
                  backgroundColor: getStatusColor(supportItem.trang_thai),
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "600",
                    color: "#fff",
                  }}
                >
                  {supportItem.trang_thai}
                </Text>
              </View>
            </View>

            <Text
              style={{
                fontSize: 16,
                color: currentTheme.colors.textSecondary,
                lineHeight: 24,
                marginBottom: theme.spacing.md,
              }}
            >
              {supportItem.noi_dung}
            </Text>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingTop: theme.spacing.md,
                borderTopWidth: 1,
                borderTopColor: currentTheme.colors.border,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: currentTheme.colors.textSecondary,
                }}
              >
                Người gửi: {supportItem.ten_nguoi_gui}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: currentTheme.colors.textSecondary,
                }}
              >
                {formatDate(supportItem.ngay_tao)}
              </Text>
            </View>
          </View>
        </Card>

        {/* Replies Section */}
        {replies && replies.length > 0 && (
          <View style={{ marginBottom: theme.spacing.xl }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                color: currentTheme.colors.text,
                marginBottom: theme.spacing.md,
              }}
            >
              Phản hồi từ hỗ trợ ({replies.length})
            </Text>

            {replies.map((reply: any, index: number) => (
              <Card key={reply.id} style={{ marginBottom: theme.spacing.sm }}>
                <View style={{ padding: theme.spacing.md }}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: theme.spacing.sm,
                    }}
                  >
                    <Ionicons
                      name="person-circle"
                      size={24}
                      color={currentTheme.colors.primary}
                      style={{ marginRight: theme.spacing.sm }}
                    />
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "600",
                        color: currentTheme.colors.primary,
                      }}
                    >
                      {reply.nguoi_tra_loi}
                    </Text>
                  </View>

                  <Text
                    style={{
                      fontSize: 16,
                      color: currentTheme.colors.text,
                      lineHeight: 24,
                      marginBottom: theme.spacing.sm,
                    }}
                  >
                    {reply.noi_dung}
                  </Text>

                  <Text
                    style={{
                      fontSize: 12,
                      color: currentTheme.colors.textSecondary,
                      textAlign: "right",
                    }}
                  >
                    {formatDate(reply.ngay_tao)}
                  </Text>
                </View>
              </Card>
            ))}
          </View>
        )}

        {/* No replies message */}
        {(!replies || replies.length === 0) && (
          <View
            style={{
              padding: theme.spacing.xl,
              alignItems: "center",
              backgroundColor: currentTheme.colors.surface,
              borderRadius: theme.borderRadius.md,
            }}
          >
            <Ionicons
              name="chatbubble-ellipses-outline"
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
              Chưa có phản hồi từ đội ngũ hỗ trợ
            </Text>
          </View>
        )}

        {/* Reply Input Section */}
        <View
          style={{
            padding: theme.spacing.md,
            backgroundColor: currentTheme.colors.surface,
            borderRadius: theme.borderRadius.md,
            marginBottom: theme.spacing.lg,
          }}
        >
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: currentTheme.colors.border,
              borderRadius: theme.borderRadius.md,
              padding: theme.spacing.md,
              fontSize: 16,
              color: currentTheme.colors.text,
              backgroundColor: currentTheme.colors.background,
              height: 100,
              textAlignVertical: "top",
              marginBottom: theme.spacing.md,
            }}
            placeholder="Nhập phản hồi của bạn..."
            placeholderTextColor={currentTheme.colors.textSecondary}
            value={replyText}
            onChangeText={setReplyText}
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            style={{
              backgroundColor: replyText.trim()
                ? currentTheme.colors.primary
                : currentTheme.colors.textSecondary,
              padding: theme.spacing.md,
              borderRadius: theme.borderRadius.md,
              alignItems: "center",
            }}
            disabled={!replyText.trim()}
            onPress={async () => {
              if (!replyText.trim()) return;
              setLoading(true);
              try {
                const token = await AsyncStorage.getItem("userToken");
                if (!token) {
                  Alert.alert("Lỗi", "Không tìm thấy token đăng nhập!");
                  setLoading(false);
                  return;
                }
                const response = await fetch(
                  `http://localhost:3000/api/ho_tro/${supportItem.id}/replies`,
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                      noi_dung: replyText.trim(),
                    }),
                  }
                );
                if (response.ok) {
                  const newReply = await response.json();
                  Alert.alert("Thành công", "Phản hồi đã được gửi!");
                  setReplyText("");
                  addReply(newReply);
                  // Note: useFocusEffect will refresh data when screen comes back into focus
                } else {
                  const errorData = await response.json();
                  Alert.alert(
                    "Lỗi",
                    errorData.message || "Có lỗi xảy ra khi gửi phản hồi!"
                  );
                }
              } catch (error) {
                console.error("Error submitting reply:", error);
                Alert.alert("Lỗi", "Không thể kết nối đến máy chủ!");
              } finally {
                setLoading(false);
              }
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 16,
                fontWeight: "600",
              }}
            >
              Gửi phản hồi
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ManHinhChiTietHoTro;
