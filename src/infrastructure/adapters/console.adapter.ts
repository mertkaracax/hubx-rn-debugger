import { LogEntry, LogType, LogConfig } from "../../domain/types/log.types";
import {
  DEFAULT_COLORS,
  DEFAULT_FILE_COLOR,
  RESET_COLOR,
  DEFAULT_PREFIXES,
  LOG_LEVEL_HIERARCHY,
} from "../utils/colors.util";

/**
 * Console adapter for outputting formatted log messages
 */
export class ConsoleAdapter {
  private config: LogConfig;

  constructor(config: LogConfig = {}) {
    this.config = {
      enableColors: true,
      showFileName: true,
      fileNameColor: DEFAULT_FILE_COLOR,
      colors: DEFAULT_COLORS,
      prefixes: DEFAULT_PREFIXES,
      minLogLevel: "debug",
      ...config,
    };
  }

  /**
   * Update the configuration
   */
  updateConfig(config: Partial<LogConfig>): void {
    this.config = { ...this.config, ...config };
  }

  /**
   * Get current configuration
   */
  getConfig(): LogConfig {
    return { ...this.config };
  }

  /**
   * Check if a log level should be output based on minimum log level
   */
  private shouldLog(logType: LogType): boolean {
    if (!this.config.minLogLevel) return true;

    const currentLevel = LOG_LEVEL_HIERARCHY[logType] ?? 0;
    const minLevel = LOG_LEVEL_HIERARCHY[this.config.minLogLevel] ?? 0;

    return currentLevel >= minLevel;
  }

  /**
   * Format a log entry for console output
   */
  private formatLogEntry(entry: LogEntry): string {
    if (!this.shouldLog(entry.type)) {
      return "";
    }

    const colors = this.config.colors || DEFAULT_COLORS;
    const prefixes = this.config.prefixes || DEFAULT_PREFIXES;
    const color = this.config.enableColors ? colors[entry.type] : "";
    const resetColor = this.config.enableColors ? RESET_COLOR : "";
    const prefix = prefixes[entry.type] || entry.type.toUpperCase();

    let output = "";

    // Add file name if enabled
    if (this.config.showFileName && entry.fileName) {
      const fileColor = this.config.enableColors
        ? this.config.fileNameColor
        : "";
      output += `${fileColor}[${entry.fileName}]${resetColor} `;
    }

    // Add colored prefix and message
    output += `${color}${prefix}${resetColor} ${entry.message}`;

    return output;
  }

  /**
   * Output a log entry to console
   */
  log(entry: LogEntry): void {
    const formattedMessage = this.formatLogEntry(entry);
    if (formattedMessage) {
      console.log(formattedMessage);
    }
  }

  /**
   * Create a log entry from parameters
   */
  createLogEntry(message: string, type: LogType, fileName?: string): LogEntry {
    return {
      message,
      type,
      timestamp: new Date(),
      fileName,
    };
  }
}
