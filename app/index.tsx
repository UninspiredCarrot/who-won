import React from 'react';
import {StyleSheet} from 'react-native';
import Court from './components/Court';
import DrawSurface from './components/DrawSurface'
import { SafeAreaView } from 'react-native-safe-area-context';
import { MatchProvider } from './context/MatchContext';
import { SideProvider } from './context/SideContext';

const Index: React.FC = () => {

  return (
    <MatchProvider>
        <SafeAreaView style={styles.container}>
        <SideProvider>
            <Court />
          
            <DrawSurface />
          </SideProvider>
        </SafeAreaView>
    </MatchProvider>
  );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#6A7168',
      alignItems: 'center',
      flexDirection: 'column'
  }
});

export default Index;