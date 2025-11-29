import React, { createContext, useContext, ReactNode } from 'react';

type Radii = {
  sm: number;
  md: number;
  lg: number;
};

type TypeScale = {
  small: number;
  body: number;
  lead: number;
  title: number;
  hero: number;
};

export const colors = {
  backgroundBlack: '#0D0D0D',
  cardDarkGrey: '#1A1A1A',
  pureWhite: '#FFFFFF',
  electricIndigo: '#6F00FF',
  neonIndigo: '#7B00FF',
  royalIndigo: '#240952',
  violetIndigo: '#3E285C',
  neonCyan: '#00E5FF',
  successGreen: '#00FF85',
  alertRed: '#FF4D4D',
  mutedGrey: '#B3B3B3',
};

export const space = [4, 8, 12, 16, 20, 24, 32];

export const typeScale: TypeScale = {
  small: 12,
  body: 14,
  lead: 16,
  title: 20,
  hero: 28,
};

export interface Theme {
  colors: typeof colors;
  space: number[];
  typeScale: TypeScale;
  radii: Radii;
}

const radii: Radii = {
  sm: 8,
  md: 12,
  lg: 16,
};

export const lightTheme: Theme = {
  colors,
  space,
  typeScale,
  radii,
};

export const darkTheme: Theme = {
  colors,
  space,
  typeScale,
  radii,
};

type ThemeProviderProps = {
  children: ReactNode;
};

const ThemeContext = createContext<Theme>(darkTheme);

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const activeTheme = darkTheme;

  return <ThemeContext.Provider value={activeTheme}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
