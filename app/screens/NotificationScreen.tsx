import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../contexts/ThemeContext";
import { useNotifications } from "../contexts/NotificationContext";
import { Notification } from "../contexts/NotificationContext";

const NotificationScreen = ({ navigation }: any) => {
  const { theme } = useTheme();
  const {
    notifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAllNotifications,
  } = useNotifications();

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return "Vừa xong";
    if (minutes < 60) return `${minutes} phút trước`;
    if (hours < 24) return `${hours} giờ trước`;
    return `${days} ngày trước`;
  };

  const getIconName = (type: string) => {
    switch (type) {
      case "success":
        return "checkmark-circle";
      case "error":
        return "close-circle";
      case "warning":
        return "warning";
      case "info":
        return "information-circle";
      default:
        return "information-circle";
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case "success":
        return theme.colors.success;
      case "error":
        return theme.colors.error;
      case "warning":
        return theme.colors.warning;
      case "info":
        return theme.colors.info;
      default:
        return theme.colors.info;
    }
  };

  const handleMarkAsRead = async (id: string) => {
    await markAsRead(id);
  };

  const handleDeleteNotification = (id: string) => {
    Alert.alert(
      "Xóa thông báo",
      "Bạn có chắc chắn muốn xóa thông báo này?",
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Xóa",
          style: "destructive",
          onPress: () => deleteNotification(id),
        },
      ]
    );
  };

  const handleMarkAllAsRead = () => {
    if (notifications.some(n => !n.read)) {
      Alert.alert(
        "Đánh dấu tất cả đã đọc",
        "Bạn có muốn đánh dấu tất cả thông báo đã đọc?",
        [
          { text: "Hủy", style: "cancel" },
          {
            text: "Đồng ý",
            onPress: markAllAsRead,
          },
        ]
      );
    }
  };

  const handleClearAll = () => {
    Alert.alert(
      "Xóa tất cả thông báo",
      "Bạn có chắc chắn muốn xóa tất cả thông báo?",
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Xóa tất cả",
          style: "destructive",
          onPress: clearAllNotifications,
        },
      ]
    );
  };

  const renderNotification = ({ item }: { item: Notification }) => (
    <View
      style={[
        styles.notificationItem,
        {
          backgroundColor: item.read ? theme.colors.surface : "#e3f2fd",
          borderColor: theme.colors.border,
        },
      ]}
    >
      <View style={styles.notificationContent}>
        <View style={styles.iconContainer}>
          <Ionicons
            name={getIconName(item.type)}
            size={24}
            color={getIconColor(item.type)}
          />
        </View>
        <View style={styles.textContainer}>
          <Text
            style={[
              styles.notificationTitle,
              { color: theme.colors.text },
            ]}
          >
            {item.title}
          </Text>
          <Text
            style={[
              styles.notificationMessage,
              { color: theme.colors.textSecondary },
            ]}
          >
            {item.message}
          </Text>
          <Text
            style={[
              styles.notificationTime,
              { color: theme.colors.textSecondary },
            ]}
          >
            {formatTime(item.timestamp)}
          </Text>
        </View>
      </View>

      <View style={styles.actionButtons}>
        {!item.read && (
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: theme.colors.primary }]}
            onPress={() => handleMarkAsRead(item.id)}
          >
            <Ionicons name="checkmark" size={16} color="#fff" />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: theme.colors.error }]}
          onPress={() => handleDeleteNotification(item.id)}
        >
          <Ionicons name="trash" size={16} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header với các nút action */}
      <View style={[styles.header, { borderBottomColor: theme.colors.border }]}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>

        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
          Thông báo
        </Text>

        <View style={styles.headerActions}>
          {notifications.some(n => !n.read) && (
            <TouchableOpacity
              style={styles.headerButton}
              onPress={handleMarkAllAsRead}
            >
              <Ionicons name="checkmark-done" size={24} color={theme.colors.primary} />
            </TouchableOpacity>
          )}
          {notifications.length > 0 && (
            <TouchableOpacity
              style={styles.headerButton}
              onPress={handleClearAll}
            >
              <Ionicons name="trash" size={24} color={theme.colors.error} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Danh sách thông báo */}
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderNotification}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons
              name="notifications-off-outline"
              size={64}
              color={theme.colors.textSecondary}
            />
            <Text style={[styles.emptyText, { color: theme.colors.textSecondary }]}>
              Không có thông báo nào
            </Text>
          </View>
        }
        contentContainerStyle={notifications.length === 0 ? styles.emptyList : undefined}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  headerButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  headerActions: {
    flexDirection: "row",
  },
  notificationItem: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    overflow: "hidden",
  },
  notificationContent: {
    flexDirection: "row",
    padding: 16,
  },
  iconContainer: {
    marginRight: 12,
    justifyContent: "center",
  },
  textContainer: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    marginBottom: 4,
    lineHeight: 20,
  },
  notificationTime: {
    fontSize: 12,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 16,
    paddingBottom: 12,
    gap: 8,
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 16,
    marginTop: 16,
  },
  emptyList: {
    flex: 1,
  },
});

export default NotificationScreen;
