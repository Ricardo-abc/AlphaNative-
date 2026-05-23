import React, { useRef, useState, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Animated,
  PanResponder,
  Dimensions,
  Alert,
  Vibration,
} from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const PREVIEW_WIDTH = SCREEN_WIDTH - 80;
const PREVIEW_HEIGHT = 200;

interface WallpaperCarouselProps {
  wallpapers: string[];
  currentIndex: number;
  onSelect: (index: number) => void;
  onReorder: (fromIndex: number, toIndex: number) => void;
  onDelete: (index: number) => void;
}

const WallpaperCarousel: React.FC<WallpaperCarouselProps> = ({
  wallpapers,
  currentIndex,
  onSelect,
  onReorder,
  onDelete,
}) => {
  const scrollX = useRef(new Animated.Value(currentIndex)).current;
  const [isDragging, setIsDragging] = useState(false);

  const animateTo = useCallback(
    (index: number) => {
      Animated.spring(scrollX, {
        toValue: index,
        friction: 8,
        tension: 60,
        useNativeDriver: true,
      }).start();
    },
    [scrollX]
  );

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_, gs) => Math.abs(gs.dx) > 15 && Math.abs(gs.dx) > Math.abs(gs.dy),
      onPanResponderGrant: () => {
        setIsDragging(true);
      },
      onPanResponderMove: (_, gs) => {
        const offset = -gs.dx / PREVIEW_WIDTH;
        scrollX.setValue(currentIndex + offset);
      },
      onPanResponderRelease: (_, gs) => {
        setIsDragging(false);
        const threshold = PREVIEW_WIDTH * 0.25;
        let newIndex = currentIndex;
        if (gs.dx < -threshold && currentIndex < wallpapers.length - 1) {
          newIndex = currentIndex + 1;
        } else if (gs.dx > threshold && currentIndex > 0) {
          newIndex = currentIndex - 1;
        }
        animateTo(newIndex);
        if (newIndex !== currentIndex) {
          onSelect(newIndex);
        }
      },
    })
  ).current;

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      onReorder(currentIndex, currentIndex - 1);
    }
  }, [currentIndex, onReorder]);

  const handleNext = useCallback(() => {
    if (currentIndex < wallpapers.length - 1) {
      onReorder(currentIndex, currentIndex + 1);
    }
  }, [currentIndex, wallpapers.length, onReorder]);

  const handleLongPress = useCallback(() => {
    if (wallpapers.length <= 1) return;
    Vibration.vibrate(15);
    Alert.alert('删除壁纸', '确定删除这张壁纸？', [
      { text: '取消', style: 'cancel' },
      { text: '删除', style: 'destructive', onPress: () => onDelete(currentIndex) },
    ]);
  }, [wallpapers.length, currentIndex, onDelete]);

  const handleDotPress = useCallback(
    (index: number) => {
      animateTo(index);
      onSelect(index);
    },
    [animateTo, onSelect]
  );

  if (wallpapers.length === 0) return null;

  return (
    <View style={styles.container}>
      {/* Large Preview */}
      <View style={styles.previewContainer} {...panResponder.panHandlers}>
        {wallpapers.map((uri, index) => {
          const translateX = scrollX.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [PREVIEW_WIDTH, 0, -PREVIEW_WIDTH],
            extrapolate: 'clamp',
          });

          const scale = scrollX.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.9, 1, 0.9],
            extrapolate: 'clamp',
          });

          const opacity = scrollX.interpolate({
            inputRange: [index - 1, index - 0.5, index, index + 0.5, index + 1],
            outputRange: [0, 0.5, 1, 0.5, 0],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={index}
              style={[
                styles.previewImage,
                {
                  transform: [{ translateX }, { scale }],
                  opacity,
                },
              ]}
            >
              <TouchableOpacity
                activeOpacity={0.9}
                onLongPress={handleLongPress}
                delayLongPress={400}
                style={styles.previewTouchable}
              >
                <Image source={{ uri }} style={styles.image} resizeMode="cover" />
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </View>

      {/* Page Dots */}
      <View style={styles.dotsContainer}>
        {wallpapers.map((_, index) => {
          const dotScale = scrollX.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.8, 1.3, 0.8],
            extrapolate: 'clamp',
          });
          const dotOpacity = scrollX.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });

          return (
            <TouchableOpacity key={index} onPress={() => handleDotPress(index)} activeOpacity={0.6}>
              <Animated.View
                style={[
                  styles.dot,
                  {
                    transform: [{ scale: dotScale }],
                    opacity: dotOpacity,
                  },
                ]}
              />
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Bottom Arrows + Counter */}
      <View style={styles.controls}>
        <TouchableOpacity
          style={[styles.arrowBtn, currentIndex === 0 && styles.arrowBtnDisabled]}
          onPress={handlePrev}
          disabled={currentIndex === 0}
          activeOpacity={0.6}
        >
          <Text style={[styles.arrowText, currentIndex === 0 && styles.arrowTextDisabled]}>◀</Text>
        </TouchableOpacity>

        <Text style={styles.counter}>
          {currentIndex + 1} / {wallpapers.length}
        </Text>

        <TouchableOpacity
          style={[styles.arrowBtn, currentIndex === wallpapers.length - 1 && styles.arrowBtnDisabled]}
          onPress={handleNext}
          disabled={currentIndex === wallpapers.length - 1}
          activeOpacity={0.6}
        >
          <Text style={[styles.arrowText, currentIndex === wallpapers.length - 1 && styles.arrowTextDisabled]}>▶</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 8,
  },
  previewContainer: {
    width: PREVIEW_WIDTH,
    height: PREVIEW_HEIGHT,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#1C1C1E',
  },
  previewImage: {
    ...StyleSheet.absoluteFillObject,
  },
  previewTouchable: {
    width: '100%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 14,
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#3b82f6',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    gap: 20,
  },
  arrowBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#2C2C2E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowBtnDisabled: {
    opacity: 0.3,
  },
  arrowText: {
    color: '#fff',
    fontSize: 14,
  },
  arrowTextDisabled: {
    color: '#666',
  },
  counter: {
    color: '#888',
    fontSize: 14,
    fontWeight: '500',
    minWidth: 40,
    textAlign: 'center',
  },
});

export default WallpaperCarousel;
