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
  minLogLevel?: LogType | undefined;
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
