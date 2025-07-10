// src/components/WeatherCard.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';
import WeatherAnimation from './WeatherAnimation';

const WeatherCard = ({ data, unit }) => {
  const theme = useTheme();
  const tempUnit = unit === 'imperial' ? '°F' : '°C';
  return (
    <Card style={[styles.card, { backgroundColor: theme.colors.primary }]}>
      <Card.Content style={styles.content}>
        <WeatherAnimation icon={data.icon} />
        <Text variant="headlineLarge" style={styles.temp}>
          {data.temp}{tempUnit}
        </Text>
        <Text variant="titleMedium">{data.description}</Text>
        <Text variant="bodySmall" style={styles.city}>
          {data.name}
        </Text>

        <View style={styles.meta}>
          <Text>Humidity: {data.humidity}%</Text>
          <Text>Wind: {data.wind} km/h</Text>
          <Text>Rain: {data.rain || 0} mm</Text>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    marginBottom: 16,
  },
  content: {
    alignItems: 'center',
  },
  temp: {
    fontWeight: 'bold',
    marginTop: 8,
  },
  city: {
    marginTop: 4,
    opacity: 0.6,
  },
  meta: {
    marginTop: 12,
    alignItems: 'center',
    gap: 4,
  },
});

export default WeatherCard;
