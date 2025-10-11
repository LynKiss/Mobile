import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Dimensions,
  Image,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../contexts/ThemeContext";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import {
  styles,
  MAU_SAC,
  KIEU_CHU,
  KHOANG_CACH,
  BO_TRON,
  HANG_SO,
  hamTienIch,
} from "../styles/ProfileScreen.styles";

const { width, height } = Dimensions.get("window");

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();

  // ===== STATE =====
  const [hoTen, setHoTen] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [ngaySinh, setNgaySinh] = useState(new Date());
  const [diaChi, setDiaChi] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [userId, setUserId] = useState("");

  // ===== FETCH CURRENT PROFILE =====
  useEffect(() => {
    const fetchProfile = async () => {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        navigation.goBack();
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:3000/api/nguoi_dung/profile/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        if (response.ok) {
          setHoTen(data.ho_ten);
          setEmail(data.email);
          setAvatar(data.avatar || "");
          if (data.ngay_sinh) setNgaySinh(new Date(data.ngay_sinh));
          setDiaChi(data.dia_chi || "");
          setUserId(data.ma_nguoi_dung);
        } else {
          Alert.alert("Lỗi", "Không thể tải thông tin hồ sơ.");
          navigation.goBack();
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        Alert.alert("Lỗi", "Có lỗi xảy ra khi tải dữ liệu.");
        navigation.goBack();
      } finally {
        setIsFetching(false);
      }
    };

    fetchProfile();
  }, []);

  // ===== HANDLE SAVE =====
  const xuLyLuu = async () => {
    if (!hoTen.trim()) {
      Alert.alert("Lỗi", "Họ và tên không được để trống.");
      return;
    }
    if (!email.trim()) {
      Alert.alert("Lỗi", "Email không được để trống.");
      return;
    }

    setIsLoading(true);
    const token = await AsyncStorage.getItem("userToken");

    try {
      // Prepare form data for multipart/form-data
      const formData = new FormData();
      formData.append("ho_ten", hoTen);
      formData.append("email", email);
      formData.append("ngay_sinh", ngaySinh.toISOString().split("T")[0]);
      formData.append("dia_chi", diaChi);
      if (avatar && avatar.startsWith("file://")) {
        // Extract filename and type from uri
        const uriParts = avatar.split("/");
        const fileName = uriParts[uriParts.length - 1];
        const fileType = fileName.split(".").pop();
        formData.append("avatar", {
          uri: avatar,
          name: fileName,
          type: `image/${fileType}`,
        } as any);
      }

      const response = await fetch(
        `http://localhost:3000/api/nguoi_dung/${userId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        Alert.alert("Thành công", "Đã cập nhật thông tin hồ sơ!", [
          { text: "OK", onPress: () => navigation.goBack() },
        ]);
      } else {
        const errorData = await response.json();
        Alert.alert("Lỗi", errorData.message || "Không thể cập nhật.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert("Lỗi", "Có lỗi xảy ra khi cập nhật.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: theme.colors.background,
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={{ color: theme.colors.text, marginTop: 10 }}>
          Đang tải...
        </Text>
      </View>
    );
  }

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      {/* Header */}
      <View
        style={[styles.headerBar, { backgroundColor: theme.colors.surface }]}
      >
        <TouchableOpacity
          style={styles.nutQuayLai}
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="arrow-back"
            size={KIEU_CHU.trungBinhLon}
            color={theme.colors.primary}
          />
        </TouchableOpacity>
        <Text style={[styles.tieuDeHeader, { color: theme.colors.text }]}>
          Chỉnh sửa thông tin
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.khungCuon} showsVerticalScrollIndicator={false}>
        <View style={styles.khungHeader}>
          {/* Avatar */}
          <View style={styles.thongTinNguoiDung}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                {avatar ? (
                  <Image
                    source={{ uri: avatar }}
                    style={{ width: 64, height: 64, borderRadius: 32 }}
                  />
                ) : (
                  <Text style={styles.chuCaiAvatar}>{hoTen.charAt(0)}</Text>
                )}
              </View>
            </View>

            <Text style={styles.tenNguoiDung}>{hoTen}</Text>
          </View>

          {/* Form */}
          <View style={styles.khungNhapLieu}>
            <View style={styles.truongNhap}>
              <Text style={styles.nhanTruong}>Họ và tên</Text>
              <TextInput
                style={[styles.giaTriTruong, { color: theme.colors.text }]}
                value={hoTen}
                onChangeText={setHoTen}
                placeholder="Nhập họ và tên"
                placeholderTextColor={theme.colors.textSecondary}
              />
            </View>

            <View style={styles.truongNhap}>
              <Text style={styles.nhanTruong}>Ngày sinh</Text>
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderColor: theme.colors.textSecondary,
                  borderRadius: 8,
                  padding: 10,
                  backgroundColor: theme.colors.surface,
                }}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={{ color: theme.colors.text }}>
                  {ngaySinh.toLocaleDateString("vi-VN")}
                </Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={ngaySinh}
                  mode="date"
                  display="default"
                  onChange={(event: any, selectedDate: Date | undefined) => {
                    setShowDatePicker(false);
                    if (selectedDate) {
                      setNgaySinh(selectedDate);
                    }
                  }}
                  maximumDate={new Date()}
                />
              )}
            </View>

            <View style={styles.truongNhap}>
              <Text style={styles.nhanTruong}>Email</Text>
              <TextInput
                style={[styles.giaTriTruong, { color: theme.colors.text }]}
                value={email}
                onChangeText={setEmail}
                placeholder="Nhập email"
                placeholderTextColor={theme.colors.textSecondary}
                keyboardType="email-address"
              />
            </View>

            <View style={styles.truongNhap}>
              <Text style={styles.nhanTruong}>Địa chỉ</Text>
              <TextInput
                style={[styles.giaTriTruong, { color: theme.colors.text }]}
                value={diaChi}
                onChangeText={setDiaChi}
                placeholder="Nhập địa chỉ"
                placeholderTextColor={theme.colors.textSecondary}
              />
            </View>

            <View style={styles.truongNhap}>
              <Text style={styles.nhanTruong}>Ảnh đại diện</Text>
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderColor: theme.colors.textSecondary,
                  borderRadius: 8,
                  padding: 10,
                  backgroundColor: theme.colors.surface,
                  alignItems: "center",
                }}
                onPress={async () => {
                  const permissionResult =
                    await ImagePicker.requestMediaLibraryPermissionsAsync();
                  if (permissionResult.granted === false) {
                    Alert.alert("Lỗi", "Bạn cần cấp quyền truy cập ảnh.");
                    return;
                  }
                  const pickerResult =
                    await ImagePicker.launchImageLibraryAsync({
                      mediaTypes: ImagePicker.MediaTypeOptions.Images,
                      allowsEditing: true,
                      aspect: [1, 1],
                      quality: 1,
                    });
                  if (!pickerResult.canceled) {
                    setAvatar(pickerResult.assets[0].uri);
                  }
                }}
              >
                {avatar ? (
                  <Image
                    source={{ uri: avatar }}
                    style={{ width: 64, height: 64, borderRadius: 32 }}
                  />
                ) : (
                  <Text style={{ color: theme.colors.textSecondary }}>
                    Chọn ảnh đại diện
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* Buttons */}
          <View style={styles.khungNut}>
            <TouchableOpacity
              style={styles.nutHuy}
              onPress={() => navigation.goBack()}
              disabled={isLoading}
            >
              <Text style={styles.chuNutHuy}>Hủy</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.nutLuu}
              onPress={xuLyLuu}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color={MAU_SAC.trang} />
              ) : (
                <Text style={styles.chuNutLuu}>Lưu thay đổi</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default EditProfileScreen;
