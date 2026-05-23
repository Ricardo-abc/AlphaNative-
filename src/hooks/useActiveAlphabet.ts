import { useMemo } from 'react';
import { useSettingsContext } from '../context/SettingsContext';
import { ALPHABET } from '../constants/defaultSettings';

/**
 * 根据设置返回当前活跃的字母列表
 * - appList 模式：隐藏 *
 * - favoritesTop 模式：显示 *
 */
export function useActiveAlphabet(): string[] {
  const { settings } = useSettingsContext();

  return useMemo(() => {
    if (settings.letterScrollTarget === 'appList') {
      return ALPHABET.filter(letter => letter !== '*');
    }
    return ALPHABET;
  }, [settings.letterScrollTarget]);
}

export default useActiveAlphabet;
