import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { useSettingsContext } from '../context/SettingsContext';

const WallpaperBackground: React.FC = () => {
  const { settings } = useSettingsContext();

  if (!settings.enableBackgroundImage || settings.wallpapers.length === 0) return null;

  const safeIndex = Math.min(settings.currentWallpaperIndex, settings.wallpapers.length - 1);
  const currentUri = settings.wallpapers[safeIndex];
  if (!currentUri) return null;

  return (
    <View style={styles.container} pointerEvents="none">
      <Image
        source={{ uri: currentUri }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.darkOverlay} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
  },
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
});

export default WallpaperBackground;
