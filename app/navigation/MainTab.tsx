import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import BorrowScreen from "../screens/BorrowScreen";
import WishlistScreen from "../screens/WishlistScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { useTheme } from "../contexts/ThemeContext";
import { useNotifications } from "../contexts/NotificationContext";

const Tab = createBottomTabNavigator();

// Component header với nút chuyển đổi theme và thông báo
const HeaderRight = () => {
  const { theme, toggleTheme } = useTheme();
  const { showToast } = useNotifications();

  const handleShowNotification = () => {
    showToast({
      message: "Đây là thông báo đẩy thử nghiệm!",
      type: "info",
    });
  };

  return (
    <View style={{ flexDirection: "row", marginRight: 15 }}>
      <TouchableOpacity
        onPress={handleShowNotification}
        style={{ marginRight: 15 }}
      >
        <Ionicons
          name="notifications-outline"
          size={24}
          color={theme.colors.text}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={toggleTheme}>
        <Ionicons
          name={theme.isDark ? "sunny-outline" : "moon-outline"}
          size={24}
          color={theme.colors.text}
        />
      </TouchableOpacity>
    </View>
  );
};

// Bottom Tab Navigator cho flow chính của app
const MainTab = () => {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false, // Ẩn header
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Search") {
            iconName = focused ? "search" : "search-outline";
          } else if (route.name === "Borrow") {
            iconName = focused ? "book" : "book-outline";
          } else if (route.name === "Wishlist") {
            iconName = focused ? "heart" : "heart-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          } else {
            iconName = "home-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
          height: 60,
          paddingBottom: 5,
          paddingTop: 5,
        },
        tabBarIconStyle: {
          marginTop: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 5,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarLabel: "Trang Chủ" }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{ tabBarLabel: "Tìm Kiếm" }}
      />
      <Tab.Screen
        name="Borrow"
        component={BorrowScreen}
        options={{ tabBarLabel: "Mượn Sách" }}
      />
      <Tab.Screen
        name="Wishlist"
        component={WishlistScreen}
        options={{ tabBarLabel: "Yêu Thích" }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarLabel: "Cá Nhân" }}
      />
      {/* <Tab.Screen
        name="ManHinhThanhToan"
        component={require("../screens/ManHinhThanhToan").default}
        options={{ tabBarButton: () => null }}
      />
      <Tab.Screen
        name="ManHinhDocSachDienTu"
        component={require("../screens/ManHinhDocSachDienTu").default}
        options={{ tabBarButton: () => null }}
      />
      <Tab.Screen
        name="ManHinhChat"
        component={require("../screens/ManHinhChat").default}
        options={{ tabBarButton: () => null }}
      />
      <Tab.Screen
        name="ManHinhDanhGia"
        component={require("../screens/ManHinhDanhGia").default}
        options={{ tabBarButton: () => null }}
      />
      <Tab.Screen
        name="ManHinhQuanLyDatCho"
        component={require("../screens/ManHinhQuanLyDatCho").default}
        options={{ tabBarButton: () => null }}
      />
      <Tab.Screen
        name="ManHinhPhat"
        component={require("../screens/ManHinhPhat").default}
        options={{ tabBarButton: () => null }}
      />
      <Tab.Screen
        name="ManHinhThanhTich"
        component={require("../screens/ManHinhThanhTich").default}
        options={{ tabBarButton: () => null }}
      />
      <Tab.Screen
        name="ManHinhSuKien"
        component={require("../screens/ManHinhSuKien").default}
        options={{ tabBarButton: () => null }}
      />
      <Tab.Screen
        name="ManHinhDanhSachDoc"
        component={require("../screens/ManHinhDanhSachDoc").default}
        options={{ tabBarButton: () => null }}
      /> */}
    </Tab.Navigator>
  );
};

export default MainTab;
