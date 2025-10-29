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
export const log = (
  message: string,
  logType?: import("./domain/types/log").LogType
): void => {
  if (!isDev) {
    return;
  }
  defaultLogger.log(message, logType);
};

export const logInfo = (message: string): void => {
  if (!isDev) {
    return;
  }

  defaultLogger.logInfo(message);
};

export const logSuccess = (message: string): void => {
  if (!isDev) {
    return;
  }

  defaultLogger.logSuccess(message);
};

export const logWarning = (message: string): void => {
  if (!isDev) {
    return;
  }

  defaultLogger.logWarning(message);
};

export const logError = (message: string): void => {
  if (!isDev) {
    return;
  }

  defaultLogger.logError(message);
};

export const logDebug = (message: string): void => {
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

// Export default logger instance
export const logger = defaultLogger;

// Default export
export default log;

// Global setup function - call this to register global functions
const setupGlobalLogger = (): void => {
  // React Native global object
  if (typeof global !== "undefined") {
    (global as any).log = log;
    (global as any).logInfo = logInfo;
    (global as any).logSuccess = logSuccess;
    (global as any).logWarning = logWarning;
    (global as any).logError = logError;
    (global as any).logDebug = logDebug;
    (global as any).logger = logger;
    (global as any).configureLogger = configureLogger;
  }

  // Browser window object
  if (typeof window !== "undefined") {
    (window as any).log = log;
    (window as any).logInfo = logInfo;
    (window as any).logSuccess = logSuccess;
    (window as any).logWarning = logWarning;
    (window as any).logError = logError;
    (window as any).logDebug = logDebug;
    (window as any).logger = logger;
    (window as any).configureLogger = configureLogger;
  }
};

// Auto-setup when module is imported (side effect)
setupGlobalLogger();

// Export global setup for manual control
export { setupGlobalLogger };
