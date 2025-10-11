import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "../contexts/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../styles/theme";
import Card from "../components/Card";
import Button from "../components/Button";
import Header from "../components/Header";

const ChangePasswordScreen = ({ navigation }: any) => {
  const { theme: currentTheme } = useTheme();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Lỗi", "Mật khẩu mới và xác nhận không khớp");
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert("Lỗi", "Mật khẩu mới phải có ít nhất 6 ký tự");
      return;
    }

    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("userToken");
      const response = await fetch(
        "http://localhost:3000/api/nguoi_dung/change-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            currentPassword,
            newPassword,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Thành công", "Đổi mật khẩu thành công", [
          {
            text: "OK",
            onPress: () => navigation.goBack(),
          },
        ]);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        Alert.alert("Lỗi", data.message || "Đổi mật khẩu thất bại");
      }
    } catch (error) {
      Alert.alert("Lỗi", "Có lỗi xảy ra khi đổi mật khẩu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: currentTheme.colors.background,
      }}
    >
      <Header
        title="Đổi mật khẩu"
        leftIcon="arrow-back"
        onLeftPress={() => navigation.goBack()}
      />

      <ScrollView
        contentContainerStyle={{
          padding: theme.spacing.md,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Card style={{ marginBottom: theme.spacing.md }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: currentTheme.colors.text,
              marginBottom: theme.spacing.md,
            }}
          >
            Thay đổi mật khẩu của bạn
          </Text>

          <View style={{ marginBottom: theme.spacing.md }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "500",
                color: currentTheme.colors.text,
                marginBottom: theme.spacing.sm,
              }}
            >
              Mật khẩu hiện tại
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: currentTheme.colors.border,
                borderRadius: theme.borderRadius.md,
                padding: theme.spacing.md,
                fontSize: 16,
                color: currentTheme.colors.text,
                backgroundColor: currentTheme.colors.surface,
              }}
              placeholder="Nhập mật khẩu hiện tại"
              placeholderTextColor={currentTheme.colors.textSecondary}
              secureTextEntry
              value={currentPassword}
              onChangeText={setCurrentPassword}
            />
          </View>

          <View style={{ marginBottom: theme.spacing.md }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "500",
                color: currentTheme.colors.text,
                marginBottom: theme.spacing.sm,
              }}
            >
              Mật khẩu mới
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: currentTheme.colors.border,
                borderRadius: theme.borderRadius.md,
                padding: theme.spacing.md,
                fontSize: 16,
                color: currentTheme.colors.text,
                backgroundColor: currentTheme.colors.surface,
              }}
              placeholder="Nhập mật khẩu mới"
              placeholderTextColor={currentTheme.colors.textSecondary}
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
            />
          </View>

          <View style={{ marginBottom: theme.spacing.lg }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "500",
                color: currentTheme.colors.text,
                marginBottom: theme.spacing.sm,
              }}
            >
              Xác nhận mật khẩu mới
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: currentTheme.colors.border,
                borderRadius: theme.borderRadius.md,
                padding: theme.spacing.md,
                fontSize: 16,
                color: currentTheme.colors.text,
                backgroundColor: currentTheme.colors.surface,
              }}
              placeholder="Nhập lại mật khẩu mới"
              placeholderTextColor={currentTheme.colors.textSecondary}
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>

          <Button
            title="Đổi mật khẩu"
            onPress={handleChangePassword}
            variant="primary"
            disabled={loading}
            style={{ marginTop: theme.spacing.md }}
          />
        </Card>

        <Card>
          <Text
            style={{
              fontSize: 14,
              color: currentTheme.colors.textSecondary,
              lineHeight: 20,
            }}
          >
            • Mật khẩu phải có ít nhất 6 ký tự
            {"\n"}• Sử dụng kết hợp chữ cái, số và ký tự đặc biệt để tăng bảo mật
            {"\n"}• Không chia sẻ mật khẩu với người khác
          </Text>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChangePasswordScreen;
