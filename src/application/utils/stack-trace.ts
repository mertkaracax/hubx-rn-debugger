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

  // Files to exclude (logger internals)
  const excludeFiles = ["stack-trace.ts", "LoggerService.ts", "index.ts"];

  // Skip the first line (Error message)
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line || !line.trim()) {
      continue;
    }

    // Skip lines that don't contain "at "
    if (!line.includes("at ")) {
      continue;
    }

    // Extract file path from stack trace line
    // Pattern 1: at functionName (file.ts:line:column)
    let match = line.match(/at\s+[^(]+\(([^)]+)\)/);
    if (!match) {
      // Pattern 2: at file.ts:line:column (no function name)
      match = line.match(/at\s+([^\s]+)/);
    }

    if (match && match[1]) {
      const filePath = match[1].trim();

      // Skip if it's not a file path (e.g., node:internal, [eval], etc.)
      if (
        !filePath.includes(":") ||
        filePath.startsWith("[") ||
        filePath.startsWith("node:")
      ) {
        continue;
      }

      // Extract file name from path
      const pathParts = filePath.split(":");
      const fullPath = pathParts[0];
      if (!fullPath) {
        continue;
      }

      // Check if this is a node_modules file (library code) - exclude it
      if (fullPath.includes("node_modules")) {
        continue;
      }

      const fileName =
        fullPath.split("/").pop() || fullPath.split("\\").pop() || fullPath;
      if (!fileName) {
        continue;
      }

      // Check if it's a .ts or .tsx file
      if (fileName.endsWith(".ts") || fileName.endsWith(".tsx")) {
        // Check if this file should be excluded (logger internals)
        const shouldExclude = excludeFiles.some(
          (excludeFile) => fileName === excludeFile
        );

        if (!shouldExclude) {
          return fileName;
        }
      }
    }
  }

  return "unknown";
}
