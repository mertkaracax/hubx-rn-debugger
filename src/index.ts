export { LoggerService } from "./application/services/LoggerService";

// Types and interfaces
export type {
  LogType,
  LogColors,
  LogConfig,
  LogEntry,
} from "./domain/types/log";
export type { ILogger } from "./domain/interfaces/ILogger";

// Enums
export { LogLevel } from "./domain/types/log";

// Configuration
export { DEFAULT_LOGGER_CONFIG } from "./application/config/default";

// Create default logger instance
import { LoggerService } from "./application/services/LoggerService";
import { isDevelopmentMode } from "./application/utils/dev-check";

const defaultLogger = new LoggerService();
const isDev = isDevelopmentMode();

// Export convenience methods using the default logger
const log = (
  message: string,
  logType?: import("./domain/types/log").LogType
): void => {
  if (!isDev) {
    return;
  }
  defaultLogger.log(message, logType);
};

const logInfo = (message: string): void => {
  if (!isDev) {
    return;
  }

  defaultLogger.logInfo(message);
};

const logSuccess = (message: string): void => {
  if (!isDev) {
    return;
  }

  defaultLogger.logSuccess(message);
};

const logWarning = (message: string): void => {
  if (!isDev) {
    return;
  }

  defaultLogger.logWarning(message);
};

const logError = (message: string): void => {
  if (!isDev) {
    return;
  }

  defaultLogger.logError(message);
};

const logDebug = (message: string): void => {
  if (!isDev) {
    return;
  }

  defaultLogger.logDebug(message);
};

// Export configuration function
export const configureLogger = (
  config: import("./domain/types/log").LogConfig
): void => {
  defaultLogger.configure(config);
};

// Log class with static methods for global access
export class Log {
  /**
   * Get the default logger instance
   */
  static get instance(): LoggerService {
    return defaultLogger;
  }

  /**
   * Log an info message
   */
  static info(message: string): void {
    if (!isDev) {
      return;
    }
    defaultLogger.logInfo(message);
  }

  /**
   * Log a success message
   */
  static success(message: string): void {
    if (!isDev) {
      return;
    }
    defaultLogger.logSuccess(message);
  }

  /**
   * Log a warning message
   */
  static warning(message: string): void {
    if (!isDev) {
      return;
    }
    defaultLogger.logWarning(message);
  }

  /**
   * Log an error message
   */
  static error(message: string): void {
    if (!isDev) {
      return;
    }
    defaultLogger.logError(message);
  }

  /**
   * Log a debug message
   */
  static debug(message: string): void {
    if (!isDev) {
      return;
    }
    defaultLogger.logDebug(message);
  }

  /**
   * Log a message with specified type
   */
  static log(
    message: string,
    logType?: import("./domain/types/log").LogType
  ): void {
    if (!isDev) {
      return;
    }
    defaultLogger.log(message, logType);
  }

  /**
   * Configure the default logger
   */
  static configure(config: import("./domain/types/log").LogConfig): void {
    defaultLogger.configure(config);
  }
}

// Default export
export default log;

// Global setup function - call this to register global functions
const setupGlobalLogger = (): void => {
  // React Native global object
  if (typeof global !== "undefined") {
    (global as any).Log = Log;
  }

  // Browser window object
  if (typeof window !== "undefined") {
    // Individual functions
    (window as any).log = log;
    (window as any).logInfo = logInfo;
    (window as any).logSuccess = logSuccess;
    (window as any).logWarning = logWarning;
    (window as any).logError = logError;
    (window as any).logDebug = logDebug;
    (window as any).configureLogger = configureLogger;

    // Log object (Log.success(), Log.info(), etc.)
    (window as any).Log = Log;
  }
};

// Auto-setup when module is imported (side effect)
setupGlobalLogger();

// Export global setup for manual control
export { setupGlobalLogger };
