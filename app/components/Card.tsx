import React from "react";
import { View, ViewStyle } from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import { theme } from "../styles/theme";

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const Card: React.FC<CardProps> = ({ children, style }) => {
  const { theme: currentTheme } = useTheme();

  return (
    <View
      style={[
        {
          backgroundColor: currentTheme.colors.surface,
          borderRadius: theme.borderRadius.md,
          padding: theme.spacing.md,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

export default Card;
