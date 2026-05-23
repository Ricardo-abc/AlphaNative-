import React, { createContext, useContext, ReactNode } from 'react';
import { AppSettings, SettingKey } from '../types/settings';
import { useSettings } from '../hooks/useSettings';
import { DEFAULT_SETTINGS } from '../constants/defaultSettings';

interface SettingsContextType {
  settings: AppSettings;
  isLoaded: boolean;
  updateSetting: <K extends SettingKey>(key: K, value: AppSettings[K]) => void;
  updateSettings: (partial: Partial<AppSettings>) => void;
  resetSettings: () => void;
  handleDevModeClick: () => { enabled: boolean; remaining: number };
  toggleDevMode: () => void;
}

const SettingsContext = createContext<SettingsContextType>({
  settings: DEFAULT_SETTINGS,
  isLoaded: false,
  updateSetting: () => {},
  updateSettings: () => {},
  resetSettings: () => {},
  handleDevModeClick: () => ({ enabled: false, remaining: 5 }),
  toggleDevMode: () => {},
});

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const settingsHook = useSettings();

  return (
    <SettingsContext.Provider value={settingsHook}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettingsContext = () => useContext(SettingsContext);

export default SettingsContext;
