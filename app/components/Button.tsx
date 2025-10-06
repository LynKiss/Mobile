import React from "react";
import { TouchableOpacity, Text, ViewStyle, TextStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../contexts/ThemeContext";
import { theme } from "../styles/theme";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline";
  disabled?: boolean;
  loading?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  disabled = false,
  loading = false,
  icon,
  style,
  textStyle,
}) => {
  const { theme: currentTheme } = useTheme();

  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.lg,
      borderRadius: theme.borderRadius.md,
      opacity: disabled || loading ? 0.6 : 1,
    };

    switch (variant) {
      case "primary":
        return {
          ...baseStyle,
          backgroundColor: currentTheme.colors.primary,
        };
      case "secondary":
        return {
          ...baseStyle,
          backgroundColor: currentTheme.colors.secondary,
        };
      case "outline":
        return {
          ...baseStyle,
          backgroundColor: "transparent",
          borderWidth: 1,
          borderColor: currentTheme.colors.primary,
        };
      default:
        return baseStyle;
    }
  };

  const getTextStyle = (): TextStyle => {
    const baseTextStyle: TextStyle = {
      fontSize: 16,
      fontWeight: "600",
      textAlign: "center",
    };

    switch (variant) {
      case "primary":
        return {
          ...baseTextStyle,
          color: "#ffffff",
        };
      case "secondary":
        return {
          ...baseTextStyle,
          color: "#ffffff",
        };
      case "outline":
        return {
          ...baseTextStyle,
          color: currentTheme.colors.primary,
        };
      default:
        return baseTextStyle;
    }
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <Ionicons name="reload" size={20} color="#ffffff" />
      ) : icon ? (
        <Ionicons name={icon} size={20} color="#ffffff" style={{ marginRight: 8 }} />
      ) : null}
      <Text style={[getTextStyle(), textStyle]}>
        {loading ? "Đang xử lý..." : title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
