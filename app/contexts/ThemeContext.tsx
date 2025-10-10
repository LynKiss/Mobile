import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { classicDarkPalette, classicPalette, tokens } from "../theme/tokens";

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
    primary: classicPalette.primary,
    secondary: classicPalette.accent,
    background: classicPalette.parchment,
    surface: classicPalette.surface,
    text: classicPalette.ink,
    textSecondary: "#616E7C",
    border: classicPalette.border,
    error: classicPalette.error,
    success: classicPalette.success,
    warning: classicPalette.warning,
    info: classicPalette.info,
  },
};

// Dark theme
const darkTheme: Theme = {
  isDark: true,
  colors: {
    primary: classicDarkPalette.primary,
    secondary: classicDarkPalette.accent,
    background: classicDarkPalette.parchment,
    surface: classicDarkPalette.surface,
    text: classicDarkPalette.ink,
    textSecondary: "#9FB3C8",
    border: classicDarkPalette.border,
    error: classicDarkPalette.error,
    success: classicDarkPalette.success,
    warning: classicDarkPalette.warning,
    info: classicDarkPalette.info,
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
