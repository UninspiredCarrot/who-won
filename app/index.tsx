import React from 'react';
import {StyleSheet, View} from 'react-native';
import Court from './components/Court';
import DrawSurface from './components/DrawSurface'
import { SafeAreaView } from 'react-native-safe-area-context';

const Index: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Court />
      <DrawSurface />
    </SafeAreaView>
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


// import { useRef, useState } from "react";
// import { Dimensions, Text, View, StyleSheet, TouchableOpacity, PanResponder } from "react-native";
// import { SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
// import Svg, { Path } from 'react-native-svg';


// const screenWidth = Dimensions.get('window').width;
// const screenHeight = Dimensions.get('window').height;

// class Point {
//   number: number;
//   point: boolean;
//   constructor(number = 0, point = false) {
//     this.number = number;
//     this.point = point;
//   }
// }
//     // if (this.near >= 30 || this.far >= 30 || 
//     //   (this.near >= 21 && Math.abs(this.near - this.far) >= 2) || 
//     //   (this.far >= 21 && Math.abs(this.near - this.far) >= 2)) {
//     //     this.near = 0;
//     //     this.far = 0;

//     //   }
// class Score {
//   far: Point;
//   near: Point;
//   nearScores: Point[];
//   farScores: Point[];
//   paths: string[];
//   constructor(nearScores: Point[] = [], farScores: Point[] = [], near = new Point(0, true), far = new Point(0, false), paths: string[] = []) {
//     this.near = near;
//     this.far = far;
//     this.nearScores = nearScores;
//     this.farScores = farScores;
//     this.paths = paths;
//   }

//   serverScore() {
//     return this.near.point ? this.near.number : this.far.number;
//   }

//   update(nearOrFar: "near" | "far", path: string) {
//     const winner = nearOrFar === "near" ? this.near : this.far;
//     const loser = nearOrFar === "near" ? this.far : this.near;

//     winner.number += 1;
//     winner.point = true;
//     loser.point = false;
//     this.paths.push(path);
//     console.log(this.paths);


//     // if (this.setDone()){
//     //   this.nextSet();
//     // }
//   }

//   render(nearOrFar: "near" | "far", leftOrRight: "left" | "right") {
//     const isNear = nearOrFar === "near";
//     const isEvenScore = this.serverScore() % 2 === 0;
  
//     const showScore =
//       (isNear && leftOrRight === (isEvenScore ? "right" : "left")) ||
//       (!isNear && leftOrRight === (isEvenScore ? "left" : "right"));
  
//     if (showScore) {
//       const scoreNumber = isNear ? this.near.number : this.far.number;
//       const showAsterisk = (isNear && this.near.point) || (!isNear && this.far.point);
  
//       return (
//         <Text style={styles.number}>
//           {scoreNumber}
//           {showAsterisk ? "*" : ""}
//         </Text>
//       );
//     }
//       return null;
//   }

//   setDone() {

//     return null;
//   }

//   nextSet() {

//   }
// }

// export default function Index() {
//   const [path, setPath] = useState<Array<{ x: number; y: number }>>([]);
//   const pathRef = useRef('');

//   const insets = useSafeAreaInsets();
//   const [score, setScore] = useState(new Score());
//   const increment = (winner: "near" | "far") => {
//     const updatedScore = new Score(score.nearScores, score.farScores, score.near, score.far, score.paths);
//     updatedScore.update(winner, pathRef.current);
//     setScore(updatedScore);
//   };





  
//   const panResponder = useRef(
//     PanResponder.create({
//       onStartShouldSetPanResponder: () => true,
//       onMoveShouldSetPanResponder: () => true,

//       onPanResponderGrant: (e, gestureState) => {
//         // Reset the path when a new touch starts
        
//         const { locationX, locationY } = e.nativeEvent;
//         pathRef.current = `M ${locationX} ${locationY}`;
//         // console.log(pathRef.current);
//         setPath([{ x: locationX, y: locationY }]);
//       },
//       onPanResponderMove: (e, gestureState) => {
//         // Capture the path as the user drags their finger
//         const { locationX, locationY } = e.nativeEvent;
//         pathRef.current += ` L ${locationX} ${locationY}`;
//         setPath((prevPath) => [...prevPath, { x: locationX, y: locationY }]);

