import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

interface Reservation {
  id: string;
  bookTitle: string;
  reservedDate: string;
  status: "Chờ duyệt" | "Đã duyệt" | "Hủy";
}

const ManHinhQuanLyDatCho = ({ navigation }: any) => {
  const [reservations, setReservations] = useState<Reservation[]>([
    {
      id: "1",
      bookTitle: "Lập trình React Native",
      reservedDate: "2024-05-01",
      status: "Chờ duyệt",
    },
    {
      id: "2",
      bookTitle: "JavaScript nâng cao",
      reservedDate: "2024-04-28",
      status: "Đã duyệt",
    },
  ]);

  // Hàm hủy đặt chỗ
  const cancelReservation = (id: string) => {
    Alert.alert("Xác nhận", "Bạn có chắc chắn muốn hủy đặt chỗ này?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xác nhận",
        onPress: () => {
          setReservations((prev) =>
            prev.map((res) => (res.id === id ? { ...res, status: "Hủy" } : res))
          );
          Alert.alert("Thông báo", "Đã hủy đặt chỗ thành công");
        },
      },
    ]);
  };

  // Render từng đặt chỗ
  const renderReservation = ({ item }: { item: Reservation }) => (
    <View style={styles.reservationContainer}>
      <View style={styles.infoContainer}>
        <Text style={styles.bookTitle}>{item.bookTitle}</Text>
        <Text style={styles.reservedDate}>Ngày đặt: {item.reservedDate}</Text>
        <Text style={styles.status}>Trạng thái: {item.status}</Text>
      </View>
      {item.status !== "Hủy" && (
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => cancelReservation(item.id)}
        >
          <Text style={styles.cancelButtonText}>Hủy</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quản Lý Đặt Chỗ</Text>
      <FlatList
        data={reservations}
        renderItem={renderReservation}
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
  reservationContainer: {
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
  bookTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  reservedDate: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  status: {
    fontSize: 14,
    color: "#007bff",
  },
  cancelButton: {
    backgroundColor: "#dc3545",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  cancelButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ManHinhQuanLyDatCho;
