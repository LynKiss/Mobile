// GradientBox.tsx
import React from "react";
import { Platform, View, StyleSheet, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface GradientBoxProps {
  // ít nhất 2 màu
  colors: [string, string, ...string[]];
  style?: ViewStyle | ViewStyle[];
  children?: React.ReactNode;
}

const GradientBox: React.FC<GradientBoxProps> = ({
  colors,
  style,
  children,
}) => {
  if (Platform.OS === "web") {
    const gradient = `linear-gradient(90deg, ${colors.join(", ")})`;

    return (
      <View
        style={[
          style,
          {
            // React Native Web hỗ trợ background qua CSS style
            backgroundImage: gradient,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          } as any,
        ]}
      >
        {children}
      </View>
    );
  }

  return (
    <LinearGradient colors={colors} style={style}>
      {children}
    </LinearGradient>
  );
};

export default GradientBox;
