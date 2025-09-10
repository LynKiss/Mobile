import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Interface cho thông báo
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "success" | "error" | "warning" | "info";
  timestamp: Date;
  read: boolean;
}

// Interface cho Toast notification
export interface ToastNotification {
  id: string;
  message: string;
  type: "success" | "error" | "warning" | "info";
  duration?: number;
}

// Interface cho NotificationContext
interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  showToast: (toast: Omit<ToastNotification, "id">) => void;
  addNotification: (
    notification: Omit<Notification, "id" | "timestamp" | "read">
  ) => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
  clearAllNotifications: () => Promise<void>;
  currentToast: ToastNotification | null;
  hideToast: () => void;
}

// Context để quản lý thông báo
const NotificationContext = createContext<NotificationContextType>({
  notifications: [],
  unreadCount: 0,
  showToast: () => {},
  addNotification: async () => {},
  markAsRead: async () => {},
  markAllAsRead: async () => {},
  deleteNotification: async () => {},
  clearAllNotifications: async () => {},
  currentToast: null,
  hideToast: () => {},
});

// Hook để sử dụng NotificationContext
export const useNotifications = () => useContext(NotificationContext);

// Provider component
export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [currentToast, setCurrentToast] = useState<ToastNotification | null>(
    null
  );

  // Tính số thông báo chưa đọc
  const unreadCount = notifications.filter((n) => !n.read).length;

  // Load notifications từ AsyncStorage khi component mount
  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const savedNotifications = await AsyncStorage.getItem("notifications");
      if (savedNotifications) {
        const parsed = JSON.parse(savedNotifications);
        // Convert timestamp strings back to Date objects
        const notificationsWithDates = parsed.map((n: any) => ({
          ...n,
          timestamp: new Date(n.timestamp),
        }));
        setNotifications(notificationsWithDates);
      }
    } catch (error) {
      console.error("Error loading notifications:", error);
    }
  };

  // Lưu notifications vào AsyncStorage
  const saveNotifications = async (notificationsToSave: Notification[]) => {
    try {
      await AsyncStorage.setItem(
        "notifications",
        JSON.stringify(notificationsToSave)
      );
    } catch (error) {
      console.error("Error saving notifications:", error);
    }
  };

  // Hiển thị toast notification
  const showToast = (toast: Omit<ToastNotification, "id">) => {
    const newToast: ToastNotification = {
      ...toast,
      id: Date.now().toString(),
    };

    setCurrentToast(newToast);

    // Tự động ẩn toast sau duration (mặc định 3 giây)
    const duration = toast.duration || 3000;
    setTimeout(() => {
      setCurrentToast(null);
    }, duration);
  };

  // Ẩn toast hiện tại
  const hideToast = () => {
    setCurrentToast(null);
  };

  // Thêm thông báo mới
  const addNotification = async (
    notification: Omit<Notification, "id" | "timestamp" | "read">
  ) => {
    try {
      const newNotification: Notification = {
        ...notification,
        id: Date.now().toString(),
        timestamp: new Date(),
        read: false,
      };

      const updatedNotifications = [newNotification, ...notifications];
      setNotifications(updatedNotifications);
      await saveNotifications(updatedNotifications);

      // Hiển thị toast nếu là thông báo quan trọng
      if (notification.type === "success" || notification.type === "error") {
        showToast({
          message: notification.message,
          type: notification.type,
        });
      }
    } catch (error) {
      console.error("Error adding notification:", error);
    }
  };

  // Đánh dấu thông báo đã đọc
  const markAsRead = async (id: string) => {
    try {
      const updatedNotifications = notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      );
      setNotifications(updatedNotifications);
      await saveNotifications(updatedNotifications);
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  // Đánh dấu tất cả thông báo đã đọc
  const markAllAsRead = async () => {
    try {
      const updatedNotifications = notifications.map((n) => ({
        ...n,
        read: true,
      }));
      setNotifications(updatedNotifications);
      await saveNotifications(updatedNotifications);
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
    }
  };

  // Xóa thông báo
  const deleteNotification = async (id: string) => {
    try {
      const updatedNotifications = notifications.filter((n) => n.id !== id);
      setNotifications(updatedNotifications);
      await saveNotifications(updatedNotifications);
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  // Xóa tất cả thông báo
  const clearAllNotifications = async () => {
    try {
      setNotifications([]);
      await AsyncStorage.removeItem("notifications");
    } catch (error) {
      console.error("Error clearing all notifications:", error);
    }
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        showToast,
        addNotification,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        clearAllNotifications,
        currentToast,
        hideToast,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
