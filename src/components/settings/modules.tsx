import React from 'react';
import { AppSettings } from '../../types/settings';
import { THEME_COLORS, RAIL_COLORS, RAIL_ACTIVE_COLORS } from '../../constants/defaultSettings';
import SettingModule from './SettingModule';
import { SettingItem, SettingToggle, SettingSelector, SettingColor, SettingSliderItem } from './SettingItems';

interface AppearanceModuleProps {
  settings: AppSettings;
  onUpdate: <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => void;
}

export const AppearanceModule: React.FC<AppearanceModuleProps> = ({ settings, onUpdate }) => (
  <SettingModule
    title="外观"
    icon="🎨"
    summary={settings.themeColor}
  >
    <SettingColor
      label="主题颜色"
      colors={THEME_COLORS}
      value={settings.themeColor}
      onChange={(v) => onUpdate('themeColor', v)}
    />
    <SettingSliderItem
      label="字体缩放"
      value={settings.fontScale}
      min={0.8}
      max={1.4}
      step={0.05}
      unit="x"
      themeColor={settings.themeColor}
      onChange={(v) => onUpdate('fontScale', v)}
    />
  </SettingModule>
);

interface RailModuleProps {
  settings: AppSettings;
  onUpdate: <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => void;
}

export const RailModule: React.FC<RailModuleProps> = ({ settings, onUpdate }) => (
  <SettingModule
    title="轨道"
    icon="📱"
    summary={settings.railSide === 'left' ? '左侧' : '右侧'}
  >
    <SettingSliderItem
      label="轨道高度"
      value={settings.railHeight}
      min={150}
      max={800}
      step={10}
      unit="dp"
      themeColor={settings.themeColor}
      onChange={(v) => onUpdate('railHeight', v)}
    />
    <SettingSliderItem
      label="轨道长度"
      value={settings.railLength}
      min={0}
      max={800}
      step={5}
      unit="dp"
      themeColor={settings.themeColor}
      onChange={(v) => onUpdate('railLength', v)}
    />
    <SettingSelector
      label="轨道位置"
      options={[
        { label: '左侧', value: 'left' },
        { label: '右侧', value: 'right' },
      ]}
      value={settings.railSide}
      onChange={(v) => onUpdate('railSide', v as 'left' | 'right')}
    />
    <SettingColor
      label="轨道字母颜色"
      colors={RAIL_COLORS}
      value={settings.railColor}
      onChange={(v) => onUpdate('railColor', v)}
    />
    <SettingColor
      label="滑动中字母颜色"
      colors={RAIL_ACTIVE_COLORS}
      value={settings.railActiveColor}
      onChange={(v) => onUpdate('railActiveColor', v)}
    />
    <SettingToggle
      label="选中字母变色"
      value={settings.enableRailColorChange}
      onChange={(v) => onUpdate('enableRailColorChange', v)}
    />
    <SettingToggle
      label="轨道震动"
      value={settings.enableVibration}
      onChange={(v) => onUpdate('enableVibration', v)}
    />
    {settings.enableVibration && (
      <>
        <SettingSelector
          label="震动特效"
          options={[
            { label: '键盘点击', value: 'keyboardTap' },
            { label: '选择滚动', value: 'selection' },
            { label: '软触', value: 'soft' },
            { label: '硬触', value: 'rigid' },
            { label: '滴答', value: 'effectTick' },
            { label: '段落感', value: 'segmentTick' },
            { label: '轻撞击', value: 'impactLight' },
            { label: '中撞击', value: 'impactMedium' },
            { label: '重撞击', value: 'impactHeavy' },
            { label: '手势开始', value: 'gestureStart' },
            { label: '确认感', value: 'confirm' },
            { label: '系统默认', value: 'system' },
          ]}
          value={settings.vibrationEffect}
          onChange={(v) => onUpdate('vibrationEffect', v as AppSettings['vibrationEffect'])}
        />
        <SettingSliderItem
          label="震动强度"
          value={settings.vibrationIntensity}
          min={1}
          max={5}
          step={1}
          unit="级"
          themeColor={settings.themeColor}
          onChange={(v) => onUpdate('vibrationIntensity', v)}
        />
      </>
    )}
    <SettingToggle
      label="运动模糊"
      value={settings.enableMotionBlur}
      onChange={(v) => onUpdate('enableMotionBlur', v)}
    />
    {settings.enableMotionBlur && (
      <SettingSliderItem
        label="模糊强度"
        value={settings.motionBlurIntensity}
        min={0}
        max={1}
        step={0.05}
        unit=""
        themeColor={settings.themeColor}
        onChange={(v) => onUpdate('motionBlurIntensity', v)}
        formatValue={(v) => `${Math.round(v * 100)}%`}
      />
    )}
    <SettingToggle
      label="#下方选中#"
      value={settings.enableBottomRailSelect}
      onChange={(v) => onUpdate('enableBottomRailSelect', v)}
    />
    <SettingToggle
      label="*上方选中*"
      value={settings.enableTopRailSelect}
      onChange={(v) => onUpdate('enableTopRailSelect', v)}
    />
  </SettingModule>
);

interface BubbleModuleProps {
  settings: AppSettings;
  onUpdate: <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => void;
}

