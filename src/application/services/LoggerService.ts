import { ILogger } from "../../domain/interfaces/ILogger";
import { LogType, LogConfig, LogLevel, LogEntry } from "../../domain/types/log";
import { isDevelopmentMode } from "../utils/dev-check";
import { getCallingFileName } from "../utils/stack-trace";
import { formatLogEntry } from "../utils/formatter";
import {
  DEFAULT_COLORS,
  DEFAULT_FILE_COLOR,
  DEFAULT_PREFIXES,
} from "../constants/config";

export class LoggerService implements ILogger {
  private config: LogConfig;
  private isDev: boolean;

  constructor(config?: LogConfig) {
    this.isDev = isDevelopmentMode();

    this.config = {
      enableColors: true,
      showFileName: true,
      minLogLevel: LogLevel.DEBUG,
      colors: DEFAULT_COLORS,
      prefixes: DEFAULT_PREFIXES,
      fileNameColor: DEFAULT_FILE_COLOR,
      ...config,
    };
  }

  /**
   * Log a message with specified type
   */
  log(message: string, logType: LogType = "info"): void {
    // Early return if not in development mode - no performance impact
    if (!this.isDev) {
      return;
    }

    const fileName = this.config.showFileName
      ? getCallingFileName()
      : undefined;

    const logEntry: LogEntry = {
      message,
      type: logType,
      timestamp: new Date(),
      fileName,
    };

    const formattedMessage = formatLogEntry(logEntry, this.config);
    if (formattedMessage) {
      console.log(formattedMessage);
    }
  }

  /**
   * Log an info message
   */
  logInfo(message: string): void {
    if (!this.isDev) {
      return;
    }
    this.log(message, "info");
  }

  /**
   * Log a success message
   */
  logSuccess(message: string): void {
    if (!this.isDev) {
      return;
    }
    this.log(message, "success");
  }

  /**
   * Log a warning message
   */
  logWarning(message: string): void {
    if (!this.isDev) {
      return;
    }
    this.log(message, "warning");
  }

  /**
   * Log an error message
   */
  logError(message: string): void {
    if (!this.isDev) {
      return;
    }
    this.log(message, "error");
  }

  /**
   * Log a debug message
   */
  logDebug(message: string): void {
    if (!this.isDev) {
      return;
    }
    this.log(message, "debug");
  }

  /**
   * Configure the logger
   */
  configure(config: LogConfig): void {
    this.config = { ...this.config, ...config };
  }

  /**
   * Get current configuration
   */
  getConfig(): LogConfig {
    return { ...this.config };
  }

  /**
   * Set minimum log level
   */
  setMinLogLevel(level: LogLevel): void {
    this.config.minLogLevel = level;
  }

  /**
   * Create a new logger instance with specific configuration
   */
  static create(config?: LogConfig): LoggerService {
    return new LoggerService(config);
  }
}
