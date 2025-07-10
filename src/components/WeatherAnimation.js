// src/components/WeatherAnimation.js

import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Animated, Image } from 'react-native';
import { useTheme } from 'react-native-paper';

const WeatherAnimation = ({ icon }) => {
  const theme = useTheme();
  const scaleAnim = useRef(new Animated.Value(0.6)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, [icon]);

  return (
      <Image
        source={{ uri: `https://openweathermap.org/img/wn/${icon}@4x.png` }}
        style={[
          styles.image
        ]}
      />
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 60,
    elevation: 3,
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default WeatherAnimation;
