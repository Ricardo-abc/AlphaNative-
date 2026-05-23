import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native';

interface SettingModuleProps {
  title: string;
  icon: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  summary?: string;
}

const SettingModule: React.FC<SettingModuleProps> = ({
  title,
  icon,
  children,
  defaultExpanded = false,
  summary,
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [animation] = useState(new Animated.Value(defaultExpanded ? 1 : 0));

  const toggleExpand = () => {
    const toValue = expanded ? 0 : 1;
    Animated.spring(animation, {
      toValue,
      friction: 8,
      tension: 60,
      useNativeDriver: false,
    }).start();
    setExpanded(!expanded);
  };

  const rotateInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <View style={styles.module}>
      <TouchableOpacity
        style={styles.moduleHeader}
        onPress={toggleExpand}
        activeOpacity={0.7}
      >
        <View style={styles.moduleTitleRow}>
          <Text style={styles.moduleIcon}>{icon}</Text>
          <Text style={styles.moduleTitle}>{title}</Text>
        </View>
        <View style={styles.moduleRight}>
          {summary && !expanded && (
            <Text style={styles.moduleSummary}>{summary}</Text>
          )}
          <Animated.Text
            style={[
              styles.expandArrow,
              { transform: [{ rotate: rotateInterpolate }] },
            ]}
          >
            ▼
          </Animated.Text>
        </View>
      </TouchableOpacity>

      {expanded && (
        <View style={styles.moduleContent}>
          {children}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  module: {
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 14,
  },
  moduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    minHeight: 56,
  },
  moduleTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moduleIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  moduleTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  moduleRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moduleSummary: {
    color: '#8E8E93',
    fontSize: 14,
    marginRight: 8,
  },
  expandArrow: {
    color: '#8E8E93',
    fontSize: 12,
  },
  moduleContent: {
    paddingHorizontal: 16,
    paddingBottom: 18,
    borderTopWidth: 0.5,
    borderTopColor: '#38383A',
  },
});

export default SettingModule;
