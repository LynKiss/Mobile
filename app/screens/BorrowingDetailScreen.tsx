import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "../contexts/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../styles/theme";
import Card from "../components/Card";
import Header from "../components/Header";

interface BookItem {
  ten_sach: string;
  so_luong: number;
  han_tra: string;
  ngay_tra_thuc_te?: string;
  trang_thai_sach: string;
  tien_phat: string;
  ly_do_phat?: string;
  trang_thai_phat?: string;
}

const BorrowingDetailScreen = ({ navigation, route }: any) => {
  const { slipId } = route.params;
  const { theme: currentTheme } = useTheme();
  const [books, setBooks] = useState<BookItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBorrowingDetail();
  }, [slipId]);

  const fetchBorrowingDetail = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const response = await fetch(
        `http://localhost:3000/api/phieu_muon/lich-su/${slipId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setBooks(data);
      } else {
        Alert.alert("Lỗi", "Không thể tải chi tiết phiếu mượn");
        navigation.goBack();
      }
    } catch (error) {
      Alert.alert("Lỗi", "Có lỗi xảy ra khi tải dữ liệu");
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "đang mượn":
        return "#007AFF";
      case "đã trả":
        return "#34C759";
      case "quá hạn":
        return "#FF3B30";
      default:
        return "#8E8E93";
    }
  };

  const getStatusText = (status: string) => {
    switch (status.toLowerCase()) {
      case "dang_muon":
        return "Đang mượn";
      case "da_tra":
        return "Đã trả";
      case "qua_han":
        return "Quá hạn";
      default:
        return status;
    }
  };

  const renderBookItem = ({ item }: { item: BookItem }) => (
    <Card style={{ marginBottom: theme.spacing.sm }}>
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
            color: currentTheme.colors.text,
            marginBottom: theme.spacing.xs,
          }}
          numberOfLines={2}
        >
          {item.ten_sach || "Tên sách không có"}
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: currentTheme.colors.textSecondary,
            marginBottom: theme.spacing.xs,
          }}
        >
          📚 Số lượng: {item.so_luong || 0}
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: currentTheme.colors.textSecondary,
            marginBottom: theme.spacing.xs,
          }}
        >
          📅 Hạn trả:{" "}
          {item.han_tra
            ? new Date(item.han_tra).toLocaleDateString("vi-VN")
            : "N/A"}
        </Text>
        {item.ngay_tra_thuc_te && (
          <Text
            style={{
              fontSize: 14,
              color: currentTheme.colors.textSecondary,
              marginBottom: theme.spacing.xs,
            }}
          >
            📅 Trả thực tế:{" "}
            {new Date(item.ngay_tra_thuc_te).toLocaleDateString("vi-VN")}
          </Text>
        )}
        <Text
          style={{
            fontSize: 14,
            color: currentTheme.colors.textSecondary,
            marginBottom: theme.spacing.sm,
          }}
        >
          💰 Tiền phạt: {item.tien_phat || "0"} VND
        </Text>
        {item.ly_do_phat && (
          <Text
            style={{
              fontSize: 14,
              color: currentTheme.colors.textSecondary,
              marginBottom: theme.spacing.sm,
            }}
          >
            📝 Lý do phạt: {item.ly_do_phat}
          </Text>
        )}
        <View
          style={{
            backgroundColor: getStatusColor(item.trang_thai_sach || ""),
            paddingHorizontal: theme.spacing.sm,
            paddingVertical: theme.spacing.xs,
            borderRadius: theme.borderRadius.sm,
            alignSelf: "flex-start",
          }}
        >
          <Text
            style={{
              fontSize: 12,
              fontWeight: "600",
              color: "#ffffff",
            }}
          >
            {getStatusText(item.trang_thai_sach || "")}
          </Text>
        </View>
      </View>
    </Card>
  );

  if (loading) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: currentTheme.colors.background,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color={currentTheme.colors.primary} />
        <Text
          style={{
            marginTop: theme.spacing.md,
            fontSize: 16,
            color: currentTheme.colors.textSecondary,
          }}
        >
          Đang tải chi tiết...
        </Text>
      </SafeAreaView>
    );
  }

  try {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: currentTheme.colors.background,
        }}
      >
        <Header
          title={`Phiếu mượn #${slipId}`}
          leftIcon="arrow-back"
          onLeftPress={() => navigation.goBack()}
        />

        <View style={{ flex: 1, padding: theme.spacing.md }}>
          {/* Danh sách sách */}
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: currentTheme.colors.text,
              marginBottom: theme.spacing.md,
            }}
          >
            Danh sách sách mượn
          </Text>

          {books.length === 0 ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons
                name="book-outline"
                size={64}
                color={currentTheme.colors.textSecondary}
              />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "600",
                  color: currentTheme.colors.text,
                  marginTop: theme.spacing.md,
                  marginBottom: theme.spacing.sm,
                }}
              >
                Không có sách nào
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: currentTheme.colors.textSecondary,
                  textAlign: "center",
                }}
              >
                Không tìm thấy sách trong phiếu mượn này
              </Text>
            </View>
          ) : (
            <FlatList
              data={books}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderBookItem}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: theme.spacing.xl }}
            />
          )}
        </View>
      </SafeAreaView>
    );
  } catch (error) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: currentTheme.colors.background,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 16,
            color: currentTheme.colors.text,
            textAlign: "center",
          }}
        >
          Có lỗi xảy ra khi hiển thị dữ liệu
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: currentTheme.colors.textSecondary,
            textAlign: "center",
            marginTop: theme.spacing.sm,
          }}
        >
          Vui lòng thử lại sau
        </Text>
      </SafeAreaView>
    );
  }
};

export default BorrowingDetailScreen;
