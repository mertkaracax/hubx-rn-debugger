import { LogEntry, LogType, LogConfig } from "../../domain/types/log";
import {
  DEFAULT_COLORS,
  RESET_COLOR,
  DEFAULT_PREFIXES,
  LOG_LEVEL_HIERARCHY,
} from "../constants/config";

/**
 * Check if a log level should be output based on minimum log level
 */
export function shouldLog(logType: LogType, minLogLevel?: number): boolean {
  if (!minLogLevel) {
    return true;
  }

  const currentLevel = LOG_LEVEL_HIERARCHY[logType];
  return currentLevel >= minLogLevel;
}

/**
 * Format a log entry for console output
 */
export function formatLogEntry(entry: LogEntry, config: LogConfig): string {
  if (!shouldLog(entry.type, config.minLogLevel)) {
    return "";
  }

  const colors = config.colors || DEFAULT_COLORS;
  const prefixes = config.prefixes || DEFAULT_PREFIXES;
  const color = config.enableColors ? colors[entry.type] : "";
  const resetColor = config.enableColors ? RESET_COLOR : "";
  const prefix = prefixes[entry.type] || entry.type.toUpperCase();

  let output = "";

  // Add file name if enabled
  if (config.showFileName && entry.fileName) {
    const fileColor = config.enableColors ? config.fileNameColor : "";
    output += `${fileColor}[${entry.fileName}]${resetColor} `;
  }

  // Add colored prefix and message
  output += `${color}${prefix}${resetColor} ${entry.message}`;

  return output;
}
