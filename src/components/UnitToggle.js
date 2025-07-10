import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Switch, useTheme } from 'react-native-paper';

const UnitToggle = ({ unit, onToggle }) => {
  const isFahrenheit = unit === 'imperial';
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: theme.colors.onBackground }]}>°C</Text>
      <Switch
        value={isFahrenheit}
        onValueChange={(val) => onToggle(val ? 'imperial' : 'metric')}
        color={theme.colors.primary}
      />
      <Text style={[styles.label, { color: theme.colors.onBackground }]}>°F</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
    gap: 8,
  },
  label: {
    fontSize: 16,
  },
});

export default UnitToggle;
