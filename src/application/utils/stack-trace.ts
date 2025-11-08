/**
 * Extract the calling file name from the current stack trace
 * Returns the first .ts or .tsx file name that is not part of the logger itself
 */
export function getCallingFileName(): string {
  const stack = new Error().stack;
  if (!stack) {
    return "unknown";
  }

  const lines = stack.split("\n");

  // Files and functions to exclude (logger internals)
  const excludePatterns = [
    "stack-trace.ts",
    "LoggerService.ts",
    "index.ts",
    "getCallingFileName",
    "LoggerService.log",
    "logInfo",
    "logSuccess",
    "logWarning",
    "logError",
    "logDebug",
    "log(",
  ];

  // Skip the first line (Error message)
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line || !line.includes("at ")) {
      continue;
    }

    // Check if this line should be excluded
    const shouldExclude = excludePatterns.some((pattern) =>
      line.includes(pattern)
    );

    if (shouldExclude) {
      continue;
    }

    // Try to match: at functionName (file.ts:line:column)
    let match = line.match(/at\s+.*?\((.+\.tsx?):\d+:\d+\)/);
    if (match && match[1]) {
      const filePath = match[1];
      // Extract just the file name from the path
      const fileName =
        filePath.split("/").pop() || filePath.split("\\").pop() || filePath;
      if (fileName.endsWith(".ts") || fileName.endsWith(".tsx")) {
        return fileName;
      }
    }

    // Try to match: at file.ts:line:column (no function name)
    match = line.match(/at\s+(.+\.tsx?):\d+:\d+/);
    if (match && match[1]) {
      const filePath = match[1];
      // Extract just the file name from the path
      const fileName =
        filePath.split("/").pop() || filePath.split("\\").pop() || filePath;
      if (fileName.endsWith(".ts") || fileName.endsWith(".tsx")) {
        return fileName;
      }
    }
  }

  return "unknown";
}
