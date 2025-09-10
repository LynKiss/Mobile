import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ManHinhThanhToan = ({ navigation }: any) => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  // Danh sách phương thức thanh toán
  const paymentMethods = [
    { id: "momo", name: "Ví MoMo", icon: "💳" },
    { id: "zalopay", name: "ZaloPay", icon: "💰" },
    { id: "bank", name: "Chuyển khoản ngân hàng", icon: "🏦" },
  ];

  // Hàm xử lý thanh toán
  const handlePayment = () => {
    if (!selectedMethod) {
      Alert.alert("Lỗi", "Vui lòng chọn phương thức thanh toán");
      return;
    }

    Alert.alert(
      "Xác nhận thanh toán",
      `Bạn có muốn thanh toán bằng ${
        paymentMethods.find((m) => m.id === selectedMethod)?.name
      }?`,
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Xác nhận",
          onPress: () => {
            // Logic thanh toán ở đây
            Alert.alert("Thành công", "Thanh toán thành công!");
            navigation.goBack();
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Thanh Toán Phí Phạt</Text>

      <View style={styles.amountContainer}>
        <Text style={styles.amountLabel}>Số tiền cần thanh toán:</Text>
        <Text style={styles.amount}>50.000 VND</Text>
      </View>

      <Text style={styles.sectionTitle}>Chọn phương thức thanh toán:</Text>

      {paymentMethods.map((method) => (
        <TouchableOpacity
          key={method.id}
          style={[
            styles.methodContainer,
            selectedMethod === method.id && styles.selectedMethod,
          ]}
          onPress={() => setSelectedMethod(method.id)}
        >
          <Text style={styles.methodIcon}>{method.icon}</Text>
          <Text style={styles.methodName}>{method.name}</Text>
          {selectedMethod === method.id && (
            <Text style={styles.checkmark}>✓</Text>
          )}
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
        <Text style={styles.payButtonText}>Thanh Toán Ngay</Text>
      </TouchableOpacity>
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
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  amountContainer: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: "center",
  },
  amountLabel: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
  },
  amount: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#dc3545",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  methodContainer: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  selectedMethod: {
    borderColor: "#007bff",
    backgroundColor: "#e7f3ff",
  },
  methodIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  methodName: {
    fontSize: 16,
    flex: 1,
    color: "#333",
  },
  checkmark: {
    fontSize: 18,
    color: "#007bff",
    fontWeight: "bold",
  },
  payButton: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  payButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ManHinhThanhToan;
