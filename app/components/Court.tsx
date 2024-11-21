import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Box from './Box'

const Court: React.FC = () => {
  const insets = useSafeAreaInsets();
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const courtHeight = screenHeight*0.75 - insets.top
  // const courtWidth = (courtHeight/13.4) * 6.1
  const courtWidth = (courtHeight/13) * 7

  return (
    <View style={[styles.court, { width: courtWidth, height: courtHeight }]}>
        <Box
            position="top-left"
        />
        <Box
            position="top-right"
        />
        <Box
            position="bottom-left"
        />
        <Box
            position="bottom-right"
        />
    </View>
  );
};

const styles = StyleSheet.create({
  court: {
    borderWidth: 3,
    borderColor: 'white',
    backgroundColor: '#5292B6',
    flexDirection: "row",
    flexWrap: "wrap",
    position: 'absolute', 
    bottom: 20, 
    alignSelf: 'center',

  }
});

export default Court;
