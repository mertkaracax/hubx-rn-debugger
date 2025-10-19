/**
 * Log level enum for better type safety
 */
export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  SUCCESS = 1,
  WARNING = 2,
  ERROR = 3,
}

/**
 * Log level types supported by the logger
 */
export type LogType = "info" | "success" | "warning" | "error" | "debug";

/**
 * Color configuration for different log types
 */
export interface LogColors {
  info: string;
  success: string;
  warning: string;
  error: string;
  debug: string;
}

/**
 * Configuration options for the logger
 */
export interface LogConfig {
  /** Whether to enable colored output */
  enableColors?: boolean;
  /** Custom color scheme */
  colors?: Partial<LogColors>;
  /** Minimum log level to output */
  minLogLevel?: LogLevel;
  /** Custom prefixes for each log type */
  prefixes?: Partial<Record<LogType, string>>;
  /** Whether to show file names in logs */
  showFileName?: boolean;
  /** Custom file name color */
  fileNameColor?: string;
}

/**
 * Log entry structure
 */
export interface LogEntry {
  message: string;
  type: LogType;
  timestamp: Date;
  fileName: string | undefined;
}
