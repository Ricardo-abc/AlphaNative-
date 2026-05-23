import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, Image, View } from 'react-native';
import { useSettingsContext } from '../context/SettingsContext';
import { LETTER_COLORS } from '../constants/defaultSettings';
import { AppInfo, AppCustomization } from '../types/settings';

interface AppItemProps {
  item: AppInfo;
  onPress: (packageName: string) => void;
  onLongPress?: (item: AppInfo) => void;
  customization?: AppCustomization;
}

const AppItem: React.FC<AppItemProps> = React.memo(({ item, onPress, onLongPress, customization }) => {
  const { settings } = useSettingsContext();
  const [iconError, setIconError] = useState(false);

  const displayName = customization?.customName || item.name;
  const displayIcon = customization?.customIcon || item.icon;
  const hasIcon = !!displayIcon && displayIcon.length > 5 && !iconError;
  const bgColor = LETTER_COLORS[item.letter] || '#6366f1';
  const initial = displayName ? displayName.charAt(0).toUpperCase() : '?';
  const iconSize = settings.iconSize;
  const itemHeight = settings.appItemHeight;
  const borderRadius = settings.iconBorderRadius;

  return (
    <TouchableOpacity
      style={[styles.appItem, { height: itemHeight }]}
      activeOpacity={0.5}
      onPress={() => onPress(item.packageName!)}
      onLongPress={() => onLongPress?.(item)}
      delayLongPress={400}
    >
      {hasIcon ? (
        <Image
          source={{ uri: displayIcon }}
          style={[styles.appIcon, { width: iconSize, height: iconSize, borderRadius }]}
          onError={() => setIconError(true)}
          resizeMode="cover"
        />
      ) : (
        <View style={[styles.fallbackIcon, { width: iconSize, height: iconSize, borderRadius, backgroundColor: bgColor }]}>
          <Text style={[styles.fallbackText, { fontSize: iconSize * 0.43 }]}>{initial}</Text>
        </View>
      )}
      <Text style={[styles.appName, { fontSize: settings.appNameFontSize * settings.fontScale }]} numberOfLines={1}>{displayName}</Text>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  appItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  appIcon: {
    marginRight: 14,
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  fallbackIcon: {
    marginRight: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallbackText: {
    color: '#fff',
    fontWeight: '700',
  },
  appName: {
    flex: 1,
    color: '#e0e0e0',
    fontWeight: '500',
  },
});

export default AppItem;
