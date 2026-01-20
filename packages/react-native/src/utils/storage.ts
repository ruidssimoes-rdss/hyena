import { Platform } from 'react-native';

/**
 * Platform-aware storage utility that uses localStorage on web
 * and AsyncStorage on native platforms.
 *
 * Note: AsyncStorage must be installed as a peer dependency for native usage.
 * Install with: npm install @react-native-async-storage/async-storage
 */

type AsyncStorageType = {
  getItem: (key: string) => Promise<string | null>;
  setItem: (key: string, value: string) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
};

// Cached AsyncStorage instance
let asyncStorageInstance: AsyncStorageType | null = null;
let asyncStorageAttempted = false;

function getAsyncStorage(): AsyncStorageType | null {
  // On web, never try to load AsyncStorage
  if (Platform.OS === 'web') {
    return null;
  }

  if (asyncStorageAttempted) {
    return asyncStorageInstance;
  }

  asyncStorageAttempted = true;

  try {
    // Use require for native platforms to avoid webpack bundling issues
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const module = require('@react-native-async-storage/async-storage');
    asyncStorageInstance = module.default || module;
    return asyncStorageInstance;
  } catch {
    if (__DEV__) {
      console.warn(
        'AsyncStorage is not available. Install @react-native-async-storage/async-storage for native storage support.'
      );
    }
    return null;
  }
}

// Declare __DEV__ for TypeScript
declare const __DEV__: boolean;

export const storage = {
  /**
   * Get an item from storage
   */
  async getItem(key: string): Promise<string | null> {
    if (Platform.OS === 'web') {
      try {
        return localStorage.getItem(key);
      } catch {
        // localStorage not available (e.g., private browsing)
        return null;
      }
    }

    const asyncStorage = getAsyncStorage();
    if (!asyncStorage) return null;
    return asyncStorage.getItem(key);
  },

  /**
   * Set an item in storage
   */
  async setItem(key: string, value: string): Promise<void> {
    if (Platform.OS === 'web') {
      try {
        localStorage.setItem(key, value);
      } catch {
        // localStorage not available (e.g., private browsing, quota exceeded)
      }
      return;
    }

    const asyncStorage = getAsyncStorage();
    if (!asyncStorage) return;
    return asyncStorage.setItem(key, value);
  },

  /**
   * Remove an item from storage
   */
  async removeItem(key: string): Promise<void> {
    if (Platform.OS === 'web') {
      try {
        localStorage.removeItem(key);
      } catch {
        // localStorage not available
      }
      return;
    }

    const asyncStorage = getAsyncStorage();
    if (!asyncStorage) return;
    return asyncStorage.removeItem(key);
  },
};

export default storage;
