
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useWeatherContext } from '../context/WeatherContext';
import { useThemeContext } from '../context/ThemeContext';
import UnitToggle from '../components/UnitToggle';
import { Switch, Text, useTheme } from 'react-native-paper';


/**
 * Setting screen to introduce app features.
 */

const SettingsScreen = () => {
  const { unit, toggleUnit } = useWeatherContext();
  const { themeMode, toggleTheme } = useThemeContext();
  const isDark = themeMode === 'dark';
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <UnitToggle unit={unit} onToggle={toggleUnit} />
      <View style={styles.containerBox}>
        <Text variant="titleMedium" style={{ color: theme.colors.onBackground, marginBottom: 10 }}>
          Light
        </Text>
        <Switch value={isDark} onValueChange={toggleTheme} color={theme.colors.primary} />
        <Text variant="titleMedium" style={{ color: theme.colors.onBackground, marginBottom: 10 }}>
          Dark
        </Text>
      </View>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  containerBox : {
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 12,
        gap: 8,
      }
});
