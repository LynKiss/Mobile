// src/components/FloatingScanButton.tsx
import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

interface Props {
  onPress?: () => void;
}

const FloatingScanButton: React.FC<Props> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.iconWrapper}>
        <Text style={styles.icon}>🔍</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    position: "absolute",
    right: 18,
    bottom: 100,
    zIndex: 30,
  },
  iconWrapper: {
    width: 68,
    height: 68,
    borderRadius: 34,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#10b981",
    elevation: 12,
    shadowColor: "#10b981",
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 24,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.18)",
  },
  icon: {
    fontSize: 28,
    color: "#fff",
  },
});

export default FloatingScanButton;
