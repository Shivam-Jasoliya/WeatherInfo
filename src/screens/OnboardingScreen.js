// OnboardingScreen.js
import React, { useCallback } from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  Dimensions,
  StatusBar,
} from 'react-native';
import {
  Button,
  Text,
  MD3LightTheme as DefaultLightTheme,
} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

import { STORAGE_KEYS } from '../constants/storageKeys';
import { images } from '../constants/images';
import { strings } from '../constants/strings';

const { width, height } = Dimensions.get('window');

/**
 * OnboardingScreen - First launch UI to set onboarding flag and continue
 */
const OnboardingScreen = ({ navigation }) => {
  const handleGetStarted = useCallback(async () => {
    await AsyncStorage.setItem(STORAGE_KEYS.ONBOARDING_COMPLETED, 'true');
    navigation.replace('LocationPermission');
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      <ImageBackground
        source={images.onboard}
        style={styles.image}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <Text variant="headlineMedium" style={styles.title}>
            {strings.onboardingTitle}
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            {strings.onboardingSubtitle}
          </Text>

          <Button
            mode="contained"
            onPress={handleGetStarted}
            style={styles.button}
            contentStyle={styles.buttonContent}
          >
            {strings.getStarted}
          </Button>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
    container: {
    flex: 1,
  },
  image: {
    flex: 1,
    width,
    height,
    justifyContent: 'flex-end',
  },
  overlay: {
    paddingHorizontal: 24,
    paddingBottom: 64,
  },
  title: {
    fontWeight: '700',
    fontSize: 28,
    marginBottom: 16,
    color: DefaultLightTheme.colors.onBackground,
  },
  subtitle: {
    marginBottom: 32,
    lineHeight: 22,
    color: DefaultLightTheme.colors.onBackground,
  },
  button: {
    borderRadius: 30,
    alignSelf: 'center',
    width: '100%',
  },
  buttonContent: {
    paddingVertical: 10,
  },
});