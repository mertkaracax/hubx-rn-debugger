import { LogConfig } from "../../domain/types/log.types";

/**
 * Default logger configuration
 */
export const DEFAULT_LOGGER_CONFIG: LogConfig = {
  enableColors: true,
  showFileName: true,
  minLogLevel: "debug",
  colors: {
    info: "\x1b[36m", // Cyan
    success: "\x1b[32m", // Green
    warning: "\x1b[33m", // Yellow
    error: "\x1b[31m", // Red
    debug: "\x1b[35m", // Magenta
  },
  prefixes: {
    info: "ℹ️  INFO",
    success: "✅ SUCCESS",
    warning: "⚠️  WARNING",
    error: "❌ ERROR",
    debug: "🐛 DEBUG",
  },
  fileNameColor: "\x1b[38;5;208m", // Orange
};

/**
 * Configuration manager for the logger
 */
export class LoggerConfigManager {
  private config: LogConfig;

  constructor(initialConfig?: LogConfig) {
    this.config = { ...DEFAULT_LOGGER_CONFIG, ...initialConfig };
  }

  /**
   * Update the configuration
   */
  updateConfig(newConfig: Partial<LogConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  /**
   * Get the current configuration
   */
  getConfig(): LogConfig {
    return { ...this.config };
  }

  /**
   * Reset to default configuration
   */
  resetToDefault(): void {
    this.config = { ...DEFAULT_LOGGER_CONFIG };
  }

  /**
   * Enable or disable colors
   */
  setColorsEnabled(enabled: boolean): void {
    this.config.enableColors = enabled;
  }

  /**
   * Set minimum log level
   */
  setMinLogLevel(level: LogConfig["minLogLevel"] | undefined): void {
    this.config.minLogLevel = level;
  }

  /**
   * Enable or disable file name display
   */
  setFileNameDisplay(enabled: boolean): void {
    this.config.showFileName = enabled;
  }
}
