import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useAuth } from "../navigation/app.navigation";

const LoginScreen = ({ navigation }: any) => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  // Hàm validate form
  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = "Email không được để trống";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!password.trim()) {
      newErrors.password = "Mật khẩu không được để trống";
    } else if (password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Hàm xử lý đăng nhập
  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const success = await login(email.trim(), password);
      if (!success) {
        Alert.alert("Đăng nhập thất bại", "Email hoặc mật khẩu không đúng");
      }
    } catch (error) {
      Alert.alert("Lỗi", "Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng Nhập</Text>

      <View>
        <TextInput
          style={[styles.input, errors.email && styles.inputError]}
          placeholder="Email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            if (errors.email) setErrors({ ...errors, email: undefined });
          }}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      </View>

      <View>
        <TextInput
          style={[styles.input, errors.password && styles.inputError]}
          placeholder="Mật khẩu"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            if (errors.password) setErrors({ ...errors, password: undefined });
          }}
          secureTextEntry
        />
        {errors.password && (
          <Text style={styles.errorText}>{errors.password}</Text>
        )}
      </View>

      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Đăng Nhập</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.link}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={styles.linkText}>Chưa có tài khoản? Đăng ký</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.link}
        onPress={() => navigation.navigate("ForgotPassword")}
      >
        <Text style={styles.linkText}>Quên mật khẩu?</Text>
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
    marginBottom: 30,
    color: "#333",
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
    backgroundColor: "#007bff",
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
  inputError: {
    borderColor: "#dc3545",
  },
  errorText: {
    color: "#dc3545",
    fontSize: 14,
    marginTop: -10,
    marginBottom: 15,
  },
  buttonDisabled: {
    backgroundColor: "#6c757d",
  },
});

export default LoginScreen;
