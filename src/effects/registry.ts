import { VisualEffect, EffectCategory } from './types';
import FrostedGlass from './FrostedGlass';
import GradientGlow from './GradientGlow';

const EFFECT_REGISTRY: Record<string, VisualEffect> = {
  'frosted-glass': {
    key: 'frosted-glass',
    name: '毛玻璃',
    category: 'overlay',
    defaultIntensity: 40,
    minIntensity: 10,
    maxIntensity: 80,
    component: FrostedGlass,
  },
  'gradient-glow': {
    key: 'gradient-glow',
    name: '渐变光晕',
    category: 'overlay',
    defaultIntensity: 50,
    minIntensity: 10,
    maxIntensity: 100,
    component: GradientGlow,
  },
};

export function getEffect(key: string): VisualEffect | undefined {
  return EFFECT_REGISTRY[key];
}

export function getEffectsByCategory(category: EffectCategory): VisualEffect[] {
  return Object.values(EFFECT_REGISTRY).filter(e => e.category === category);
}

export function getAllEffects(): VisualEffect[] {
  return Object.values(EFFECT_REGISTRY);
}

export function getEffectNames(): { key: string; name: string }[] {
  return Object.values(EFFECT_REGISTRY).map(e => ({ key: e.key, name: e.name }));
}

export { EFFECT_REGISTRY };
