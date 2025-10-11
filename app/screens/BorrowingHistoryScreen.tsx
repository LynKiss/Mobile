import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
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

interface BorrowingSlip {
  ma_phieu_muon: number;
  ngay_muon: string;
  han_tra: string;
  trang_thai_phieu: string;
}

const BorrowingHistoryScreen = ({ navigation }: any) => {
  const { theme: currentTheme } = useTheme();
  const [borrowingHistory, setBorrowingHistory] = useState<BorrowingSlip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBorrowingHistory();
  }, []);

  const fetchBorrowingHistory = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const response = await fetch(
        "http://localhost:3000/api/phieu_muon/lich-su",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setBorrowingHistory(data);
      } else {
        Alert.alert("Lỗi", "Không thể tải lịch sử mượn sách");
      }
    } catch (error) {
      Alert.alert("Lỗi", "Có lỗi xảy ra khi tải dữ liệu");
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

  const renderBorrowingItem = ({ item }: { item: BorrowingSlip }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("BorrowingDetail", { slipId: item.ma_phieu_muon })
      }
      style={{ marginBottom: theme.spacing.md }}
    >
      <Card>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: currentTheme.colors.text,
                marginBottom: theme.spacing.xs,
              }}
            >
              Phiếu mượn #{item.ma_phieu_muon}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: currentTheme.colors.textSecondary,
                marginBottom: theme.spacing.xs,
              }}
            >
              📅 Ngày mượn:{" "}
              {new Date(item.ngay_muon).toLocaleDateString("vi-VN")}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: currentTheme.colors.textSecondary,
                marginBottom: theme.spacing.sm,
              }}
            >
              📅 Trả dự kiến:{" "}
              {new Date(item.han_tra).toLocaleDateString("vi-VN")}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <View
                style={{
                  backgroundColor: getStatusColor(item.trang_thai_phieu),
                  paddingHorizontal: theme.spacing.sm,
                  paddingVertical: theme.spacing.xs,
                  borderRadius: theme.borderRadius.sm,
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "600",
                    color: "#ffffff",
                  }}
                >
                  {getStatusText(item.trang_thai_phieu)}
                </Text>
              </View>
            </View>
          </View>
          <Ionicons
            name="chevron-forward"
            size={20}
            color={currentTheme.colors.textSecondary}
          />
        </View>
      </Card>
    </TouchableOpacity>
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
          Đang tải lịch sử...
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: currentTheme.colors.background,
      }}
    >
      <Header
        title="Lịch sử mượn sách"
        leftIcon="arrow-back"
        onLeftPress={() => navigation.goBack()}
      />

      <View style={{ flex: 1, padding: theme.spacing.md }}>
        {borrowingHistory.length === 0 ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
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
              Chưa có lịch sử mượn sách
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: currentTheme.colors.textSecondary,
                textAlign: "center",
              }}
            >
              Khi bạn mượn sách, lịch sử sẽ xuất hiện ở đây
            </Text>
          </View>
        ) : (
          <FlatList
            data={borrowingHistory}
            keyExtractor={(item) => item.ma_phieu_muon.toString()}
            renderItem={renderBorrowingItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: theme.spacing.xl }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default BorrowingHistoryScreen;
