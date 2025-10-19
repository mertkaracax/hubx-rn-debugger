import { LogConfig, LogLevel } from "../../domain/types/log";

/**
 * Default logger configuration
 */
export const DEFAULT_LOGGER_CONFIG: LogConfig = {
  enableColors: true,
  showFileName: true,
  minLogLevel: LogLevel.DEBUG,
  colors: {
    info: "\x1b[36m", // Cyan
    success: "\x1b[32m", // Green
    warning: "\x1b[33m", // Yellow
    error: "\x1b[31m", // Red
    debug: "\x1b[35m", // Magenta
  },
  prefixes: {
    info: "ⓘ",
    success: "✅",
    warning: "⚠️",
    error: "❌",
    debug: "🛠",
  },
  fileNameColor: "\x1b[38;5;208m", // Orange
};
