import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

const ForgotPasswordScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState("");

  // Hàm xử lý quên mật khẩu
  const handleForgotPassword = () => {
    if (!email) {
      Alert.alert("Lỗi", "Vui lòng nhập email");
      return;
    }

    // Logic gửi email reset mật khẩu (tạm thời giả lập)
    Alert.alert(
      "Thành công",
      "Email reset mật khẩu đã được gửi. Vui lòng kiểm tra hộp thư."
    );
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quên Mật Khẩu</Text>

      <Text style={styles.description}>
        Nhập email của bạn để nhận hướng dẫn reset mật khẩu
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.button} onPress={handleForgotPassword}>
        <Text style={styles.buttonText}>Gửi Email Reset</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.link}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.linkText}>Quay lại Đăng nhập</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#333",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    color: "#666",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#dc3545",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  link: {
    alignItems: "center",
    marginBottom: 10,
  },
  linkText: {
    color: "#007bff",
    fontSize: 16,
  },
});

export default ForgotPasswordScreen;
