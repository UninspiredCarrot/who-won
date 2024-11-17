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
        
        <SideProvider>
            <Court />
            <DrawSurface />
          </SideProvider>
        
    </MatchProvider>
  );
};



export default Index;