//       },
//       onPanResponderRelease: (evt, gestureState) => {

//         if (Math.abs(gestureState.dx) + Math.abs(gestureState.dy) === 0) {
//           gestureState.y0 < (insets.top + screenHeight*0.4) ? increment('far') : increment('near');
//         } else {
//           gestureState.moveY < (insets.top + screenHeight*0.4) ? increment('near') : increment('far');
//         }
//       },
//     })
//   ).current;

//   return (
//     <SafeAreaView style={styles.container}>



//       <View style={styles.leftCourt}>
//         {/* Far court */}
//         <View style={styles.halfCourt}>
          
//           <View style={styles.back}>
//           </View>
//           <TouchableOpacity onPress={() => handleCourtTap("far")}>
//             <View style={styles.mid}>
//               {score.render("far", "left")}
//             </View>
//           </TouchableOpacity>
//           <View style={styles.front}>
//           </View>
          
//         </View>
//         {/* Near court */}
//         <View style={styles.halfCourt}>
//           <View style={styles.front}>
//           </View>
//             <View style={styles.mid}>
//               {score.render("near", "left")}
//             </View>
//           <View style={styles.back}>
//           </View>

//         </View>
//       </View>

//       <View style={styles.rightCourt}>
//         {/* Far court */}
//         <View style={styles.halfCourt}>
//           <View style={styles.back}>
//           </View>
//           <View style={styles.mid}>
//           {score.render("far", "right")}
//           </View>
//           <View style={styles.front}>
//           </View>
//         </View>
//         {/* Near court */}
//         <View style={styles.halfCourt}>
//           <View style={styles.front}>
//           </View>
//           <View style={styles.mid}>
//           {score.render("near", "right")}
//           </View>
//           <View style={styles.back}>
//           </View>

//         </View>
//       </View> 

//       <View style={[styles.draw, {top: insets.top}]} {...panResponder.panHandlers}>
//         <Svg style={StyleSheet.absoluteFill}>
//           <Path
//             d={pathRef.current}
//             fill="none"
//             stroke="blue"
//             strokeWidth={4}
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           />
//         </Svg>
//       </View>


//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#16262e',
//     justifyContent: 'center',
//     // alignItems: 'center',
//     flexDirection: 'row'
//   },
//   leftCourt: {
//     width: screenWidth * 0.45,
//     height: screenHeight * 0.8,
//     backgroundColor: '#3c7a89',
//     borderWidth: 3,
//     borderRightWidth: 0,
//     borderColor: '#dbc2cf',
//     flexDirection: 'column',
//     justifyContent: 'space-between',
//   },
//   rightCourt: {
//     width: screenWidth * 0.45,
//     height: screenHeight * 0.8,
//     backgroundColor: '#3c7a89',
//     borderWidth: 3,
//     borderLeftWidth: 0,
//     borderColor: '#dbc2cf',
//     flexDirection: 'column',
//     justifyContent: 'space-between',
//   },
//   halfCourt: {
//     flex: 1,
//   },
//   front: {
//     width: '100%',
//     height: screenHeight * 0.8 * 0.5 * 0.3,
//     borderWidth: 3,
//     borderColor: '#dbc2cf',
//     backgroundColor: '#2E4756',
//   },
//   mid: {
//     width: '100%',
//     height: screenHeight * 0.8 * 0.5 * 0.5,
//     borderWidth: 3,
//     borderColor: '#dbc2cf',
//     backgroundColor: '#356170',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   back: {
//     width: '100%',
//     height: screenHeight * 0.8 * 0.5 * 0.2,
//     borderWidth: 3,
//     borderColor: '#dbc2cf',

//   },
//   number: {
//     color: '#fff',
//     fontSize: 60,
//     fontWeight: 'bold',
//     textShadowColor: '#000',
//     textShadowOffset: { width: 2, height: 2 },
//     textShadowRadius: 5,
//   },
//   draw: {
//     position: "absolute",
//     width: screenWidth*0.9,
//     height: screenHeight * 0.8,
//     zIndex: 10
//   },
// });
