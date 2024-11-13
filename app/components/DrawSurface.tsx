import React, { useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, PanResponder } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle, Path, Text as SvgText } from 'react-native-svg';
import { Shot } from '../types/Shot';
import { Match } from '../types/Match';
import { Point } from '../types/Point';
import { Player } from '../types/Player';
import { Set } from '../types/Set';

type DrawSurfaceProps = {
    match: Match;
}

const DrawSurface: React.FC<DrawSurfaceProps> = ({ match }) => {
  const insets = useSafeAreaInsets();
  const [path, setPath] = useState('');
  const [shots, setShots] = useState([]);
    const currentPathRef = useRef('');

  const screenHeight = Dimensions.get('window').height;
  const screenWidth = Dimensions.get('window').width;
  const courtHeight = screenHeight * 0.9 - insets.top;
  const courtWidth = (courtHeight / 13.4) * 6.1;

  const calculateDistance = (point1: { x: number, y: number }, point2: { x: number, y: number }): number =>
    Math.sqrt((point2.x - point1.x) ** 2 + (point2.y - point1.y) ** 2);

  const coordinates = [
    courtHeight / 25, 
    courtHeight / 5, 
    8 * courtHeight / 25, 
    11 * courtHeight / 25, 
    14 * courtHeight / 25, 
    17 * courtHeight / 25, 
    courtHeight * 4 / 5, 
    courtHeight * 24 / 25]
    .flatMap(y => [courtWidth / 12, courtWidth / 2, (courtWidth * 11) / 12].map(z => ({ x: z, y: y })));

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: (e) => {
      const { locationX, locationY } = e.nativeEvent;
      currentPathRef.current = `M ${locationX} ${locationY}`;
      setPath(currentPathRef.current);
      setShots([]);    },
    onPanResponderMove: (e) => {
      const { locationX, locationY } = e.nativeEvent;
      currentPathRef.current += ` L ${locationX} ${locationY}`;
      setPath(currentPathRef.current);
    },
    onPanResponderRelease: () => {
      const pathString = currentPathRef.current;
      const pathSegments = pathString.match(/[ML][^ML]*/g);

      const segments = pathSegments?.map(segment => 
        segment.split(/[ ,]+/).map(str => parseFloat(str.trim())).filter(num => !isNaN(num))
      );

      const postSegments: { x: number; y: number }[] = [];
      let prevCoord: null | { x: number, y: number } = null;

      segments?.forEach((segment) => {
        const curr = { x: segment[0], y: segment[1] };
        let closest = coordinates[0];
        let minDistance = calculateDistance(curr, closest);

        coordinates.forEach(coord => {
          const distance = calculateDistance(curr, coord);
          if (distance < minDistance) {
            minDistance = distance;
            closest = coord;
          }
        });

        if (!prevCoord || closest !== prevCoord) {
          postSegments.push(closest);
          prevCoord = closest;
        }
      });


      const first = postSegments.shift();

      const shots: Shot[] = [new Shot(first.x, first.y)];

      const getState = (shot: Shot) => { return shot.y > courtHeight/2 ? "near" : "far"};
      let state: "near" | "far" = getState(shots[0]);

        let bound = Math.abs(first.y - courtHeight/2);
        for (let i = 1; i < postSegments.length; i++) {
            const curr = new Shot(postSegments[i].x, postSegments[i].y);
            const dist = Math.abs(curr.y - courtHeight/2);
            const currState = getState(curr);

            if (currState !== state) {
                // console.log(currState);
                
                shots.push(curr);
                state = currState;
                bound = dist;

            } else if (dist > bound) {
                bound = dist;
                shots.pop();
                shots.push(curr);

            } else if (dist === bound) {
                if (shots[shots.length - 1].x === courtWidth/2) {
                    shots.pop();
                    shots.push(curr);
                }
            }

        }

      let newPath = '';

        newPath = `M ${shots[0].x} ${shots[0].y}`;
        shots.slice(1).forEach(point => {
        newPath += ` L ${point.x} ${point.y} M ${point.x} ${point.y}`;
      });

      setPath(newPath);
      setShots(shots);

      let winner: Player;

      if (shots.length === 1) {
        winner = getState(shots.at(-1)) == "near" ? match.player1 : match.player2;
      } else {
       winner = getState(shots.at(-1)) == "far" ? match.player1 : match.player2;
      }

    //   if match.sets[0].points.length !==.at(-1).winner

    //   match.sets[0].points.push(new Point(, winner, shots));
      console.log(match.sets[0].points);
    //   const Point = new Point(server, )
    },
  });


  return (
    <View
      style={[styles.drawSurface, { width: courtWidth, height: courtHeight, top: insets.top }]}
      {...panResponder.panHandlers}
    >
        <Svg style={StyleSheet.absoluteFill}>
          <Path d={path} fill="none" stroke="blue" strokeWidth={4} />
          {shots.map((shot, index) => (
            <Circle
              key={index}
              cx={shot.x}
              cy={shot.y}
              r={5} // Circle radius set from state
              fill="red"
            />
          ))}
        </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  drawSurface: {
    position: 'absolute',
    backgroundColor: 'transparent',
    zIndex: 10,
  },
});

export default DrawSurface;
