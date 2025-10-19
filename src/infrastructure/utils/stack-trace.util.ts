/**
 * Utility for parsing stack traces to extract file names
 */
export class StackTraceUtil {
  /**
   * Extract the calling file name from the current stack trace
   * @param excludeFiles - Array of file names to exclude from the search
   * @returns The file name of the calling function or 'unknown'
   */
  static getCallingFileName(excludeFiles: string[] = []): string {
    const stack = new Error().stack;
    if (!stack) return "unknown";

    const lines = stack.split("\n");
    const defaultExclusions = [
      "console-log.ts",
      "getFileName",
      "logError",
      "logSuccess",
      "logInfo",
      "logWarning",
      "logDebug",
      "log(",
      "StackTraceUtil.getCallingFileName",
      "LoggerService.log",
    ];

    const allExclusions = [...defaultExclusions, ...excludeFiles];

    // Skip the first few lines (Error, getCallingFileName, log function)
    for (let i = 3; i < lines.length; i++) {
      const line = lines[i];
      if (!line || !line.includes("at ")) continue;

      // Check if this line should be excluded
      const shouldExclude = allExclusions.some((exclusion) =>
        line.includes(exclusion)
      );

      if (shouldExclude) continue;

      // Extract the part after "at " and before " ("
      const match = line.match(/at\s+(.+?)\s*\(/);
      if (match && match[1]) {
        return match[1];
      }
    }

    return "unknown";
  }

  /**
   * Extract file name from a stack trace line
   * @param stackLine - A single line from the stack trace
   * @returns The file name or null if not found
   */
  static extractFileNameFromLine(stackLine: string): string | null {
    const match = stackLine.match(/at\s+(.+?)\s*\(/);
    return match && match[1] ? match[1] : null;
  }
}
