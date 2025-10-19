// Main logger service
export { LoggerService } from "./application/services/logger.service";

// Types and interfaces
export type {
  LogType,
  LogColors,
  LogConfig,
  LogEntry,
} from "./domain/types/log.types";
export type { ILogger } from "./domain/interfaces/logger.interface";

// Configuration
export {
  LoggerConfigManager,
  DEFAULT_LOGGER_CONFIG,
} from "./application/config/logger.config";

// Utilities (for advanced usage)
export { ConsoleAdapter } from "./infrastructure/adapters/console.adapter";
export { StackTraceUtil } from "./infrastructure/utils/stack-trace.util";
export {
  DEFAULT_COLORS,
  DEFAULT_FILE_COLOR,
  RESET_COLOR,
  DEFAULT_PREFIXES,
  LOG_LEVEL_HIERARCHY,
} from "./infrastructure/utils/colors.util";

// Create default logger instance
import { LoggerService } from "./application/services/logger.service";

const defaultLogger = new LoggerService();

// Export convenience methods using the default logger
export const log = (
  message: string,
  logType?: import("./domain/types/log.types").LogType
): void => {
  defaultLogger.log(message, logType);
};

export const logInfo = (message: string): void => {
  defaultLogger.logInfo(message);
};

export const logSuccess = (message: string): void => {
  defaultLogger.logSuccess(message);
};

export const logWarning = (message: string): void => {
  defaultLogger.logWarning(message);
};

export const logError = (message: string): void => {
  defaultLogger.logError(message);
};

export const logDebug = (message: string): void => {
  defaultLogger.logDebug(message);
};

// Export configuration function
export const configureLogger = (
  config: import("./domain/types/log.types").LogConfig
): void => {
  defaultLogger.configure(config);
};

// Export default logger instance
export const logger = defaultLogger;

// Default export
export default log;
