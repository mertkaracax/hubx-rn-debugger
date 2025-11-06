/**
 * Global type declarations for React Native environment
 */
import { LogConfig } from "./domain/types/log";

declare global {
  /**
   * React Native development mode flag
   * Automatically set by React Native build system
   */
  const __DEV__: boolean;

  // Browser window object (for web compatibility)
  var window: any;

  // Global logger functions - no import needed!
  var log: (
    message: string,
    logType?: import("./domain/types/log").LogType
  ) => void;
  var logInfo: (message: string) => void;
  var logSuccess: (message: string) => void;
  var logWarning: (message: string) => void;
  var logError: (message: string) => void;
  var logDebug: (message: string) => void;
  var logger: import("./application/services/LoggerService").LoggerService;
  var configureLogger: (config: LogConfig) => void;

  // Global Log object - use as Log.success(), Log.info(), etc.
  var Log: {
    info: (message: string) => void;
    success: (message: string) => void;
    warning: (message: string) => void;
    error: (message: string) => void;
    debug: (message: string) => void;
    log: (
      message: string,
      logType?: import("./domain/types/log").LogType
    ) => void;
    configure: (config: LogConfig) => void;
    instance: import("./application/services/LoggerService").LoggerService;
  };
}

export {};
