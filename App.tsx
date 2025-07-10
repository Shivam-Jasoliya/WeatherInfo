/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { ThemeProvider, useThemeContext } from './src/context/ThemeContext';
import { WeatherProvider } from './src/context/WeatherContext';
import AppNavigator from './src/navigation/AppNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { darkTheme, lightTheme } from './src/theme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import NoInternetBanner from './src/components/NoInternetBanner';
import useInternetStatus from './src/hooks/useInternetStatus';


const MainApp = () => {
  const { themeMode } = useThemeContext();
  const theme = themeMode === 'dark' ? darkTheme : lightTheme;
  const isConnected = useInternetStatus();    
    return (
    <SafeAreaProvider>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={themeMode === 'dark' ? 'light-content' : 'dark-content'}
      />
      <PaperProvider theme={theme}>
        <NavigationContainer theme={theme}>
          <WeatherProvider>
            <AppNavigator />
            <NoInternetBanner visible={isConnected} />
          </WeatherProvider>
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
};

const App = () => (
  <ThemeProvider>
    <MainApp />
  </ThemeProvider>
);

export default App;
