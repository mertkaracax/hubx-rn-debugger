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
