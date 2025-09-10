import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Định nghĩa theme
export interface Theme {
  isDark: boolean;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    error: string;
    success: string;
    warning: string;
    info: string;
  };
}

// Light theme
const lightTheme: Theme = {
  isDark: false,
  colors: {
    primary: "#007bff",
    secondary: "#6c757d",
    background: "#ffffff",
    surface: "#f8f9fa",
    text: "#333333",
    textSecondary: "#666666",
    border: "#dee2e6",
    error: "#dc3545",
    success: "#28a745",
    warning: "#ffc107",
    info: "#17a2b8",
  },
};

// Dark theme
const darkTheme: Theme = {
  isDark: true,
  colors: {
    primary: "#0d6efd",
    secondary: "#6c757d",
    background: "#121212",
    surface: "#1e1e1e",
    text: "#ffffff",
    textSecondary: "#b0b0b0",
    border: "#333333",
    error: "#ff6b6b",
    success: "#51cf66",
    warning: "#ffd43b",
    info: "#74c0fc",
  },
};

// Interface cho ThemeContext
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => Promise<void>;
  setTheme: (isDark: boolean) => Promise<void>;
}

// Context để quản lý theme
const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
  toggleTheme: async () => {},
  setTheme: async () => {},
});

// Hook để sử dụng ThemeContext
export const useTheme = () => useContext(ThemeContext);

// Provider component
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setThemeState] = useState<Theme>(lightTheme);

  // Load theme từ AsyncStorage khi component mount
  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem("theme");
      if (savedTheme) {
        const isDark = JSON.parse(savedTheme);
        setThemeState(isDark ? darkTheme : lightTheme);
      }
    } catch (error) {
      console.error("Error loading theme:", error);
    }
  };

  // Hàm chuyển đổi theme
  const toggleTheme = async () => {
    try {
      const newTheme = theme.isDark ? lightTheme : darkTheme;
      setThemeState(newTheme);
      await AsyncStorage.setItem("theme", JSON.stringify(newTheme.isDark));
    } catch (error) {
      console.error("Error toggling theme:", error);
    }
  };

  // Hàm đặt theme cụ thể
  const setTheme = async (isDark: boolean) => {
    try {
      const newTheme = isDark ? darkTheme : lightTheme;
      setThemeState(newTheme);
      await AsyncStorage.setItem("theme", JSON.stringify(isDark));
    } catch (error) {
      console.error("Error setting theme:", error);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
