import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import AppBar from './components/AppBar';
import StartMatch from './components/StartMatch';

const Index: React.FC = () => {
  return (
    <View style={styles.container}>
      <StartMatch />
      <AppBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#D9D9D9',
      alignItems: 'center',
      flexDirection: 'column'
  }
});

export default Index;