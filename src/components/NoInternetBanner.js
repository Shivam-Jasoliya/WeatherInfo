import React from 'react';
import { StyleSheet } from 'react-native';
import { Snackbar } from 'react-native-paper';

const NoInternetBanner = ({ visible }) => {
  return (
    <Snackbar
      visible={!visible}
      style={styles.snackbar}
      duration={Snackbar.DURATION_MEDIUM}
    >
      ⚠️ No Internet Connection
    </Snackbar>
  );
};

const styles = StyleSheet.create({
  snackbar: {
    backgroundColor: '#d32f2f', // Red
  },
});

export default NoInternetBanner;
