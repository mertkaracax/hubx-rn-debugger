/**
 * Extract the calling file name from the current stack trace
 */
export function getCallingFileName(): string {
  const stack = new Error().stack;
  if (!stack) {
    return "unknown";
  }

  const lines = stack.split("\n");
  const excludeFiles = [
    "console-log.ts",
    "getFileName",
    "logError",
    "logSuccess",
    "logInfo",
    "logWarning",
    "logDebug",
    "log(",
    "LoggerService.log",
    "getCallingFileName",
  ];

  // Skip the first few lines (Error, getCallingFileName, log function)
  for (let i = 3; i < lines.length; i++) {
    const line = lines[i];
    if (!line || !line.includes("at ")) {
      continue;
    }

    // Check if this line should be excluded
    const shouldExclude = excludeFiles.some((exclusion) =>
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
