import React from 'react';
import { StyleSheet, View } from 'react-native';
import AppBar from './components/AppBar';
import Score from './score';
import StartMatch from './components/StartMatch';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import store from './store/store';

const Stack = createStackNavigator();

const HomeScreen: React.FC = ({  }) => {
  return (
    <View style={styles.container}>
      <StartMatch />
      <AppBar />
    </View>
  );
};

const ScoreScreen: React.FC = ({  }) => {
  return (
    <View style={styles.container}>
      <Score />
    </View>
  );
};


const Index: React.FC = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Score" component={ScoreScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D9D9D9',
    alignItems: 'center',
    flexDirection: 'column',
  },
});

export default Index;
