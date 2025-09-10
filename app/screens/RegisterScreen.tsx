import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useAuth } from "../navigation/app.navigation";

const RegisterScreen = ({ navigation }: any) => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    studentId: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string | undefined }>(
    {}
  );

  // Hàm validate form
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = "Họ và tên không được để trống";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Họ và tên phải có ít nhất 2 ký tự";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email không được để trống";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Mật khẩu không được để trống";
    } else if (formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
    }

    if (!formData.studentId.trim()) {
      newErrors.studentId = "Mã sinh viên không được để trống";
    } else if (!/^SV\d{6,}$/.test(formData.studentId)) {
      newErrors.studentId = "Mã sinh viên phải có định dạng SV + 6 số trở lên";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Hàm xử lý đăng ký
  const handleRegister = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const success = await register({
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        studentId: formData.studentId.trim().toUpperCase(),
      });

      if (success) {
        Alert.alert(
          "Đăng ký thành công",
          "Tài khoản của bạn đã được tạo. Vui lòng đăng nhập.",
          [
            {
              text: "OK",
              onPress: () => navigation.navigate("Login"),
            },
          ]
        );
      } else {
        Alert.alert("Đăng ký thất bại", "Email hoặc mã sinh viên đã tồn tại");
      }
    } catch (error) {
      Alert.alert("Lỗi", "Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const InputField = ({
    label,
    field,
    placeholder,
    keyboardType = "default",
    secureTextEntry = false,
    autoCapitalize = "words",
  }: any) => (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, errors[field] && styles.inputError]}
        placeholder={placeholder}
        value={formData[field as keyof typeof formData]}
        onChangeText={(text) => updateFormData(field, text)}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
      />
      {errors[field] && <Text style={styles.errorText}>{errors[field]}</Text>}
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Đăng Ký Tài Khoản</Text>

      <InputField
        label="Họ và tên"
        field="name"
        placeholder="Nhập họ và tên đầy đủ"
        autoCapitalize="words"
      />

      <InputField
        label="Email"
        field="email"
        placeholder="Nhập địa chỉ email"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <InputField
        label="Mã sinh viên"
        field="studentId"
        placeholder="Ví dụ: SV2024001"
        autoCapitalize="characters"
      />

      <InputField
        label="Mật khẩu"
        field="password"
        placeholder="Nhập mật khẩu (tối thiểu 6 ký tự)"
        secureTextEntry
        autoCapitalize="none"
      />

      <InputField
        label="Xác nhận mật khẩu"
        field="confirmPassword"
        placeholder="Nhập lại mật khẩu"
        secureTextEntry
        autoCapitalize="none"
      />

      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={handleRegister}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Đăng Ký</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.link}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.linkText}>Đã có tài khoản? Đăng nhập</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
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
  inputError: {
    borderColor: "#dc3545",
  },
  errorText: {
    color: "#dc3545",
    fontSize: 14,
    marginTop: -10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 15,
  },
  buttonDisabled: {
    backgroundColor: "#6c757d",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  link: {
    alignItems: "center",
    marginBottom: 20,
  },
  linkText: {
    color: "#007bff",
    fontSize: 16,
  },
});

export default RegisterScreen;
