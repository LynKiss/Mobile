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
    shadowColor: "#10b981",
    shadowOpacity: 0.32,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 20,
    elevation: 8,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.18)",
  },
  icon: {
    fontSize: 28,
    color: "#fff",
  },
});

export default FloatingScanButton;
