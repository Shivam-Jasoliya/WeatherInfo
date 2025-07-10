import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from 'react-native';
import {
  Button,
  Text,
  ActivityIndicator,
  Provider as PaperProvider,
  MD3LightTheme as DefaultLightTheme,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocationPermission } from '../hooks/useLocationPermission';
import { images } from '../constants/images';
import { strings } from '../constants/strings';

const { width, height } = Dimensions.get('window');

const LocationPermissionScreenContent = ({ navigation }) => {
const { requestPermission , loading} = useLocationPermission();

  const handleAllow = async () => {
    const granted = await requestPermission();
    if (granted) {
      navigation.replace('Home');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={images.onboard}
        style={styles.image}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <Text variant="headlineMedium" style={styles.title}>
            {strings.enableLocation}
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            {strings.permissionDescription}
          </Text>

          {loading ? (
            <ActivityIndicator animating size="large" />
          ) : (
            <Button
              mode="contained"
              onPress={handleAllow}
              style={styles.button}
              contentStyle={styles.buttonContent}
            >
              {strings.allowButton}
            </Button>
          )}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const LocationPermissionScreen = (props) => (
  <PaperProvider theme={DefaultLightTheme}>
    <LocationPermissionScreenContent {...props} />
  </PaperProvider>
);

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

export default LocationPermissionScreen;
