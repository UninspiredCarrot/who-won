import React, { useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, PanResponder } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle, Path } from 'react-native-svg';
import Spot from './Spot'
import { Shot } from '../types/Shot';

const DrawSurface: React.FC = () => {
  const insets = useSafeAreaInsets();
  const [path, setPath] = useState('');
  const currentPathRef = useRef(''); // to hold the ongoing path segment

  const screenHeight = Dimensions.get('window').height;
  const screenWidth = Dimensions.get('window').width;
  const courtHeight = screenHeight * 0.9 - insets.top;
  const courtWidth = (courtHeight / 13.4) * 6.1;

  const calculateDistance = (point1: { x: number, y: number }, point2: { x: number, y: number }): number => {
    return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
  };

  const positions = ['far', 'near']
    .flatMap(x => (x === 'near' ? ['front', 'mid', 'back'] : ['back', 'mid', 'front'])
    .flatMap(y => ['left', 'center', 'right']
    .map(z => `${x}-${y}-${z}`)));
  const coordinates = [courtHeight/25, courtHeight/5, 8*courtHeight/25, 11*courtHeight/25, 14*courtHeight/25, 17*courtHeight/25, courtHeight*4/5, courtHeight*24/25]
    .flatMap(y => [courtWidth/12, courtWidth/2, (courtWidth*11)/12]
    .map(z => ({x: z, y: y})));

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,

    onPanResponderGrant: (e, gestureState) => {
      const { locationX, locationY } = e.nativeEvent;



      currentPathRef.current = `M ${locationX} ${locationY}`;
      setPath(currentPathRef.current);
    },

    onPanResponderMove: (e) => {
      const { locationX, locationY } = e.nativeEvent;
      currentPathRef.current += ` L ${locationX} ${locationY}`;
      console.log(`Current path:`, currentPathRef.current);
      setPath(currentPathRef.current);
    },

    onPanResponderRelease: () => {
        console.log('Path complete:', currentPathRef.current);
        //take current path and find all the y-tp
        const pathString = currentPathRef.current;

        const regex = /[ML][^ML]*/g;
        const pathSegments = pathString.match(regex);

        const postSegments = [];
        const segments = pathSegments?.map(str => str.split(/[ ,]+/).map(str => parseFloat(str.trim())).filter(num => !isNaN(num)));


        prevCoord = null;
        for (let i = 0; i < segments.length; i++) {
            const curr = {x: segments[i][0], y: segments[i][1]};

            //closest coordinate
            let closest = coordinates[10];
            let minDistance = calculateDistance(curr, closest);

            coordinates.forEach((coord) => {
                const distance = calculateDistance(curr, coord);
                if (distance < minDistance) {
                    minDistance = distance;
                    closest = coord;
                  }
            });


            if (prevCoord === null || closest !== prevCoord) {
                postSegments.push(closest);
                prevCoord = closest;
            }
        }

        console.log(postSegments);

        const yTP: Shot[] = [new Shot(postSegments[0].x, postSegments[0].y)];
        if (postSegments.length === 3) {
            yTP.push(new Shot(postSegments[1].x, postSegments[1].y));
        } else {
        for (let i = 2; i < postSegments.length - 2; i++) {
            const prev = postSegments[i - 1].y;
            const curr = postSegments[i    ].y;
            const next = postSegments[i + 1].y;

            //0 - 1 - 0 || 1 - 0 - 1
            if ((prev < curr && curr > next) || (prev > curr && curr < next)) {
                yTP.push(new Shot(postSegments[i].x, postSegments[i].y));
            }

            //0 - 1 - 1 || 1 - 0 - 0 
            else if ((prev < curr && curr === next) || (prev > curr && curr === next)) {
                if ((postSegments.length - 2 - i) >= 1 ) {
                    const nexter = postSegments[i + 2].y;
                    if (prev - curr === nexter - next) {
                        yTP.push(new Shot(postSegments[i].x, postSegments[i].y));
                    } else if ((postSegments.length - 2 - i) >= 2 ) {
                        const nextest = postSegments[i + 3].y;
                        if (prev - curr === nextest - nexter) {
                            yTP.push(new Shot(postSegments[i].x, postSegments[i].y));
                        }
                    }
                }
                
            }

        }}
        const last = postSegments[postSegments.length - 1];
        yTP.push(new Shot(last.x, last.y));
        console.log(yTP);

        let postString = "";
        postString += `M ${yTP[0].x} ${yTP[0].y}`
        for (let i = 1; i < yTP.length; i++) {
            postString += ` L ${yTP[i].x} ${yTP[i].y}`
        }

        setPath(postString);
    },
  });


  


  return (
    <View
      style={[styles.drawSurface, { width: courtWidth, height: courtHeight, top: insets.top }]}
      {...panResponder.panHandlers}
    >
        {/* <Svg style={StyleSheet.absoluteFill}>
        {coordinates.map((coordinate, index) => {
          return (
            <Circle
              key={index}
              cx={coordinate.x}
              cy={coordinate.y}
              r={5} // Radius for small circles
              fill="blue" // Color for the circle
            />
          );
        })}
      </Svg> */}
        
        <Svg style={[StyleSheet.absoluteFill]}>
            <Path d={path} fill="none" stroke="blue" strokeWidth={4} />
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
  spotContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
});

export default DrawSurface;
