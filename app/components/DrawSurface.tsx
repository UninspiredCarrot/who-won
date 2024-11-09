import React, { useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, PanResponder } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import Spot from './Spot'

const DrawSurface: React.FC = () => {
  const insets = useSafeAreaInsets();
  const [path, setPath] = useState('');
  const currentPathRef = useRef(''); // to hold the ongoing path segment

  const screenHeight = Dimensions.get('window').height;
  const courtHeight = screenHeight * 0.9 - insets.top;
  const courtWidth = (courtHeight / 13.4) * 6.1;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,

    onPanResponderGrant: (e) => {
      const { locationX, locationY } = e.nativeEvent;
      currentPathRef.current = `M ${locationX} ${locationY}`;
      console.log('Starting path:', currentPathRef.current);
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
      setPath(currentPathRef.current);
    },
  });

  const positions = ['far', 'near']
    .flatMap(x => (x === 'near' ? ['front', 'mid', 'back'] : ['back', 'mid', 'front'])
    .flatMap(y => ['left', 'center', 'right']
    .map(z => `${x}-${y}-${z}`)));
  


  return (
    <View
      style={[styles.drawSurface, { width: courtWidth, height: courtHeight, top: insets.top }]}
      {...panResponder.panHandlers}
    >
        <View style={styles.spotContainer}>
            {positions.map((position, index) => (<Spot key={index} position={position} />))}
        </View>
        
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
