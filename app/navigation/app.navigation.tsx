import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthStack from "./AuthStack";
import MainTab from "./MainTab";
import BookDetailScreen from "../screens/BookDetailScreen";
import NotificationScreen from "../screens/NotificationScreen";

import ManHinhChat from "../screens/ManHinhChat";
import ManHinhDanhGia from "../screens/ManHinhDanhGia";

import ManHinhPhat from "../screens/ManHinhPhat";

import ManHinhSuKien from "../screens/ManHinhSuKien";

import CartScreen from "../screens/CartScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import ChangePasswordScreen from "../screens/ChangePasswordScreen";
import ManHinhHoTro from "../screens/ManHinhHoTro";
import ManHinhChiTietHoTro from "../screens/ManHinhChiTietHoTro";
import ManHinhChatbox from "../screens/ManHinhChatbox";
import ToastNotification from "../components/ToastNotification";
import { BookProvider } from "./BookContext";
import { AuthProvider, navigationRef, useAuth } from "../contexts/AuthContext";
import { useNotifications } from "../contexts/NotificationContext";

const Stack = createNativeStackNavigator();

// Root Navigator để quản lý flow giữa auth và main app
const AppNavigationContent = () => {
  const { isLoggedIn, isLoading } = useAuth();

  // Hiển thị loading screen khi đang kiểm tra trạng thái đăng nhập
  if (isLoading) {
    return null; // Hoặc có thể return một LoadingScreen component
  }

  return (
    <BookProvider>
      <Stack.Navigator
        key={isLoggedIn ? "loggedIn" : "loggedOut"}
        screenOptions={{
          headerShown: false, // Ẩn header mặc định
        }}
        initialRouteName={isLoggedIn ? "MainTab" : "AuthStack"}
      >
        <Stack.Screen name="AuthStack" component={AuthStack} />
        <Stack.Screen name="MainTab" component={MainTab} />
        <Stack.Screen name="BookDetail" component={BookDetailScreen} />
        <Stack.Screen name="Notification" component={NotificationScreen} />

        <Stack.Screen name="ManHinhChat" component={ManHinhChat} />
        <Stack.Screen name="ManHinhDanhGia" component={ManHinhDanhGia} />

        <Stack.Screen name="ManHinhPhat" component={ManHinhPhat} />

        <Stack.Screen name="ManHinhSuKien" component={ManHinhSuKien} />

        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
        <Stack.Screen
          name="BorrowingHistory"
          component={require("../screens/BorrowingHistoryScreen").default}
        />
        <Stack.Screen
          name="BorrowingDetail"
          component={require("../screens/BorrowingDetailScreen").default}
        />
        <Stack.Screen
          name="HelpScreen"
          component={require("../screens/HelpScreen").default}
        />
        <Stack.Screen name="ManHinhHoTro" component={ManHinhHoTro} />
        <Stack.Screen name="ManHinhChatbox" component={ManHinhChatbox} />
        <Stack.Screen name="SupportDetail" component={ManHinhChiTietHoTro} />
      </Stack.Navigator>
    </BookProvider>
  );
};

// Main App Navigation component wrapped with AuthProvider
const AppNavigation = () => {
  return (
    <AuthProvider>
      <AppNavigationContent />
    </AuthProvider>
  );
};

export default AppNavigation;
