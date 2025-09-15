// src/components/GradientView.tsx
import React from "react";
import { View, Platform, ViewStyle } from "react-native";

// Try to load native LinearGradient if available (expo-linear-gradient).
let NativeLinearGradient: any = null;
try {
  if (Platform.OS !== "web") {
    // require inside try/catch so app won't crash on web or if package missing
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    NativeLinearGradient = require("expo-linear-gradient").LinearGradient;
  }
} catch (e) {
  NativeLinearGradient = null;
}

interface Props {
  colors: string[];
  style?: ViewStyle | any;
  children?: React.ReactNode;
  start?: { x: number; y: number };
  end?: { x: number; y: number };
}

const GradientView: React.FC<Props> = ({
  colors,
  style,
  children,
  start,
  end,
}) => {
  if (Platform.OS === "web") {
    // Simple CSS gradient fallback for web
    const cssGradient = `linear-gradient(90deg, ${colors.join(",")})`;
    return (
      <View style={[style, { backgroundImage: cssGradient } as any]}>
        {children}
      </View>
    );
  }

  if (NativeLinearGradient) {
    return (
      <NativeLinearGradient
        colors={colors}
        start={start}
        end={end}
        style={style}
      >
        {children}
      </NativeLinearGradient>
    );
  }

  // Final fallback: solid color (first color)
  const backgroundColor = colors && colors.length ? colors[0] : "#ffffff";
  return <View style={[{ backgroundColor }, style]}>{children}</View>;
};

export default GradientView;
