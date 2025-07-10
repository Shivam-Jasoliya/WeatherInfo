import Geolocation from '@react-native-community/geolocation';

export const getUserLocation = () =>
  new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      pos => resolve(pos.coords),
      err => reject(err),
      { enableHighAccuracy: true, timeout: 15000 }
    );
  });
