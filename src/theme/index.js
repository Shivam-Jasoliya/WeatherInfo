import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#1976d2',
    background: '#ffffff',
    surface: '#f0f0f0',
    onPrimary: '#ffffff',
    onBackground: '#000000',
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#90caf9',
    background: '#121212',
    surface: '#1e1e1e',
    onPrimary: '#000000',
    onBackground: '#ffffff',
  },
};
