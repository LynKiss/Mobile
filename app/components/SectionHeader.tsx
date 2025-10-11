import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from "react-native";
import { useTheme } from "../contexts/ThemeContext";

interface SectionHeaderProps {
  title: string;
  onPress?: () => void;
  rightText?: string;
  style?: ViewStyle;
  titleStyle?: TextStyle;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  onPress,
  rightText,
  style,
  titleStyle,
}) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingVertical: 10,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.border,
        },
        style,
      ]}
    >
      <Text
        style={[
          {
            fontSize: 18,
            fontWeight: "700",
            color: theme.colors.text,
          },
          titleStyle,
        ]}
      >
        {title}
      </Text>
      {rightText ? (
        <Text style={{ color: theme.colors.textSecondary }}>{rightText}</Text>
      ) : null}
    </TouchableOpacity>
  );
};

export default SectionHeader;
