export const theme = {
  colors: {
    primary: "#6366f1", // Indigo - Main brand
    secondary: "#14b8a6", // Teal - Secondary
    accent: "#f59e0b", // Amber - Highlights
    danger: "#ef4444", // Red - Errors
    success: "#22c55e", // Green - Success
    warning: "#f97316", // Orange - Warnings
    background: "#f8fafc", // Light gray background
    surface: "#ffffff", // White surface
    text: "#111827", // Dark gray text
    textSecondary: "#6b7280", // Medium gray text
    border: "#e5e7eb", // Light border
    // Library-specific colors
    bookPrimary: "#8b5cf6", // Purple for books
    bookSecondary: "#06b6d4", // Cyan for books
    fiction: "#ec4899", // Pink for fiction
    nonFiction: "#10b981", // Emerald for non-fiction
    science: "#3b82f6", // Blue for science
    history: "#f59e0b", // Amber for history
    biography: "#8b5cf6", // Purple for biography
  },
  gradients: {
    primary: ["#6366f1", "#4338ca"],
    secondary: ["#14b8a6", "#0f766e"],
    accent: ["#f59e0b", "#d97706"],
    danger: ["#ef4444", "#dc2626"],
    success: ["#22c55e", "#16a34a"],
    card: ["#ffffff", "#f8fafc"],
    // Library gradients
    bookCard: ["#8b5cf6", "#7c3aed"],
    welcome: ["#3b82f6", "#7c3aed"],
    goal: ["#f59e0b", "#f97316"],
    ai: ["#a855f7", "#ec4899", "#ef4444"],
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
