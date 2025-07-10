import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Keyboard,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  Searchbar,
  Text,
  Divider,
  IconButton,
} from 'react-native-paper';
import { getUserLocation } from '../utils/getUserLocation';
import { parseForecast } from '../utils/parseForecast';
import WeatherCard from '../components/WeatherCard';
import ForecastItem from '../components/ForecastItem';
import { useWeatherContext } from '../context/WeatherContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { animations } from '../constants/images';
import LottieView from 'lottie-react-native';
import { strings } from '../constants/strings';
import { useWeather } from '../hooks/useWeather';
import useInternetStatus from '../hooks/useInternetStatus';

const HomeScreen = ({ navigation }) => {
  const { unit } = useWeatherContext();
  const [query, setQuery] = useState('');
  const isConnected = useInternetStatus();   
  const { data, loading, error, fetchData } = useWeather();

  const loadForecast = async (city) => {
    if (city) {
      await fetchData(city, unit);
    } else {
      const coords = await getUserLocation();
      await fetchData({latitude : coords?.latitude , longitude : coords?.longitude}, unit);
    }
  };

  useEffect(() => {
    loadForecast(); // Load from location on mount
  }, [unit]);

  const onSearch = () => {
    if (query.trim()) {
      Keyboard.dismiss();
      loadForecast(query.trim());
    }
  };


  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <LottieView
          source={animations.weather}
          autoPlay
          loop
          style={styles.lottie}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.flex} edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.searchRow}>
            <View style={styles.flex}>
              <Searchbar
                placeholder={strings.searchCityPlaceholder}
                onChangeText={setQuery}
                onSubmitEditing={onSearch}
                value={query}
                style={styles.searchBar}
              />
            </View>
            <IconButton
              icon="cog"
              size={28}
              onPress={() => navigation.navigate('Settings')}
              style={styles.settingsButton}
            />
          </View>

          {!!!error && parseForecast(data) ? (
            <>
              <Text variant="titleMedium" style={styles.sectionTitle}>
                {data?.city?.name}, {data?.city?.country}
              </Text>
              <WeatherCard data={parseForecast(data)} unit={unit} />
              <Divider style={{ marginVertical: 16 }} />
              {parseForecast(data).forecast?.length > 0 && (
                <Text variant="titleMedium" style={styles.sectionTitle}>
                  {Math.min(5, parseForecast(data).forecast.length)}-Day Forecast
                </Text>
              )}
              <FlatList
                horizontal
                data={parseForecast(data).forecast?.slice(0, 5)}
                keyExtractor={(item, index) => `${item.day}-${index}`}
                renderItem={({ item }) => <ForecastItem {...item} unit={unit} />}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.forecastList}
              />
            </>
          ) : (
            error && (
              <View style={styles.centered}>
                <Text variant="bodyLarge" style={styles.errorText}>
                  {error}
                </Text>
              </View>
            )
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: {
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  forecastList: {},
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  searchBar: {
    borderRadius: 16,
    elevation: 3,
  },
  settingsButton: {
    marginTop: 4,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    width: 200,
    height: 200,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default HomeScreen;
