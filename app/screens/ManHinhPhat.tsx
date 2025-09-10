import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

interface Penalty {
  id: string;
  reason: string;
  amount: number;
  dueDate: string;
  status: "Chưa thanh toán" | "Đã thanh toán";
}

const ManHinhPhat = ({ navigation }: any) => {
  const [penalties, setPenalties] = useState<Penalty[]>([
    {
      id: "1",
      reason: "Quá hạn trả sách",
      amount: 50000,
      dueDate: "2024-05-01",
      status: "Chưa thanh toán",
    },
    {
      id: "2",
      reason: "Mất sách",
      amount: 200000,
      dueDate: "2024-04-28",
      status: "Đã thanh toán",
    },
  ]);

  // Hàm thanh toán phí phạt
  const payPenalty = (penalty: Penalty) => {
    Alert.alert(
      "Xác nhận thanh toán",
      `Bạn có muốn thanh toán ${penalty.amount.toLocaleString()} VND cho "${
        penalty.reason
      }"?`,
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Thanh toán",
          onPress: () => {
            // Chuyển đến màn hình thanh toán
            navigation.navigate("ManHinhThanhToan", {
              amount: penalty.amount,
              reason: penalty.reason,
            });
          },
        },
      ]
    );
  };

  // Render từng phí phạt
  const renderPenalty = ({ item }: { item: Penalty }) => (
    <View style={styles.penaltyContainer}>
      <View style={styles.infoContainer}>
        <Text style={styles.reason}>{item.reason}</Text>
        <Text style={styles.amount}>{item.amount.toLocaleString()} VND</Text>
        <Text style={styles.dueDate}>Hạn thanh toán: {item.dueDate}</Text>
        <Text style={styles.status}>Trạng thái: {item.status}</Text>
      </View>
      {item.status === "Chưa thanh toán" && (
        <TouchableOpacity
          style={styles.payButton}
          onPress={() => payPenalty(item)}
        >
          <Text style={styles.payButtonText}>Thanh toán ngay</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danh Sách Phí Phạt</Text>
      <FlatList
        data={penalties}
        renderItem={renderPenalty}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
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
    marginBottom: 15,
    color: "#333",
    textAlign: "center",
  },
  listContainer: {
    paddingBottom: 20,
  },
  penaltyContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  infoContainer: {
    flex: 1,
  },
  reason: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  amount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#dc3545",
    marginBottom: 5,
  },
  dueDate: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  status: {
    fontSize: 14,
    color: "#007bff",
  },
  payButton: {
    backgroundColor: "#28a745",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  payButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ManHinhPhat;
