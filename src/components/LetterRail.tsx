import React, { useMemo } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { useRailAlphabet } from '../hooks/useActiveAlphabet';
import { useSettingsContext } from '../context/SettingsContext';
import { AppInfo } from '../types/settings';

interface LetterRailProps {
  activeIndex: number;
  activeIndexAnim: Animated.Value;
  isSliding: boolean;
  isDragging: boolean;
  colorSource: 'rail' | 'list';
  top: number;
  height: number;
  side: 'left' | 'right';
  pullX: Animated.Value;
  showList: boolean;
  apps: AppInfo[];
}

function interpolateHexColor(color1: string, color2: string, ratio: number): string {
  const parseHex = (hex: string) => {
    let cleaned = hex.replace('#', '');
    if (cleaned.length === 3) {
      cleaned = cleaned.split('').map(c => c + c).join('');
    }
    const num = parseInt(cleaned, 16);
    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255,
    };
  };

  try {
    const rgb1 = parseHex(color1);
    const rgb2 = parseHex(color2);
    const r = Math.round(rgb1.r + (rgb2.r - rgb1.r) * ratio);
    const g = Math.round(rgb1.g + (rgb2.g - rgb1.g) * ratio);
    const b = Math.round(rgb1.b + (rgb2.b - rgb1.b) * ratio);
    return `rgb(${r}, ${g}, ${b})`;
  } catch (e) {
    return color2;
  }
}

const LetterRail: React.FC<LetterRailProps> = React.memo(({
  activeIndex, activeIndexAnim, isSliding, isDragging, colorSource, top, height, side, pullX, showList, apps,
}) => {
  const { alphabet, hasAppSet } = useRailAlphabet(apps);
  const { settings } = useSettingsContext();
  const directionMultiplier = side === 'right' ? -1 : 1;
  const { 
    waveIntensity, waveDecay, waveShapeCap, waveVerticalSpread, bubbleSize, bubbleOffset, 
    railColor, railActiveColor, themeColor, 
    enableRailColorChange, enableListColorChange, 
    enableMotionBlur, motionBlurIntensity,
    railFontFamily, railFontWeight, railFontSize
  } = settings;

  // 预计算波浪因子表：每个字母距离为 dist 时的因子值
  const waveFactorTable = useMemo(() => {
    const len = alphabet.length;
    const table: number[] = [];
    for (let dist = 0; dist < len; dist++) {
      const gaussian = Math.exp(-dist * dist * waveDecay);
      const secondaryWave = Math.exp(-dist * dist * waveDecay * 0.25) * 0.3;
      table.push((gaussian + secondaryWave) * waveIntensity);
    }
    return table;
  }, [alphabet.length, waveDecay, waveIntensity]);

  // 预计算纵向展开因子表：依赖于当前 activeIndex
  const cumulativeSpreadTable = useMemo(() => {
    const table = new Array(alphabet.length).fill(0);
    if (activeIndex < 0) return table;

    // activeIndex 以上的字母：向上推 (负位移)
    let sumUp = 0;
    for (let i = activeIndex - 1; i >= 0; i--) {
      const dist = activeIndex - i;
      const factor = waveFactorTable[dist] || 0;
      sumUp += factor;
      table[i] = -sumUp;
    }

    // activeIndex 以下的字母：向下推 (正位移)
    let sumDown = 0;
    for (let i = activeIndex + 1; i < alphabet.length; i++) {
      const dist = i - activeIndex;
      const factor = waveFactorTable[dist] || 0;
      sumDown += factor;
      table[i] = sumDown;
    }

    return table;
  }, [activeIndex, alphabet.length, waveFactorTable]);

  // 声明式插值：限制弯曲幅度，超出部分作为整体平移
  const cappedPull = useMemo(() => {
    return pullX.interpolate({
      inputRange: [0, waveShapeCap],
      outputRange: [0, waveShapeCap],
      extrapolate: 'clamp',
    });
  }, [pullX, waveShapeCap]);

  const wholeShift = useMemo(() => {
    return pullX.interpolate({
      inputRange: [0, waveShapeCap, waveShapeCap + 1000],
      outputRange: [0, 0, 1000],
      extrapolate: 'clamp',
    });
  }, [pullX, waveShapeCap]);

  return (
    <View
      pointerEvents="none"
      style={[
        styles.rail,
        { top, height },
        side === 'left'
          ? { left: isSliding ? bubbleSize + bubbleOffset : 2 }
          : { right: 2 },
      ]}
    >
      <View style={[styles.letterContainer, { height: settings.railHeight }]}>
        {alphabet.map((letter, index) => {
          const dist = Math.abs(index - activeIndex);

          // Wave Factor
          const factor = waveFactorTable[dist] || 0;

          // Color calculation
          const isRailActive = colorSource === 'rail' && isDragging;
          const isListActive = colorSource === 'list';
          const colorEnabled = isRailActive ? enableRailColorChange : (isListActive ? enableListColorChange : false);

          const ratio = (isDragging && waveIntensity > 0) ? Math.min(1, factor / waveIntensity) : 0;
          const baseColor = interpolateHexColor(railColor, railActiveColor, ratio);

          const color = colorEnabled && showList
            ? (index === activeIndex ? themeColor : baseColor)
            : (letter === '*' ? themeColor : railColor);

          // Motion Blur & Scale calculations
          const blurFactor = dist === 0 ? 0 : Math.exp(-dist * dist * 0.15) * motionBlurIntensity;
          const scaleFactor = dist === 0 ? 0 : Math.exp(-dist * dist * 0.1) * motionBlurIntensity * 0.15;

          const dimOpacity = settings.emptyLetterMode === 'dim' && !hasAppSet.has(letter) ? 0.15 : 1;

          const motionBlurOpacity = (enableMotionBlur && isSliding
            ? 1 - blurFactor
            : 1) * dimOpacity;

          const motionBlurScale = enableMotionBlur && isSliding
            ? 1 - scaleFactor
            : 1;

          // 弯曲上限与整体平移
          const letterShift = Animated.add(
            Animated.multiply(cappedPull, factor),
            wholeShift
          );

          const waveTranslateX = isSliding
            ? Animated.multiply(letterShift, directionMultiplier)
            : 0;

          const cumulativeFactor = cumulativeSpreadTable[index] || 0;
          const waveTranslateY = isSliding && waveVerticalSpread > 0
            ? Animated.multiply(pullX, cumulativeFactor * waveVerticalSpread)
            : 0;

          const transforms: any[] = [];
          if (waveTranslateX) transforms.push({ translateX: waveTranslateX });
          if (waveTranslateY) transforms.push({ translateY: waveTranslateY });
          if (enableMotionBlur && isSliding) transforms.push({ scale: motionBlurScale });

          return (
            <Animated.View
              key={letter}
              style={[
                transforms.length > 0 ? { transform: transforms } : undefined,
                { opacity: motionBlurOpacity },
              ]}
            >
              <Animated.Text
                style={[
                  styles.letter,
                  { 
                    color,
                    fontFamily: railFontFamily === 'system' ? undefined : railFontFamily,
                    fontWeight: railFontWeight,
                    fontSize: railFontSize,
                  },
                ]}
              >
                {letter}
              </Animated.Text>
            </Animated.View>
          );
        })}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  rail: {
    position: 'absolute',
    width: 40,
    alignItems: 'center',
    zIndex: 15,
  },
  letterContainer: {
    width: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  letter: {
    fontSize: 11,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default LetterRail;
