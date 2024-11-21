import React from 'react';
import {StyleSheet} from 'react-native';
import Court from './components/Court';
import ScoreCard from './components/ScoreCard';
import DrawSurface from './components/DrawSurface';
import { SafeAreaView } from 'react-native-safe-area-context';
const Index: React.FC = () => {

  return (
        <SafeAreaView style={{height: "100%", width: "100%", alignItems: "center"}}>
                <ScoreCard />
                <Court />
                <DrawSurface />
        </SafeAreaView>
  );
};



export default Index;