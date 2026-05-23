import { ReactNode } from 'react';
import { ViewStyle } from 'react-native';

export interface EffectProps {
  intensity: number;
  children?: ReactNode;
  style?: ViewStyle;
}

export type EffectCategory = 'background' | 'overlay' | 'accent';

export interface VisualEffect {
  key: string;
  name: string;
  category: EffectCategory;
  defaultIntensity: number;
  minIntensity: number;
  maxIntensity: number;
  component: React.ComponentType<EffectProps>;
}
