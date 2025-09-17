import React, { useState, useEffect, createContext, useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  createNavigationContainerRef,
  CommonActions,
} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthStack from "./AuthStack";
import MainTab from "./MainTab";
import BookDetailScreen from "../screens/BookDetailScreen";
import NotificationScreen from "../screens/NotificationScreen";
import ManHinhThanhToan from "../screens/ManHinhThanhToan";
import ManHinhDocSachDienTu from "../screens/ManHinhDocSachDienTu";
import ManHinhChat from "../screens/ManHinhChat";
import ManHinhDanhGia from "../screens/ManHinhDanhGia";
import ManHinhQuanLyDatCho from "../screens/ManHinhQuanLyDatCho";
import ManHinhPhat from "../screens/ManHinhPhat";
import ManHinhThanhTich from "../screens/ManHinhThanhTich";
import ManHinhSuKien from "../screens/ManHinhSuKien";
import ManHinhDanhSachDoc from "../screens/ManHinhDanhSachDoc";
import CartScreen from "../screens/CartScreen";
import ToastNotification from "../components/ToastNotification";
import { BookProvider } from "./BookContext";
import { useNotifications } from "../contexts/NotificationContext";

export const navigationRef = createNavigationContainerRef();

const Stack = createNativeStackNavigator();

// Interface cho user data
interface User {
  id: string;
  name: string;
  email: string;
  studentId: string;
  joinDate: string;
}

// Interface cho AuthContext
interface AuthContextType {
  isLoggedIn: boolean;
  isLoading: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  register: (userData: any) => Promise<boolean>;
}

// Context để quản lý trạng thái đăng nhập toàn cục
const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  isLoading: true,
  user: null,
  login: async () => false,
  logout: async () => {},
  register: async () => false,
});

// Hook để sử dụng AuthContext
export const useAuth = () => useContext(AuthContext);

// Root Navigator để quản lý flow giữa auth và main app
const AppNavigation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  // Kiểm tra trạng thái đăng nhập khi app khởi động
  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const userToken = await AsyncStorage.getItem("userToken");
      const userData = await AsyncStorage.getItem("userData");

      if (userToken && userData) {
        setIsLoggedIn(true);
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error("Error checking login status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Hàm đăng nhập
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      console.log("Attempting login with:", email, password);
      const response = await fetch("http://160.250.132.142/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      console.log("Response status:", response.status);
      const data = await response.json();
      console.log("Response data:", data);

      if (response.ok && data.token) {
        // Giả sử response có token và user
        const userData = data.user
          ? {
              id: data.user.ma_nguoi_dung.toString(),
              name: data.user.ho_ten,
              email: data.user.email,
              studentId: data.user.ma_vai_tro
                ? data.user.ma_vai_tro.toString()
                : "SV0001",
              joinDate: data.user.ngay_dang_ky
                ? new Date(data.user.ngay_dang_ky).toLocaleDateString("vi-VN")
                : new Date().toLocaleDateString("vi-VN"),
            }
          : {
              id: data.id || "1",
              name: data.name || "User",
              email: email,
              studentId: data.studentId || "SV0001",
              joinDate: data.joinDate || new Date().toLocaleDateString("vi-VN"),
            };

        // Lưu thông tin đăng nhập
        await AsyncStorage.setItem("userToken", data.token);
        await AsyncStorage.setItem("userData", JSON.stringify(userData));

        setIsLoggedIn(true);
        setUser(userData);
        return true;
      } else {
        console.error("Login failed:", data.message || "Invalid credentials");
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  // Hàm đăng ký
  const register = async (userData: any): Promise<boolean> => {
    try {
      // Giả lập API call - thay thế bằng API thật
      const newUser = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        studentId: `SV${Date.now()}`,
        joinDate: new Date().toLocaleDateString("vi-VN"),
      };

      // Lưu thông tin đăng ký
      await AsyncStorage.setItem("userToken", "fake-jwt-token");
      await AsyncStorage.setItem("userData", JSON.stringify(newUser));

      setIsLoggedIn(true);
      setUser(newUser);
      return true;
    } catch (error) {
      console.error("Register error:", error);
      return false;
    }
  };

  // Hàm đăng xuất
  const logout = async (): Promise<void> => {
    try {
      console.log("Starting logout...");
      // Xóa tất cả dữ liệu AsyncStorage
      await AsyncStorage.clear();
      console.log("AsyncStorage cleared");
      setIsLoggedIn(false);
      setUser(null);
      console.log("State updated");
      // Reset navigation to AuthStack
      setTimeout(() => {
        if (navigationRef.isReady()) {
          console.log("Resetting navigation");
          navigationRef.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "AuthStack" }],
            })
          );
        } else {
          console.log("Navigation not ready");
        }
      }, 100);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Hiển thị loading screen khi đang kiểm tra trạng thái đăng nhập
  if (isLoading) {
    return null; // Hoặc có thể return một LoadingScreen component
  }

  return (
    <BookProvider>
      <AuthContext.Provider
        value={{
          isLoggedIn,
          isLoading,
          user,
          login,
          logout,
          register,
        }}
      >
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
          <Stack.Screen name="ManHinhThanhToan" component={ManHinhThanhToan} />
          <Stack.Screen
            name="ManHinhDocSachDienTu"
            component={ManHinhDocSachDienTu}
          />
          <Stack.Screen name="ManHinhChat" component={ManHinhChat} />
          <Stack.Screen name="ManHinhDanhGia" component={ManHinhDanhGia} />
          <Stack.Screen
            name="ManHinhQuanLyDatCho"
            component={ManHinhQuanLyDatCho}
          />
          <Stack.Screen name="ManHinhPhat" component={ManHinhPhat} />
          <Stack.Screen name="ManHinhThanhTich" component={ManHinhThanhTich} />
          <Stack.Screen name="ManHinhSuKien" component={ManHinhSuKien} />
          <Stack.Screen
            name="ManHinhDanhSachDoc"
            component={ManHinhDanhSachDoc}
          />
          <Stack.Screen name="Cart" component={CartScreen} />
        </Stack.Navigator>
      </AuthContext.Provider>
    </BookProvider>
  );
};

export default AppNavigation;
