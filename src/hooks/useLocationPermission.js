import { useCallback, useState } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';

export const useLocationPermission = () => {
  const [loading, setLoading] = useState(false);

  // ✅ Check if permission is already granted
  const checkPermission = useCallback(async () => {
    try {
      setLoading(true);
      if (Platform.OS === 'ios') {
        return true; // iOS permission handled via Info.plist
      }

      const granted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      return granted;
    } catch (err) {
      console.error('Error checking location permission:', err);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  //  Request permission from user
const requestPermission = useCallback(async () => {
  try {
    setLoading(true);

    if (Platform.OS === 'ios') return true;

    const result = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
        message: 'We need your location to show accurate weather information.',
        buttonPositive: 'Allow',
        buttonNegative: 'Deny',
        buttonNeutral: 'Ask Me Later',
      }
    );

    return result === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.error('Error requesting permission:', err);
    return false;
  } finally {
    setLoading(false);
  }
}, []);


  return {
    checkPermission,
    requestPermission,
    loading,
  };
};
