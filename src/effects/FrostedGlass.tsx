import React from 'react';
import { StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { EffectProps } from './types';

const FrostedGlass: React.FC<EffectProps> = ({ intensity, children, style }) => {
  return (
    <BlurView
      intensity={intensity}
      tint="dark"
      style={[styles.container, style]}
    >
      {children}
    </BlurView>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
});

export default FrostedGlass;