export const BubbleModule: React.FC<BubbleModuleProps> = ({ settings, onUpdate }) => (
  <SettingModule
    title="气泡"
    icon="💬"
    summary={`${settings.bubbleSize}px`}
  >
    <SettingSliderItem
      label="气泡大小"
      value={settings.bubbleSize}
      min={30}
      max={80}
      step={1}
      unit="px"
      themeColor={settings.themeColor}
      onChange={(v) => onUpdate('bubbleSize', v)}
    />
    <SettingSliderItem
      label="气泡偏移"
      value={settings.bubbleOffset}
      min={0}
      max={200}
      step={1}
      unit="px"
      themeColor={settings.themeColor}
      onChange={(v) => onUpdate('bubbleOffset', v)}
    />
  </SettingModule>
);

interface AppListModuleProps {
  settings: AppSettings;
  onUpdate: <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => void;
}

export const AppListModule: React.FC<AppListModuleProps> = ({ settings, onUpdate }) => (
  <SettingModule
    title="应用列表"
    icon="📋"
    summary={`${settings.appItemHeight}px`}
  >
    <SettingSliderItem
      label="图标大小"
      value={settings.iconSize}
      min={32}
      max={64}
      step={1}
      unit="px"
      themeColor={settings.themeColor}
      onChange={(v) => onUpdate('iconSize', v)}
    />
    <SettingSliderItem
      label="列表项高度"
      value={settings.appItemHeight}
      min={48}
      max={96}
      step={1}
      unit="px"
      themeColor={settings.themeColor}
      onChange={(v) => onUpdate('appItemHeight', v)}
    />
    <SettingSliderItem
      label="滚动位置"
      value={settings.focusScrollRatio}
      min={0.25}
      max={0.5}
      step={0.01}
      unit=""
      themeColor={settings.themeColor}
      onChange={(v) => onUpdate('focusScrollRatio', v)}
      formatValue={(v) => `${Math.round(v * 100)}%`}
    />
    <SettingSliderItem
      label="字母分组高度"
      value={settings.headerHeight}
      min={24}
      max={64}
      step={2}
      unit="px"
      themeColor={settings.themeColor}
      onChange={(v) => onUpdate('headerHeight', v)}
    />
    <SettingSliderItem
      label="应用名称字体大小"
      value={settings.appNameFontSize}
      min={12}
      max={20}
      step={1}
      unit="px"
      themeColor={settings.themeColor}
      onChange={(v) => onUpdate('appNameFontSize', v)}
    />
    <SettingToggle
      label="列表分割线"
      value={settings.showDivider}
      onChange={(v) => onUpdate('showDivider', v)}
    />
    <SettingToggle
      label="应用列表变色"
      value={settings.enableListColorChange}
      onChange={(v) => onUpdate('enableListColorChange', v)}
    />
    <SettingToggle
      label="轨道滑动聚焦"
      value={settings.enableScrubMode}
      onChange={(v) => onUpdate('enableScrubMode', v)}
    />
  </SettingModule>
);

interface FavoritesModuleProps {
  settings: AppSettings;
  onUpdate: <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => void;
}

export const FavoritesModule: React.FC<FavoritesModuleProps> = ({ settings, onUpdate }) => (
  <SettingModule
    title="收藏"
    icon="⭐"
    summary={settings.favoritesHeightMode === 'fixed' ? '固定高度' : '自适应'}
  >
    <SettingSliderItem
      label="收藏图标大小"
      value={settings.favIconSize}
      min={36}
      max={72}
      step={1}
      unit="px"
      themeColor={settings.themeColor}
      onChange={(v) => onUpdate('favIconSize', v)}
    />
    <SettingSliderItem
      label="收藏列数"
      value={settings.favColumns}
      min={2}
      max={6}
      step={1}
      unit="列"
      themeColor={settings.themeColor}
      onChange={(v) => onUpdate('favColumns', v)}
    />
    <SettingSelector
      label="收藏显示样式"
      options={[
        { label: '网格布局', value: 'grid' },
        { label: '列表布局', value: 'list' },
      ]}
      value={settings.favoritesDisplayStyle}
      onChange={(v) => onUpdate('favoritesDisplayStyle', v as 'grid' | 'list')}
    />
    <SettingSelector
      label="收藏区域高度模式"
      options={[
        { label: '固定高度', value: 'fixed' },
        { label: '自适应', value: 'auto' },
      ]}
      value={settings.favoritesHeightMode}
      onChange={(v) => onUpdate('favoritesHeightMode', v as 'fixed' | 'auto')}
    />
    {settings.favoritesHeightMode === 'fixed' && (
      <SettingSliderItem
        label="固定高度"
        value={settings.favoritesFixedHeight}
        min={150}
        max={500}
        step={10}
        unit="px"
        themeColor={settings.themeColor}
        onChange={(v) => onUpdate('favoritesFixedHeight', v)}
      />
    )}
    <SettingSelector
      label="字母索引滚动目标"
      options={[
        { label: '应用列表', value: 'appList' },
        { label: '收藏顶部', value: 'favoritesTop' },
      ]}
      value={settings.letterScrollTarget}
      onChange={(v) => onUpdate('letterScrollTarget', v as 'appList' | 'favoritesTop')}
    />
    <SettingToggle
      label="返回键回到收藏区域"
      value={settings.enableBackToFavorites}
      onChange={(v) => onUpdate('enableBackToFavorites', v)}
    />
  </SettingModule>
);
