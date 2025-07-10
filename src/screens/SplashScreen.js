import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

/**
 * Simple splash screen shown at app start.
 */
const SplashScreen = () => {
  const navigation = useNavigation()
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>WeatherPro</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#007aff'
  },
  title: {
    fontSize: 32, color: '#fff', fontWeight: 'bold'
  }
});