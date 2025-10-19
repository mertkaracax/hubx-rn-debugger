import { LogType, LogConfig } from "../types/log.types";

/**
 * Logger interface following dependency inversion principle
 */
export interface ILogger {
  /**
   * Log a message with specified type
   */
  log(message: string, logType?: LogType): void;

  /**
   * Log an info message
   */
  logInfo(message: string): void;

  /**
   * Log a success message
   */
  logSuccess(message: string): void;

  /**
   * Log a warning message
   */
  logWarning(message: string): void;

  /**
   * Log an error message
   */
  logError(message: string): void;

  /**
   * Log a debug message
   */
  logDebug(message: string): void;

  /**
   * Configure the logger
   */
  configure(config: LogConfig): void;

  /**
   * Get current configuration
   */
  getConfig(): LogConfig;
}
