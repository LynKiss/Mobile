import React, { useEffect } from "react";
import { View, Text, StyleSheet, Animated, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../contexts/ThemeContext";
import { ToastNotification as ToastNotificationType } from "../contexts/NotificationContext";

const { width } = Dimensions.get("window");

interface ToastNotificationProps {
  toast: ToastNotificationType;
  onHide: () => void;
}

const ToastNotification: React.FC<ToastNotificationProps> = ({
  toast,
  onHide,
}) => {
  const { theme } = useTheme();
  const translateY = new Animated.Value(-100);

  useEffect(() => {
    // Animation để hiển thị toast
    Animated.spring(translateY, {
      toValue: 0,
      useNativeDriver: true,
      tension: 50,
      friction: 7,
    }).start();

    // Tự động ẩn sau 3 giây
    const timer = setTimeout(() => {
      Animated.timing(translateY, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }).start(() => onHide());
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const getIconName = () => {
    switch (toast.type) {
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

  const getBackgroundColor = () => {
    switch (toast.type) {
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

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY }],
          backgroundColor: getBackgroundColor(),
        },
      ]}
    >
      <View style={styles.content}>
        <Ionicons
          name={getIconName()}
          size={24}
          color="#fff"
          style={styles.icon}
        />
        <Text style={styles.message}>{toast.message}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1000,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 12,
  },
  message: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
    flex: 1,
  },
});

export default ToastNotification;
