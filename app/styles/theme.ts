export const theme = {
  colors: {
    primary: "#6366f1", // Indigo
    secondary: "#14b8a6", // Teal
    accent: "#f59e0b", // Amber
    danger: "#ef4444", // Red
    success: "#22c55e", // Green
    warning: "#f97316", // Orange
    background: "#f8fafc", // Light gray
    surface: "#ffffff", // White
    text: "#111827", // Dark gray
    textSecondary: "#6b7280", // Medium gray
    border: "#e5e7eb", // Light border
  },
  gradients: {
    primary: ["#6366f1", "#4338ca"],
    secondary: ["#14b8a6", "#0f766e"],
    accent: ["#f59e0b", "#d97706"],
    danger: ["#ef4444", "#dc2626"],
    success: ["#22c55e", "#16a34a"],
    card: ["#ffffff", "#f8fafc"],
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
  },
  shadows: {
    light: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    medium: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 4,
    },
    heavy: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 8,
    },
  },
};

export default theme;
