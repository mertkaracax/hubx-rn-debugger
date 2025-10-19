import { ILogger } from "../../domain/interfaces/logger.interface";
import { LogType, LogConfig } from "../../domain/types/log.types";
import { ConsoleAdapter } from "../../infrastructure/adapters/console.adapter";
import { StackTraceUtil } from "../../infrastructure/utils/stack-trace.util";
import { LoggerConfigManager } from "../config/logger.config";

/**
 * Logger service implementation following clean architecture principles
 */
export class LoggerService implements ILogger {
  private consoleAdapter: ConsoleAdapter;
  private configManager: LoggerConfigManager;

  constructor(config?: LogConfig) {
    this.configManager = new LoggerConfigManager(config);
    this.consoleAdapter = new ConsoleAdapter(this.configManager.getConfig());
  }

  /**
   * Log a message with specified type
   */
  log(message: string, logType: LogType = "info"): void {
    const fileName = this.configManager.getConfig().showFileName
      ? StackTraceUtil.getCallingFileName()
      : undefined;

    const logEntry = this.consoleAdapter.createLogEntry(
      message,
      logType,
      fileName
    );
    this.consoleAdapter.log(logEntry);
  }

  /**
   * Log an info message
   */
  logInfo(message: string): void {
    this.log(message, "info");
  }

  /**
   * Log a success message
   */
  logSuccess(message: string): void {
    this.log(message, "success");
  }

  /**
   * Log a warning message
   */
  logWarning(message: string): void {
    this.log(message, "warning");
  }

  /**
   * Log an error message
   */
  logError(message: string): void {
    this.log(message, "error");
  }

  /**
   * Log a debug message
   */
  logDebug(message: string): void {
    this.log(message, "debug");
  }

  /**
   * Configure the logger
   */
  configure(config: LogConfig): void {
    this.configManager.updateConfig(config);
    this.consoleAdapter.updateConfig(this.configManager.getConfig());
  }

  /**
   * Get current configuration
   */
  getConfig(): LogConfig {
    return this.configManager.getConfig();
  }

  /**
   * Create a new logger instance with specific configuration
   */
  static create(config?: LogConfig): LoggerService {
    return new LoggerService(config);
  }

  /**
   * Enable or disable colors
   */
  setColorsEnabled(enabled: boolean): void {
    this.configManager.setColorsEnabled(enabled);
    this.consoleAdapter.updateConfig(this.configManager.getConfig());
  }

  /**
   * Set minimum log level
   */
  setMinLogLevel(level: LogConfig["minLogLevel"]): void {
    this.configManager.setMinLogLevel(level);
    this.consoleAdapter.updateConfig(this.configManager.getConfig());
  }

  /**
   * Enable or disable file name display
   */
  setFileNameDisplay(enabled: boolean): void {
    this.configManager.setFileNameDisplay(enabled);
    this.consoleAdapter.updateConfig(this.configManager.getConfig());
  }
}
