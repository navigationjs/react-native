import React from 'react';
import { Animated, Dimensions } from 'react-native';

export default function Wrap({ scene, children, style, ...props }) {
  const { height } = Dimensions.get('window');

  return (
    <Animated.View
      {...props}
      style={[
        {
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundColor: 'white',
        },
        {
          transform: [
            {
              translateY: scene.active.value.interpolate({
                inputRange: [0, 1],
                outputRange: [height, 0],
              }),
            },
          ],
        },
        style,
      ]}
    >
      {children}
    </Animated.View>
  );
}
