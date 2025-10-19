import { LogColors } from "../../domain/types/log.types";

/**
 * Default ANSI color codes for different log types
 */
export const DEFAULT_COLORS: LogColors = {
  info: "\x1b[36m", // Cyan
  success: "\x1b[32m", // Green
  warning: "\x1b[33m", // Yellow
  error: "\x1b[31m", // Red
  debug: "\x1b[35m", // Magenta
};

/**
 * Default file name color
 */
export const DEFAULT_FILE_COLOR = "\x1b[38;5;208m"; // Orange

/**
 * ANSI reset color code
 */
export const RESET_COLOR = "\x1b[0m";

/**
 * Default prefixes for each log type
 */
export const DEFAULT_PREFIXES = {
  info: "ℹ️  INFO",
  success: "✅ SUCCESS",
  warning: "⚠️  WARNING",
  error: "❌ ERROR",
  debug: "🐛 DEBUG",
} as const;

/**
 * Log level hierarchy for filtering
 */
export const LOG_LEVEL_HIERARCHY: Record<string, number> = {
  debug: 0,
  info: 1,
  success: 1,
  warning: 2,
  error: 3,
};
