import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

const SearchBar = ({ value, onChange, onSubmit }) => (
  <TextInput
    label="Search city"
    value={value}
    onChangeText={onChange}
    onSubmitEditing={onSubmit}
    mode="outlined"
    style={styles.input}
  />
);

export default memo(SearchBar);

const styles = StyleSheet.create({
  input: {
    margin: 12,
    backgroundColor: 'white',
  },
});
