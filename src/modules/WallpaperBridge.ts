import { NativeModules, Platform } from 'react-native';

interface WallpaperBridgeType {
  setWallpaper(base64: string): Promise<boolean>;
  syncWallpaperMeta(mode: string, index: number, count: number): Promise<boolean>;
  getSystemWallpaper(): Promise<string | null>;
}

const { WallpaperBridge } = NativeModules as { WallpaperBridge: WallpaperBridgeType | undefined };

export async function setWallpaper(base64: string): Promise<boolean> {
  if (Platform.OS !== 'android' || !WallpaperBridge) return false;
  return WallpaperBridge.setWallpaper(base64);
}

export async function syncWallpaperMeta(mode: string, index: number, count: number): Promise<boolean> {
  if (Platform.OS !== 'android' || !WallpaperBridge) return false;
  return WallpaperBridge.syncWallpaperMeta(mode, index, count);
}

export async function getSystemWallpaper(): Promise<string | null> {
  if (Platform.OS !== 'android' || !WallpaperBridge) return null;
  return WallpaperBridge.getSystemWallpaper();
}
