import React from 'react';
import { Animated, Dimensions } from 'react-native';
import navigation from '../Navigation';

export default function Wrap({
  navigator: navigatorName,
  scene: sceneName,
  children,
  style,
  ...props
}) {
  const { height } = Dimensions.get('window');

  const navigator = navigation.navigators[navigatorName];
  const scene = navigator.scenes[sceneName];

  const pass = {
    navigator: navigatorName,
    scene: sceneName,
  };

  return (
    <Animated.View
      {...props}
      style={[
        {
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundColor: 'white',
          overflow: 'hidden',
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
      {typeof children === 'function' ? children(pass) : children}
    </Animated.View>
  );
}
