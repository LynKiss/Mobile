import React from "react";
import { View } from "react-native";
import ToastNotification from "./ToastNotification";
import { useNotifications } from "../contexts/NotificationContext";

interface AppWrapperProps {
  children: React.ReactNode;
}

const AppWrapper: React.FC<AppWrapperProps> = ({ children }) => {
  const { currentToast, hideToast } = useNotifications();

  return (
    <View style={{ flex: 1 }}>
      {children}
      {currentToast && (
        <ToastNotification toast={currentToast} onHide={hideToast} />
      )}
    </View>
  );
};

export default AppWrapper;
