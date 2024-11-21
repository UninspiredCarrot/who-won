import React from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Box from './Box'
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import BackCourt from './BackCourt';
import Svg, { Path } from 'react-native-svg';

const ScoreCard: React.FC = () => {
  const insets = useSafeAreaInsets();
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const match = useSelector((state: RootState) => state.match.currentMatch);

  return (
    <View style={[styles.scoreCard, {height: (screenHeight*0.25 - insets.top - 20)}]}>
      <View style={styles.name}>
        <Text style={styles.text}>{match!.team1[0]!.name}</Text>
        {match?.discipline === "Doubles" && <Text style={styles.text}>{match!.team1[1].name}</Text>}
      </View>
      <View style={styles.score}>
        {match!.sets.map((set, index) => {
          return (
              <Text key={index} style={[styles.set, {fontSize: ((25 - match!.sets.length*2) + index*2)}]}>{set[0]}:{set[1]}</Text>
          );
        })}
      </View>
      <View style={styles.name}>
        <Text style={styles.text}>{match!.team2[0]!.name}</Text>
        {match?.discipline === "Doubles" && <Text style={styles.text}>{match!.team2[1].name}</Text>}
      </View>
      <TouchableOpacity style={styles.settings}>
        <Svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
          <Path fill-rule="evenodd" clip-rule="evenodd" d="M22.7938 7.19378C22.0813 4.26874 17.9187 4.26874 17.2062 7.19378C17.0998 7.63332 16.8911 8.04153 16.5972 8.3852C16.3032 8.72886 15.9323 8.99828 15.5146 9.17151C15.0968 9.34474 14.6441 9.4169 14.1932 9.38211C13.7423 9.34732 13.306 9.20657 12.9198 8.97131C10.3472 7.40379 7.40336 10.3476 8.97091 12.9201C9.98344 14.5814 9.08528 16.7489 7.19522 17.2083C4.26826 17.919 4.26826 22.0834 7.19522 22.7922C7.63489 22.8987 8.04317 23.1075 8.38685 23.4017C8.73052 23.6958 8.99985 24.067 9.17292 24.485C9.34599 24.9029 9.4179 25.3558 9.3828 25.8069C9.34769 26.2579 9.20656 26.6942 8.97091 27.0803C7.40336 29.6529 10.3472 32.5967 12.9198 31.0292C13.3059 30.7935 13.7423 30.6524 14.1933 30.6173C14.6443 30.5822 15.0972 30.6541 15.5152 30.8271C15.9332 31.0002 16.3043 31.2695 16.5985 31.6132C16.8927 31.9569 17.1015 32.3652 17.208 32.8048C17.9187 35.7317 22.0832 35.7317 22.792 32.8048C22.8988 32.3654 23.1079 31.9574 23.4021 31.614C23.6964 31.2705 24.0675 31.0014 24.4853 30.8283C24.9031 30.6553 25.3559 30.5833 25.8068 30.6182C26.2577 30.6531 26.694 30.7939 27.0802 31.0292C29.6528 32.5967 32.5966 29.6529 31.0291 27.0803C30.7939 26.6941 30.6531 26.2578 30.6182 25.8069C30.5833 25.356 30.6553 24.9033 30.8283 24.4855C31.0013 24.0676 31.2705 23.6965 31.6139 23.4023C31.9573 23.1081 32.3653 22.899 32.8048 22.7922C35.7317 22.0815 35.7317 17.9171 32.8048 17.2083C32.3651 17.1018 31.9568 16.893 31.6132 16.5988C31.2695 16.3046 31.0001 15.9335 30.8271 15.5155C30.654 15.0975 30.5821 14.6446 30.6172 14.1936C30.6523 13.7426 30.7934 13.3063 31.0291 12.9201C32.5966 10.3476 29.6528 7.40379 27.0802 8.97131C26.6941 9.20697 26.2577 9.34809 25.8067 9.3832C25.3557 9.4183 24.9028 9.34639 24.4848 9.17333C24.0668 9.00026 23.6957 8.73093 23.4015 8.38726C23.1073 8.04359 22.8985 7.63531 22.792 7.19566L22.7938 7.19378Z" stroke="black" stroke-width="2"/>
          <Path d="M23.3333 20C23.3333 21.8409 21.8409 23.3333 20 23.3333C18.1591 23.3333 16.6667 21.8409 16.6667 20C16.6667 18.1591 18.1591 16.6667 20 16.6667C21.8409 16.6667 23.3333 18.1591 23.3333 20Z" stroke="black" stroke-width="2"/>
        </Svg>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  scoreCard: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    top: 20,
    alignSelf: 'center',
    width: "100%",
    // backgroundColor: '#5292B6',

  },
  name: {
    width: "33%",
    textAlign: "center",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,

  },
  score: {
    width: "33%",
    textAlign: "center",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: 'red',
    height: '100%',
    marginTop: 0,
  },
  text: {

    color: '#000',
        textAlign: 'center',         // Horizontal alignment
        textAlignVertical: 'center', // Vertical alignment
        fontFamily: 'Poppins',       // Ensure the font matches your app
        fontSize: 25,                // Text size
        fontWeight: '400',           // Weight
        height: 60,                  // Larger height to prevent clipping
        paddingVertical: 0,          // Remove excess padding
        letterSpacing: 0.085,
  },
  set: {
    color: '#000',
        textAlign: 'center',         // Horizontal alignment
        textAlignVertical: 'center', // Vertical alignment
        fontFamily: 'Poppins',       // Ensure the font matches your app
               // Text size
        fontWeight: '400',           // Weight
        paddingVertical: 0,          // Remove excess padding
        letterSpacing: 0.085,
  },
  settings: {
    position: 'absolute',
    right: 15,
    top: -15,
  }
});

export default ScoreCard;
