import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { AppSettings } from '../../types/settings';
import SettingSlider from '../SettingSlider';

interface DevSettingsProps {
  settings: AppSettings;
  onUpdate: <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => void;
  onReset: () => void;
}

const DevSettings: React.FC<DevSettingsProps> = ({ settings, onUpdate, onReset }) => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* 动画参数 */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>动画参数</Text>
        <View style={styles.card}>
          <View style={styles.cardItem}>
            <SettingSlider
              label="波浪强度"
              value={settings.waveIntensity}
              min={0}
              max={2}
              step={0.1}
              unit=""
              themeColor={settings.themeColor}
              onChange={(v) => onUpdate('waveIntensity', v)}
            />
            <Text style={styles.description}>
              控制字母轨道波浪动画的幅度。值越大，波浪效果越明显。超过1为增强模式。
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.cardItem}>
            <SettingSlider
              label="波浪衰减"
              value={settings.waveDecay}
              min={0.001}
              max={0.5}
              step={0.001}
              unit=""
              themeColor={settings.themeColor}
              onChange={(v) => onUpdate('waveDecay', v)}
            />
            <Text style={styles.description}>
              波浪衰减系数。值越小，波浪传播越远；值越大，波浪越集中。
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.cardItem}>
            <SettingSlider
              label="波浪弯曲上限"
              value={settings.waveShapeCap}
              min={10}
              max={100}
              step={5}
              unit="dp"
              themeColor={settings.themeColor}
              onChange={(v) => onUpdate('waveShapeCap', v)}
            />
            <Text style={styles.description}>
              限制波浪最大弯曲拉伸幅度，超出部分作为轨道整体横向平移。
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.cardItem}>
            <SettingSlider
              label="波浪纵向展开"
              value={settings.waveVerticalSpread}
              min={0.0}
              max={2.0}
              step={0.1}
              unit=""
              themeColor={settings.themeColor}
              onChange={(v) => onUpdate('waveVerticalSpread', v)}
            />
            <Text style={styles.description}>
              拉拽波浪时，字母之间的纵向拉伸间隔。
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.cardItem}>
            <SettingSlider
              label="选中缩放"
              value={settings.activeScale}
              min={1.0}
              max={2.5}
              step={0.1}
              unit="x"
              themeColor={settings.themeColor}
              onChange={(v) => onUpdate('activeScale', v)}
            />
            <Text style={styles.description}>
              选中字母的放大倍数。1.0 无缩放，2.5 最大缩放。
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.cardItem}>
            <SettingSlider
              label="相邻缩放"
              value={settings.neighborScale}
              min={1.0}
              max={1.5}
              step={0.05}
              unit="x"
              themeColor={settings.themeColor}
              onChange={(v) => onUpdate('neighborScale', v)}
            />
            <Text style={styles.description}>
              相邻字母的放大倍数。1.0 无缩放，1.5 最大缩放。
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.cardItem}>
            <SettingSlider
              label="动画时长"
              value={settings.animationDuration}
              min={50}
              max={500}
              step={10}
              unit="ms"
              themeColor={settings.themeColor}
              onChange={(v) => onUpdate('animationDuration', v)}
            />
            <Text style={styles.description}>
              选中字母时的过渡动画持续时间。值越小越跟手。
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.cardItem}>
            <SettingSlider
              label="弹性摩擦力"
              value={settings.springFriction}
              min={1}
              max={20}
              step={1}
              unit=""
              themeColor={settings.themeColor}
              onChange={(v) => onUpdate('springFriction', v)}
            />
            <Text style={styles.description}>
              松手后轨道回弹的阻力。值越大，回弹越快停止。推荐 5-8。
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.cardItem}>
            <SettingSlider
              label="弹性张力"
              value={settings.springTension}
              min={50}
              max={300}
              step={10}
              unit=""
              themeColor={settings.themeColor}
              onChange={(v) => onUpdate('springTension', v)}
            />
            <Text style={styles.description}>
              松手后回弹的力度。值越大，回弹越快越有力。推荐 150-200。
            </Text>
          </View>
        </View>
      </View>

      {/* 高级样式 */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>高级样式</Text>
        <View style={styles.card}>
          <View style={styles.cardItem}>
            <SettingSlider
              label="气泡透明度"
              value={settings.bubbleOpacity}
              min={0.3}
              max={1}
              step={0.05}
              unit=""
              themeColor={settings.themeColor}
              onChange={(v) => onUpdate('bubbleOpacity', v)}
            />
            <Text style={styles.description}>
              浮动字母气泡的透明度。1 为完全不透明。
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.cardItem}>
            <SettingSlider
              label="阴影强度"
              value={settings.shadowIntensity}
              min={0}
              max={1}
              step={0.05}
              unit=""
              themeColor={settings.themeColor}
              onChange={(v) => onUpdate('shadowIntensity', v)}
            />
            <Text style={styles.description}>
              气泡阴影的扩散程度。0 无阴影，1 最强阴影。影响立体感。
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.cardItem}>
            <SettingSlider
              label="图标圆角"
              value={settings.iconBorderRadius}
              min={0}
              max={24}
              step={1}
              unit="px"
              themeColor={settings.themeColor}
              onChange={(v) => onUpdate('iconBorderRadius', v)}
            />
            <Text style={styles.description}>
              应用图标的圆角大小。0 为方形，24 为接近圆形。
            </Text>
          </View>
        </View>
      </View>

      {/* 调试工具 */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>调试工具</Text>
        <View style={styles.card}>
          <View style={styles.switchRow}>
            <View style={styles.switchInfo}>
              <Text style={styles.switchLabel}>关闭动画</Text>
              <Text style={styles.switchDesc}>禁用所有过渡动画，用于调试性能</Text>
            </View>
            <Switch
              value={settings.disableAnimation}
              onValueChange={(v) => onUpdate('disableAnimation', v)}
              trackColor={{ false: '#39393D', true: settings.themeColor }}
              thumbColor="#fff"
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.switchRow}>
            <View style={styles.switchInfo}>
              <Text style={styles.switchLabel}>显示触摸区域</Text>
              <Text style={styles.switchDesc}>红色高亮左右边缘 50px 的手势响应区</Text>
            </View>
            <Switch
              value={settings.showTouchZone}
              onValueChange={(v) => onUpdate('showTouchZone', v)}
              trackColor={{ false: '#39393D', true: settings.themeColor }}
              thumbColor="#fff"
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.switchRow}>
            <View style={styles.switchInfo}>
              <Text style={styles.switchLabel}>显示轨道边界</Text>
              <Text style={styles.switchDesc}>绿色高亮字母轨道的响应区域</Text>
            </View>
            <Switch
              value={settings.showRailBounds}
              onValueChange={(v) => onUpdate('showRailBounds', v)}
              trackColor={{ false: '#39393D', true: settings.themeColor }}
              thumbColor="#fff"
            />
          </View>
        </View>
      </View>

      {/* 日志级别 */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>日志级别</Text>
        <View style={styles.card}>
          <View style={styles.cardItem}>
            <View style={styles.logSelector}>
              {(['off', 'basic', 'verbose'] as const).map((level) => (
                <TouchableOpacity
                  key={level}
                  style={[styles.logOption, settings.logLevel === level && styles.logOptionActive]}
                  onPress={() => onUpdate('logLevel', level)}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.logText, settings.logLevel === level && styles.logTextActive]}>
                    {level === 'off' ? '关闭' : level === 'basic' ? '基础' : '详细'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.description}>
              控制控制台输出的日志量。关闭 = 无日志，基础 = 关键事件，详细 = 全部调试信息。
            </Text>
          </View>
        </View>
      </View>

      {/* 重置 */}
      <View style={styles.section}>
        <TouchableOpacity style={styles.resetButton} onPress={onReset} activeOpacity={0.7}>
          <Text style={styles.resetText}>恢复默认设置</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomPadding} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    color: '#8E8E93',
    fontSize: 13,
    fontWeight: '400',
    textTransform: 'uppercase',
    marginBottom: 8,
    marginLeft: 4,
  },
  card: {
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    overflow: 'hidden',
  },
  cardItem: {
    padding: 16,
  },
  divider: {
    height: 0.5,
    backgroundColor: '#38383A',
    marginLeft: 16,
  },
  description: {
    color: '#8E8E93',
    fontSize: 13,
    lineHeight: 18,
    marginTop: 8,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  switchInfo: {
    flex: 1,
    marginRight: 12,
  },
  switchLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '400',
  },
  switchDesc: {
    color: '#8E8E93',
    fontSize: 13,
    marginTop: 4,
    lineHeight: 18,
  },
  logSelector: {
    flexDirection: 'row',
    gap: 8,
  },
  logOption: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#2C2C2E',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  logOptionActive: {
    borderColor: '#3b82f6',
    backgroundColor: 'rgba(59, 130, 246, 0.15)',
  },
  logText: {
    color: '#ccc',
    fontSize: 14,
    fontWeight: '500',
  },
  logTextActive: {
    color: '#3b82f6',
    fontWeight: '600',
  },
  resetButton: {
    backgroundColor: 'rgba(255, 69, 58, 0.12)',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  resetText: {
    color: '#FF453A',
    fontSize: 16,
    fontWeight: '400',
  },
  bottomPadding: {
    height: 40,
  },
});

export default DevSettings;
