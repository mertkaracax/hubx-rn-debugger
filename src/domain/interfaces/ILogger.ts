import { LoggerService } from "../../application/services/LoggerService";
import { LogType, LogConfig, LogLevel } from "../types/log";

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

  /**
   * Set minimum log level
   */
  setMinLogLevel(level: LogLevel): void;
}

export interface ILog {
  info: (message: string) => void;
  success: (message: string) => void;
  warning: (message: string) => void;
  error: (message: string) => void;
  debug: (message: string) => void;
  log: (message: string, logType?: LogType) => void;
  configure: (config: LogConfig) => void;
  instance: LoggerService;
}
