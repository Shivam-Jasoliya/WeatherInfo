// src/navigation/AppNavigator.js
import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Screens
import SplashScreen from '../screens/SplashScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import LocationPermissionScreen from '../screens/LocationPermissionScreen';

// Constants
import { STORAGE_KEYS } from '../constants/storageKeys';

// Hooks
import { useLocationPermission } from '../hooks/useLocationPermission';
import { useTheme } from 'react-native-paper';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const [initialRoute, setInitialRoute] = useState(null);
  const {checkPermission } = useLocationPermission();
  const theme = useTheme()
  useEffect(() => {
    const initializeAppFlow = async () => {
      try {
        const onboardingCompleted = await AsyncStorage.getItem(STORAGE_KEYS.ONBOARDING_COMPLETED);
        const locationGranted = await checkPermission();
        if (!onboardingCompleted) {
          setInitialRoute('Onboarding');
        } else if (!locationGranted) {
          setInitialRoute('LocationPermission');
        } else {
          setInitialRoute('Home');
        }
      } catch (error) {
        console.error('Error during app initialization:', error);
        setInitialRoute('Onboarding'); // Fallback route
      }
    };

    initializeAppFlow();
  }, [checkPermission]);

  if (!initialRoute) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRoute}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="LocationPermission" component={LocationPermissionScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerShown: true,
          title: 'Settings',
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          headerTitleStyle: {
            color: theme.colors.onBackground,
            fontWeight: '600',
          },
          headerTintColor: theme.colors.primary,
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
