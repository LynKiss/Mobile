import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  Easing,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../contexts/AuthContext";
import GradientView from "../components/GradientView";
import styles from "../styles/LoginScreen.styles";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/route";

const { width, height } = Dimensions.get("window");

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Login"
>;

interface Props {
  navigation: LoginScreenNavigationProp;
}

const LoginScreen = ({ navigation }: Props) => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  // Animation refs
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const logoScaleAnim = useRef(new Animated.Value(1)).current;
  const logoRotateAnim = useRef(new Animated.Value(0)).current;
  const floatingBooksAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Initial animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // Continuous logo animations
    Animated.loop(
      Animated.sequence([
        Animated.timing(logoScaleAnim, {
          toValue: 1.1,
          duration: 2000,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.sin),
        }),
        Animated.timing(logoScaleAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.sin),
        }),
      ])
    ).start();

    Animated.loop(
      Animated.timing(logoRotateAnim, {
        toValue: 1,
        duration: 8000,
        useNativeDriver: true,
        easing: Easing.linear,
      })
    ).start();

    // Floating books animation
    Animated.loop(
      Animated.timing(floatingBooksAnim, {
        toValue: 1,
        duration: 6000,
        useNativeDriver: true,
        easing: Easing.linear,
      })
    ).start();

    // Pulsing glow effect
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.quad),
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.quad),
        }),
      ])
    ).start();
  }, []);

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email.trim()) newErrors.email = "Email không được để trống.";
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Email không hợp lệ.";

    if (!password.trim()) newErrors.password = "Mật khẩu không được để trống.";
    else if (password.length < 6)
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });
      if (response.ok) {
        const data = await response.json();
        await AsyncStorage.setItem("userToken", data.token);
        login(email.trim(), password);
      } else {
        Alert.alert(
          "Đăng nhập thất bại",
          "Thông tin đăng nhập không chính xác."
        );
      }
    } catch (error) {
      Alert.alert("Lỗi", "Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    Alert.alert(
      "Google Login",
      "Tính năng đăng nhập Google đang được phát triển."
    );
  };

  const handleFacebookLogin = () => {
    Alert.alert(
      "Facebook Login",
      "Tính năng đăng nhập Facebook đang được phát triển."
    );
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <GradientView
        colors={["#667eea", "#764ba2"]}
        style={styles.gradientBackground}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
          >
            {/* 3D Library Logo */}
            <View style={styles.logoContainer}>
              <Animated.View
                style={[
                  styles.logoWrapper,
                  {
                    transform: [
                      {
                        scale: logoScaleAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [1, 1.05],
                        }),
                      },
                      {
                        rotateY: logoRotateAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: ["0deg", "360deg"],
                        }),
                      },
                    ],
                  },
                ]}
              >
                <Text style={styles.logoText}>📚</Text>
                <Animated.View
                  style={[
                    styles.logoGlow,
                    {
                      opacity: glowAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.3, 0.8],
                      }),
                    },
                  ]}
                />
              </Animated.View>

              {/* Floating Books */}
              <Animated.View
                style={[
                  styles.floatingBooksContainer,
                  {
                    transform: [
                      {
                        translateY: floatingBooksAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, -30],
                        }),
                      },
                    ],
                  },
                ]}
              >
                {[...Array(5)].map((_, index) => (
                  <Animated.View
                    key={index}
                    style={[
                      styles.floatingBook,
                      {
                        transform: [
                          {
                            translateY: floatingBooksAnim.interpolate({
                              inputRange: [0, 1],
                              outputRange: [0, -20 - index * 15],
                            }),
                          },
                          {
                            translateX: floatingBooksAnim.interpolate({
                              inputRange: [0, 1],
                              outputRange: [index * 10 - 20, index * 15 - 30],
                            }),
                          },
                          {
                            rotate: floatingBooksAnim.interpolate({
                              inputRange: [0, 1],
                              outputRange: ["0deg", `${index * 45}deg`],
                            }),
                          },
                        ],
                        opacity: floatingBooksAnim.interpolate({
                          inputRange: [0, 0.3, 1],
                          outputRange: [0.7, 1, 0.7],
                        }),
                      },
                    ]}
                  >
                    <Text style={styles.bookEmoji}>
                      {index % 3 === 0 ? "📖" : index % 3 === 1 ? "📚" : "📗"}
                    </Text>
                  </Animated.View>
                ))}
              </Animated.View>
            </View>

            <Text style={styles.welcomeTitle}>
              Chào mừng đến với Thư Viện Thông Minh! 👋
            </Text>
            <Text style={styles.welcomeSubtitle}>
              Khám phá thế giới tri thức với hàng nghìn cuốn sách và tài liệu
              học tập
            </Text>

            <View style={styles.formContainer}>
              <Text style={styles.formTitle}>Đăng Nhập</Text>

              {/* Email Input */}
              <View style={styles.inputContainer}>
                <TextInput
                  style={[styles.input, errors.email && styles.inputError]}
                  placeholder="Nhập email của bạn"
                  placeholderTextColor="rgba(0,0,0,0.5)"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    if (errors.email)
                      setErrors({ ...errors, email: undefined });
                  }}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                {errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
              </View>

              {/* Password Input */}
              <View style={styles.inputContainer}>
                <View
                  style={[
                    styles.passwordContainer,
                    errors.password && styles.inputError,
                  ]}
                >
                  <TextInput
                    style={styles.passwordInput}
                    placeholder="Nhập mật khẩu"
                    placeholderTextColor="rgba(0,0,0,0.5)"
                    value={password}
                    onChangeText={(text) => {
                      setPassword(text);
                      if (errors.password)
                        setErrors({ ...errors, password: undefined });
                    }}
                    secureTextEntry={!showPassword}
                  />
                  <TouchableOpacity
                    onPress={togglePasswordVisibility}
                    style={styles.eyeButton}
                  >
                    <Text style={styles.eyeIcon}>
                      {showPassword ? "👁️" : "👁️‍🗨️"}
                    </Text>
                  </TouchableOpacity>
                </View>
                {errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
              </View>

              {/* Login Button */}
              <TouchableOpacity
                style={[styles.loginButton, isLoading && styles.buttonDisabled]}
                onPress={handleLogin}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.loginButtonText}>📚 Đăng Nhập 📚</Text>
                )}
              </TouchableOpacity>

              {/* Social Login Buttons */}
              <View style={styles.socialContainer}>
                <TouchableOpacity
                  style={styles.socialButton}
                  onPress={handleGoogleLogin}
                >
                  <Text style={styles.socialIcon}>🌐</Text>
                  <Text style={styles.socialText}>Google</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.socialButton}
                  onPress={handleFacebookLogin}
                >
                  <Text style={styles.socialIcon}>📘</Text>
                  <Text style={styles.socialText}>Facebook</Text>
                </TouchableOpacity>
              </View>

              {/* Links */}
              <View style={styles.linksContainer}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Register")}
                >
                  <Text style={styles.linkText}>Tạo tài khoản mới</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate("ForgotPassword")}
                >
                  <Text style={styles.linkText}>Quên mật khẩu?</Text>
                </TouchableOpacity>
              </View>

              {/* Demo Info */}
              <View style={styles.demoContainer}>
                <Text style={styles.demoTitle}>🌟 Thông tin Demo</Text>
                <Text style={styles.demoText}>📧 Email: a@example.com</Text>
                <Text style={styles.demoText}>🔐 Mật khẩu: 123456</Text>
              </View>
            </View>
          </Animated.View>
        </ScrollView>
      </GradientView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
