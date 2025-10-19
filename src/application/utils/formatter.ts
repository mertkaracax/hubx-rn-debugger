import { LogEntry, LogType, LogConfig } from "../../domain/types/log";
import {
  DEFAULT_COLORS,
  RESET_COLOR,
  DEFAULT_PREFIXES,
  LOG_LEVEL_HIERARCHY,
  DEFAULT_TIMESTAMP_COLOR,
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
 * Format timestamp to HH:MM:SS:MMM format
 */
function formatTimestamp(timestamp: Date): string {
  const hours = timestamp.getHours().toString().padStart(2, "0");
  const minutes = timestamp.getMinutes().toString().padStart(2, "0");
  const seconds = timestamp.getSeconds().toString().padStart(2, "0");
  const milliseconds = timestamp.getMilliseconds().toString().padStart(3, "0");

  return `${hours}:${minutes}:${seconds}:${milliseconds}`;
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

  // Add timestamp
  const timestamp = formatTimestamp(entry.timestamp);
  const timeColor = config.enableColors ? DEFAULT_TIMESTAMP_COLOR : "";
  output += `${timeColor}[${timestamp}]${resetColor} `;

  // Add file name if enabled
  if (config.showFileName && entry.fileName) {
    const fileColor = config.enableColors ? config.fileNameColor : "";
    output += `${fileColor}[${entry.fileName}]${resetColor} `;
  }

  // Add colored prefix and message
  output += `${color}${prefix}${resetColor} ${color}${entry.message}${resetColor}`;

  return output;
}
