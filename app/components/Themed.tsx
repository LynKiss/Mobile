import React from "react";
import { Text, View, TextProps, ViewProps } from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import { tokens } from "../theme/tokens";

export const ThemedView: React.FC<ViewProps & { surface?: boolean }> = ({
  style,
  surface,
  ...rest
}) => {
  const { theme } = useTheme();
  const backgroundColor = surface
    ? theme.colors.surface
    : theme.colors.background;

  return <View style={[{ backgroundColor }, style]} {...rest} />;
};

export const ThemedText: React.FC<
  TextProps & {
    variant?: keyof typeof tokens.typography.size;
    color?: "default" | "secondary" | "primary" | "accent" | "error";
  }
> = ({ style, variant = "md", color = "default", ...rest }) => {
  const { theme } = useTheme();
  const baseColor =
    color === "secondary"
      ? theme.colors.textSecondary
      : color === "primary"
      ? theme.colors.primary
      : color === "accent"
      ? theme.colors.info
      : color === "error"
      ? theme.colors.error
      : theme.colors.text;

  return (
    <Text
      style={[
        {
          color: baseColor,
          fontSize: tokens.typography.size[variant],
        },
        style,
      ]}
      {...rest}
    />
  );
};
