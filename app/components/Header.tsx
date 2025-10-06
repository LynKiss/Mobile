import React from "react";
import { View, Text, TouchableOpacity, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../contexts/ThemeContext";
import { theme } from "../styles/theme";

interface HeaderProps {
  title: string;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  style?: ViewStyle;
}

const Header: React.FC<HeaderProps> = ({
  title,
  leftIcon,
  rightIcon,
  onLeftPress,
  onRightPress,
  style,
}) => {
  const { theme: currentTheme } = useTheme();

  return (
    <View
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: theme.spacing.md,
          paddingVertical: theme.spacing.sm,
          backgroundColor: currentTheme.colors.surface,
          borderBottomWidth: 1,
          borderBottomColor: currentTheme.colors.border,
          ...theme.shadows.light,
        },
        style,
      ]}
    >
      <TouchableOpacity
        onPress={onLeftPress}
        style={{
          padding: theme.spacing.sm,
          borderRadius: theme.borderRadius.sm,
        }}
        disabled={!onLeftPress}
      >
        {leftIcon && (
          <Ionicons
            name={leftIcon}
            size={24}
            color={currentTheme.colors.text}
          />
        )}
      </TouchableOpacity>

      <Text
        style={{
          fontSize: 18,
          fontWeight: "600",
          color: currentTheme.colors.text,
          flex: 1,
          textAlign: "center",
        }}
        numberOfLines={1}
      >
        {title}
      </Text>

      <TouchableOpacity
        onPress={onRightPress}
        style={{
          padding: theme.spacing.sm,
          borderRadius: theme.borderRadius.sm,
        }}
        disabled={!onRightPress}
      >
        {rightIcon && (
          <Ionicons
            name={rightIcon}
            size={24}
            color={currentTheme.colors.text}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Header;
