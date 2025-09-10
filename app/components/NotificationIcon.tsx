import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../contexts/ThemeContext";
import { useNotifications } from "../contexts/NotificationContext";

interface NotificationIconProps {
  onPress: () => void;
  size?: number;
}

const NotificationIcon: React.FC<NotificationIconProps> = ({
  onPress,
  size = 24,
}) => {
  const { theme } = useTheme();
  const { unreadCount } = useNotifications();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Ionicons
        name={unreadCount > 0 ? "notifications" : "notifications-outline"}
        size={size}
        color={theme.colors.text}
      />
      {unreadCount > 0 && (
        <View style={[styles.badge, { backgroundColor: theme.colors.error }]}>
          <Text style={styles.badgeText}>
            {unreadCount > 99 ? "99+" : unreadCount.toString()}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    padding: 4,
  },
  badge: {
    position: "absolute",
    top: -4,
    right: -4,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
});

export default NotificationIcon;
