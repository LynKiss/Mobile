import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Linking,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../contexts/ThemeContext";
import Header from "../components/Header";
import Card from "../components/Card";
import { theme } from "../styles/theme";

const HelpScreen = ({ navigation }: any) => {
  const { theme: currentTheme } = useTheme();

  const handleFAQ = () => {
    Alert.alert(
      "Câu hỏi thường gặp",
      "1. Cách đăng nhập:\n- Nhập email và mật khẩu\n- Nhấn nút Đăng nhập\n\n2. Quên mật khẩu:\n- Nhấn 'Quên mật khẩu'\n- Nhập email để nhận mã reset\n\n3. Cách tìm kiếm sách:\n- Sử dụng thanh tìm kiếm\n- Lọc theo thể loại, tác giả\n\n4. Cách mượn sách:\n- Chọn sách > Thêm vào giỏ > Thanh toán\n\n5. Cách gia hạn sách:\n- Vào Lịch sử mượn > Chọn sách > Gia hạn\n\n6. Xử lý khi bị phạt:\n- Thanh toán phạt qua ứng dụng\n- Liên hệ thư viện nếu cần hỗ trợ\n\n7. Liên hệ nhân viên:\n- Gọi hotline: 1900-xxxx\n- Email: support@library.com",
      [{ text: "Đã hiểu" }]
    );
  };

  const handleUsageGuide = () => {
    Alert.alert(
      "Hướng dẫn sử dụng",
      "📚 Các chức năng cơ bản:\n\n• Mượn sách: Tìm sách > Thêm vào giỏ > Đặt chỗ\n• Trả sách: Vào Lịch sử > Chọn sách > Trả sách\n• Gia hạn: Lịch sử > Gia hạn (trước 3 ngày hết hạn)\n• Đặt chỗ: Tìm sách > Đặt chỗ nếu hết\n• Đánh giá: Sau khi trả > Đánh giá sách\n\n💡 Mẹo: Sử dụng mã QR để mượn nhanh hơn!",
      [{ text: "Đã hiểu" }]
    );
  };

  const handleReportError = () => {
    navigation.navigate("ManHinhHoTro");
  };

  const handleChatbot = () => {
    navigation.navigate("ManHinhChatbox");
  };

  const handleContact = () => {
    Alert.alert(
      "Trung tâm liên hệ",
      "📞 Hotline: 1900-XXXX (8:00 - 17:00)\n📧 Email: support@library.com\n🏢 Địa chỉ: 123 Đường ABC, Quận XYZ, TP.HCM\n\n💬 Giờ làm việc:\n- Thứ 2 - Thứ 6: 8:00 - 17:00\n- Thứ 7: 8:00 - 12:00\n- Chủ nhật: Nghỉ\n\n📱 Chat trực tiếp: 24/7 qua ứng dụng",
      [
        {
          text: "Gọi ngay",
          onPress: () => Linking.openURL("tel:1900XXXX"),
        },
        {
          text: "Gửi email",
          onPress: () => Linking.openURL("mailto:support@library.com"),
        },
        { text: "Đóng" },
      ]
    );
  };

  const HelpItem = ({ title, icon, description, onPress, color }: any) => (
    <TouchableOpacity onPress={onPress}>
      <Card style={{ marginBottom: theme.spacing.md }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: theme.spacing.md,
          }}
        >
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: theme.borderRadius.lg,
              backgroundColor: color,
              justifyContent: "center",
              alignItems: "center",
              marginRight: theme.spacing.md,
            }}
          >
            <Ionicons name={icon} size={24} color="#fff" />
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                color: currentTheme.colors.text,
                marginBottom: theme.spacing.xs,
              }}
            >
              {title}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: currentTheme.colors.textSecondary,
                lineHeight: 20,
              }}
            >
              {description}
            </Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={20}
            color={currentTheme.colors.textSecondary}
          />
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: currentTheme.colors.background,
      }}
    >
      <Header
        title="Trợ giúp & Hỗ trợ"
        leftIcon="arrow-back"
        onLeftPress={() => navigation.goBack()}
      />

      <ScrollView
        style={{ flex: 1, padding: theme.spacing.md }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ marginBottom: theme.spacing.xl }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "700",
              color: currentTheme.colors.text,
              marginBottom: theme.spacing.md,
              textAlign: "center",
            }}
          >
            Chúng tôi luôn sẵn sàng hỗ trợ bạn!
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: currentTheme.colors.textSecondary,
              textAlign: "center",
              lineHeight: 24,
            }}
          >
            Tìm câu trả lời nhanh hoặc liên hệ với đội ngũ hỗ trợ chuyên nghiệp
            của chúng tôi.
          </Text>
        </View>

        <HelpItem
          title="Câu hỏi thường gặp"
          icon="help-circle"
          description="Hướng dẫn chi tiết về đăng nhập, tìm kiếm, mượn trả sách và các vấn đề phổ biến."
          onPress={handleFAQ}
          color="#007AFF"
        />

        <HelpItem
          title="Hướng dẫn sử dụng"
          icon="book"
          description="Video và hình ảnh minh họa các bước sử dụng ứng dụng một cách dễ dàng."
          onPress={handleUsageGuide}
          color="#34C759"
        />

        <HelpItem
          title="Báo lỗi / Yêu cầu hỗ trợ"
          icon="bug"
          description="Gửi báo cáo lỗi hoặc yêu cầu hỗ trợ với mô tả chi tiết và hình ảnh đính kèm."
          onPress={handleReportError}
          color="#FF3B30"
        />

        <HelpItem
          title="Chatbot hỗ trợ"
          icon="chatbubble-ellipses"
          description="Trò chuyện trực tiếp với chatbot để nhận câu trả lời tức thì cho các câu hỏi cơ bản."
          onPress={handleChatbot}
          color="#FF9500"
        />

        <HelpItem
          title="Trung tâm liên hệ"
          icon="call"
          description="Thông tin liên hệ, giờ làm việc và cách thức liên hệ trực tiếp với thư viện."
          onPress={handleContact}
          color="#AF52DE"
        />

        <View
          style={{
            marginTop: theme.spacing.xl,
            padding: theme.spacing.lg,
            backgroundColor: currentTheme.colors.surface,
            borderRadius: theme.borderRadius.lg,
            alignItems: "center",
          }}
        >
          <Ionicons
            name="heart"
            size={32}
            color={currentTheme.colors.primary}
            style={{ marginBottom: theme.spacing.md }}
          />
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: currentTheme.colors.text,
              marginBottom: theme.spacing.sm,
              textAlign: "center",
            }}
          >
            Cảm ơn bạn đã sử dụng dịch vụ!
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: currentTheme.colors.textSecondary,
              textAlign: "center",
              lineHeight: 20,
            }}
          >
            Chúng tôi cam kết mang đến trải nghiệm tốt nhất cho bạn. Nếu có bất
            kỳ góp ý nào, hãy liên hệ với chúng tôi.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HelpScreen;
