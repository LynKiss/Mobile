import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: "Workshop" | "Giới thiệu sách" | "Hoạt động khác";
  registered: boolean;
}

const ManHinhSuKien = ({ navigation }: any) => {
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      title: "Workshop Viết Sáng Tạo",
      description: "Học cách viết sách và phát triển ý tưởng sáng tạo",
      date: "2024-05-15",
      time: "14:00 - 16:00",
      location: "Phòng hội thảo A",
      type: "Workshop",
      registered: false,
    },
    {
      id: "2",
      title: "Giới thiệu sách mới tháng 5",
      description: "Khám phá những cuốn sách hay nhất tháng này",
      date: "2024-05-20",
      time: "10:00 - 12:00",
      location: "Sảnh chính",
      type: "Giới thiệu sách",
      registered: true,
    },
    {
      id: "3",
      title: "Buổi giao lưu với tác giả",
      description: "Gặp gỡ và trò chuyện với tác giả nổi tiếng",
      date: "2024-05-25",
      time: "18:00 - 20:00",
      location: "Phòng hội thảo B",
      type: "Hoạt động khác",
      registered: false,
    },
  ]);

  // Hàm đăng ký tham gia sự kiện
  const registerForEvent = (eventId: string) => {
    setEvents((prev) =>
      prev.map((event) =>
        event.id === eventId ? { ...event, registered: true } : event
      )
    );
    Alert.alert("Thành công", "Đã đăng ký tham gia sự kiện!");
  };

  // Hàm hủy đăng ký
  const unregisterFromEvent = (eventId: string) => {
    Alert.alert("Xác nhận", "Bạn có chắc chắn muốn hủy đăng ký?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xác nhận",
        onPress: () => {
          setEvents((prev) =>
            prev.map((event) =>
              event.id === eventId ? { ...event, registered: false } : event
            )
          );
          Alert.alert("Thông báo", "Đã hủy đăng ký thành công");
        },
      },
    ]);
  };

  // Render từng sự kiện
  const renderEvent = ({ item }: { item: Event }) => (
    <View style={styles.eventContainer}>
      <View style={styles.eventHeader}>
        <Text style={styles.eventTitle}>{item.title}</Text>
        <Text style={styles.eventType}>{item.type}</Text>
      </View>

      <Text style={styles.eventDescription}>{item.description}</Text>

      <View style={styles.eventDetails}>
        <Text style={styles.detailText}>📅 {item.date}</Text>
        <Text style={styles.detailText}>🕒 {item.time}</Text>
        <Text style={styles.detailText}>📍 {item.location}</Text>
      </View>

      <TouchableOpacity
        style={[
          styles.registerButton,
          item.registered && styles.registeredButton,
        ]}
        onPress={() =>
          item.registered
            ? unregisterFromEvent(item.id)
            : registerForEvent(item.id)
        }
      >
        <Text style={styles.registerButtonText}>
          {item.registered ? "Đã đăng ký" : "Đăng ký tham gia"}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sự Kiện Thư Viện</Text>
      <FlatList
        data={events}
        renderItem={renderEvent}
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
  eventContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  eventHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
  },
  eventType: {
    fontSize: 12,
    color: "#007bff",
    backgroundColor: "#e7f3ff",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  eventDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
    lineHeight: 20,
  },
  eventDetails: {
    marginBottom: 15,
  },
  detailText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
  registerButton: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  registeredButton: {
    backgroundColor: "#28a745",
  },
  registerButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default ManHinhSuKien;
