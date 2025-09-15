import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Switch,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../navigation/app.navigation";
import { useTheme } from "../contexts/ThemeContext";

const ProfileScreen = ({ navigation }: any) => {
  const { logout, user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);

  // Thông tin người dùng mẫu
  const userInfo = {
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    studentId: "SV2024001",
    joinDate: "15/08/2024",
    borrowedBooks: 3,
    overdueBooks: 1,
  };

  const handleLogout = async () => {
    console.log("handleLogout called");
    try {
      await logout();
      console.log("Logout completed");
    } catch (error) {
      console.error("Logout error:", error);
      Alert.alert("Lỗi", "Có lỗi xảy ra khi đăng xuất");
    }
  };

  const handleEditProfile = () => {
    Alert.alert("Thông báo", "Tính năng chỉnh sửa hồ sơ sẽ được cập nhật sớm!");
  };

  const handleChangePassword = () => {
    Alert.alert("Thông báo", "Tính năng đổi mật khẩu sẽ được cập nhật sớm!");
  };

  const handleContactSupport = () => {
    Alert.alert(
      "Liên hệ hỗ trợ",
      "Email: support@library.com\nĐiện thoại: 1900-xxxx"
    );
  };

  const handleAbout = () => {
    Alert.alert(
      "Về ứng dụng",
      "Thư viện số phiên bản 1.0.0\n© 2024 Library Management System"
    );
  };

  const ProfileItem = ({ title, value, onPress }: any) => (
    <TouchableOpacity
      style={[styles.profileItem, { backgroundColor: theme.colors.surface }]}
      onPress={onPress}
      disabled={!onPress}
    >
      <Text style={[styles.itemTitle, { color: theme.colors.text }]}>
        {title}
      </Text>
      <Text style={[styles.itemValue, { color: theme.colors.textSecondary }]}>
        {value}
      </Text>
    </TouchableOpacity>
  );

  const SettingItem = ({
    title,
    subtitle,
    value,
    onValueChange,
    onPress,
  }: any) => (
    <View
      style={[styles.settingItem, { backgroundColor: theme.colors.surface }]}
    >
      <View style={styles.settingInfo}>
        <Text style={[styles.settingTitle, { color: theme.colors.text }]}>
          {title}
        </Text>
        {subtitle && (
          <Text
            style={[
              styles.settingSubtitle,
              { color: theme.colors.textSecondary },
            ]}
          >
            {subtitle}
          </Text>
        )}
      </View>
      {onValueChange ? (
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{
            false: theme.colors.textSecondary,
            true: theme.colors.primary,
          }}
          thumbColor={value ? theme.colors.primary : theme.colors.surface}
        />
      ) : (
        onPress && (
          <TouchableOpacity onPress={onPress}>
            <Text
              style={[styles.settingValue, { color: theme.colors.primary }]}
            >
              {value}
            </Text>
          </TouchableOpacity>
        )
      )}
    </View>
  );

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Header với thông tin cơ bản */}
      <View style={[styles.header, { borderBottomColor: theme.colors.border }]}>
        <View
          style={[styles.avatar, { backgroundColor: theme.colors.primary }]}
        >
          <Text style={[styles.avatarText, { color: "#fff" }]}>
            {userInfo.name.charAt(0)}
          </Text>
        </View>
        <View style={styles.userInfo}>
          <Text style={[styles.userName, { color: theme.colors.text }]}>
            {userInfo.name}
          </Text>

          <Text
            style={[styles.studentId, { color: theme.colors.textSecondary }]}
          >
            ID: {userInfo.studentId}
          </Text>
        </View>
        <View style={styles.headerButtons}>
          <TouchableOpacity
            style={[
              styles.iconButton,
              { backgroundColor: theme.colors.surface },
            ]}
            onPress={() =>
              Alert.alert("Thông báo", "Đây là thông báo alert thử nghiệm!")
            }
          >
            <Ionicons
              name="notifications-outline"
              size={24}
              color={theme.colors.primary}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.iconButton,
              { backgroundColor: theme.colors.surface },
            ]}
            onPress={toggleTheme}
          >
            <Ionicons
              name={theme.isDark ? "sunny-outline" : "moon-outline"}
              size={24}
              color={theme.colors.primary}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.editButton,
              { backgroundColor: theme.colors.surface },
            ]}
            onPress={handleEditProfile}
          >
            <Ionicons
              name="create-outline"
              size={24}
              color={theme.colors.primary}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Thống kê */}
      <View
        style={[
          styles.statsContainer,
          { backgroundColor: theme.colors.surface },
        ]}
      >
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: theme.colors.primary }]}>
            {userInfo.borrowedBooks}
          </Text>
          <Text
            style={[styles.statLabel, { color: theme.colors.textSecondary }]}
          >
            Sách đang mượn
          </Text>
        </View>
        <View
          style={[styles.statDivider, { backgroundColor: theme.colors.border }]}
        />
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: theme.colors.primary }]}>
            {userInfo.overdueBooks}
          </Text>
          <Text
            style={[styles.statLabel, { color: theme.colors.textSecondary }]}
          >
            Sách quá hạn
          </Text>
        </View>
        <View
          style={[styles.statDivider, { backgroundColor: theme.colors.border }]}
        />
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: theme.colors.primary }]}>
            {userInfo.joinDate}
          </Text>
          <Text
            style={[styles.statLabel, { color: theme.colors.textSecondary }]}
          >
            Ngày tham gia
          </Text>
        </View>
      </View>

      {/* Thông tin cá nhân */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Thông tin cá nhân
        </Text>
        <ProfileItem
          title="Họ và tên"
          value={userInfo.name}
          onPress={handleEditProfile}
        />
        <ProfileItem
          title="Email"
          value={userInfo.email}
          onPress={handleEditProfile}
        />
        <ProfileItem title="Mã sinh viên" value={userInfo.studentId} />
        <ProfileItem title="Ngày tham gia" value={userInfo.joinDate} />
      </View>

      {/* Cài đặt */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Cài đặt
        </Text>
        <SettingItem
          title="Thông báo đẩy"
          subtitle="Nhận thông báo về hạn trả sách"
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
        />
        <SettingItem
          title="Thông báo email"
          subtitle="Nhận thông báo qua email"
          value={emailNotifications}
          onValueChange={setEmailNotifications}
        />
        <SettingItem
          title="Đổi mật khẩu"
          subtitle="Cập nhật mật khẩu tài khoản"
          value=">"
          onPress={handleChangePassword}
        />
      </View>

      {/* Hỗ trợ */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Hỗ trợ
        </Text>
        <SettingItem
          title="Liên hệ hỗ trợ"
          subtitle="Hỏi đáp và hỗ trợ kỹ thuật"
          value=">"
          onPress={handleContactSupport}
        />
        <SettingItem
          title="Về ứng dụng"
          subtitle="Phiên bản và thông tin"
          value=">"
          onPress={handleAbout}
        />
      </View>

      {/* Đăng xuất */}
      <View style={styles.logoutContainer}>
        <TouchableOpacity
          style={[styles.logoutButton, { backgroundColor: theme.colors.error }]}
          onPress={handleLogout}
        >
          <Text style={[styles.logoutButtonText, { color: "#fff" }]}>
            Đăng xuất
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 14,
    marginBottom: 2,
  },
  studentId: {
    fontSize: 12,
  },
  headerButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    marginRight: 10,
    padding: 8,
    borderRadius: 6,
  },
  editButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  statsContainer: {
    flexDirection: "row",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    textAlign: "center",
  },
  statDivider: {
    width: 1,
    marginHorizontal: 15,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  profileItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 8,
  },
  itemTitle: {
    fontSize: 16,
  },
  itemValue: {
    fontSize: 16,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 8,
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
  },
  settingValue: {
    fontSize: 18,
    fontWeight: "bold",
  },
  logoutContainer: {
    marginTop: 20,
    marginBottom: 30,
  },
  logoutButton: {
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProfileScreen;
