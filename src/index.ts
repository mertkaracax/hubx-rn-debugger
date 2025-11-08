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

// Export default logger instance
export const logger = defaultLogger;

// Create Log object for global access (Log.success(), Log.info(), etc.)
export const Log = {
  info: logInfo,
  success: logSuccess,
  warning: logWarning,
  error: logError,
  debug: logDebug,
  log: log,
  configure: configureLogger,
  instance: logger,
};

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
    (window as any).logger = logger;
    (window as any).configureLogger = configureLogger;

    // Log object (Log.success(), Log.info(), etc.)
    (window as any).Log = Log;
  }
};

// Auto-setup when module is imported (side effect)
setupGlobalLogger();

// Export global setup for manual control
export { setupGlobalLogger };
