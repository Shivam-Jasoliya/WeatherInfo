// src/components/ForecastItem.js
import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';

const ForecastItem = React.memo(({ day, temp, icon, desc , date}) => {
  const theme = useTheme();

  return (
    <Card style={[styles.card, { backgroundColor: theme.colors.secondaryContainer }]} elevation={3}>
      <Card.Content style={styles.content}>
        <Text style={styles.day}>{date}</Text>
        <Text style={styles.day}>{day}</Text>
        <Card.Cover
          source={{ uri: `https://openweathermap.org/img/wn/${icon}@2x.png` }}
          style={styles.icon}
        />
        <Text style={styles.temp}>{temp}°</Text>
        <Text style={styles.desc} numberOfLines={1}>
          {desc}
        </Text>
      </Card.Content>
    </Card>
  );
});

const styles = StyleSheet.create({
  card: {
    width: 120,
    marginRight: 12,
    borderRadius: 16,
  },
  content: {
    alignItems: 'center',
  },
  day: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  icon: {
    width: 50,
    height: 50,
    backgroundColor: 'transparent',
    marginVertical: 8,
  },
  temp: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  desc: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});

export default ForecastItem;
