// Classic design tokens: colors, spacing, radius, typography, shadows

export const classicPalette = {
  // Modern neutral (light): soft paper, muted blue-gray accents
  primary: "#4F6D7A",
  primaryDark: "#3E5661",
  primaryLight: "#6F8A96",

  accent: "#9AA5B1",
  accentDark: "#7D8996",
  accentLight: "#C0C7CF",

  // Neutrals
  ink: "#1F2933",
  parchment: "#F7F8FA",
  paper: "#FFFFFF",
  surface: "#F2F4F7",
  border: "#E4E7EB",

  // Semantic (gentle)
  success: "#2E7D32",
  warning: "#A0792E",
  error: "#B54D4A",
  info: "#4F6D7A",
} as const;

export const classicDarkPalette = {
  // Modern neutral (dark)
  primary: "#9FB3C8",
  primaryDark: "#7F97AD",
  primaryLight: "#C1D0DC",

  accent: "#B8C2CC",
  accentDark: "#98A4B0",
  accentLight: "#D3DBE2",

  ink: "#EAEDEF",
  parchment: "#0F1418",
  paper: "#13181C",
  surface: "#181E23",
  border: "#27323A",

  success: "#8BC79B",
  warning: "#C8A66E",
  error: "#D9817E",
  info: "#9FB3C8",
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

export const radii = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  pill: 999,
} as const;

export const typography = {
  fontFamily: {
    heading: "System",
    body: "System",
    mono: "System",
  },
  size: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 22,
    xxl: 28,
  },
  lineHeight: {
    snug: 1.2,
    normal: 1.4,
    relaxed: 1.6,
  },
} as const;

export type Tokens = {
  spacing: typeof spacing;
  radii: typeof radii;
  typography: typeof typography;
};

export const tokens: Tokens = {
  spacing,
  radii,
  typography,
};
