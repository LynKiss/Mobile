import React from "react";
import { Text, TextStyle, ViewStyle } from "react-native";
import { useTheme } from "../contexts/ThemeContext";

type BadgeVariant = "default" | "subtle" | "solid";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "subtle",
  style,
  textStyle,
}) => {
  const { theme } = useTheme();

  const base: ViewStyle = {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    alignSelf: "flex-start",
  };

  const stylesByVariant: Record<BadgeVariant, ViewStyle> = {
    default: {
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    subtle: {
      backgroundColor: theme.colors.paper || theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    solid: {
      backgroundColor: theme.colors.text,
    },
  } as const;

  const textBase: TextStyle = {
    fontSize: 12,
    fontWeight: "600",
    color: variant === "solid" ? theme.colors.background : theme.colors.text,
  };

  return (
    <Text style={[base, stylesByVariant[variant], textBase, textStyle, style]}>
      {children}
    </Text>
  );
};

export default Badge;
