/**
 * Global type declarations for React Native environment
 */
import { ILog } from "./domain/interfaces/ILogger";
import { LogConfig } from "./domain/types/log";

declare global {
  /**
   * React Native development mode flag
   * Automatically set by React Native build system
   */
  const __DEV__: boolean;

  // Browser window object (for web compatibility)
  var window: any;

  // Global Log object - use as Log.success(), Log.info(), etc.
  var Log: ILog;
}

export {};
