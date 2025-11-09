/**
 * Extract the calling file name from the current stack trace
 * Returns the first .ts or .tsx file name that is not part of the logger itself
 * Also supports .js files (compiled TypeScript in React Native)
 */
export function getCallingFileName(): string {
  const stack = new Error().stack;
  if (!stack) {
    return "unknown";
  }

  const lines = stack.split("\n");

  // Debug: Uncomment to see actual stack trace format in React Native
  // console.log("=== STACK TRACE DEBUG ===");
  // console.log(stack);
  // console.log("=========================");

  // Files to exclude (logger internals) - check both .ts and .js versions
  const excludeFiles = [
    "stack-trace.ts",
    "stack-trace.js",
    "LoggerService.ts",
    "LoggerService.js",
    "index.ts",
    "index.js",
  ];

  // Skip the first line (Error message)
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line || !line.trim()) {
      continue;
    }

    // React Native stack traces might have different formats
    // Try multiple patterns to match different stack trace formats

    let filePath: string | null = null;

    // Try multiple patterns in order of specificity
    // Pattern 1: at functionName (file.ts:line:column) or at Object.functionName (file.ts:line:column)
    let match = line.match(/at\s+(?:\w+\.)?\w+\s*\(([^)]+)\)/);
    if (match && match[1]) {
      filePath = match[1].trim();
    } else {
      // Pattern 2: at file.ts:line:column (no function name)
      match = line.match(/at\s+([^\s]+:\d+(?::\d+)?)/);
      if (match && match[1]) {
        filePath = match[1].trim();
      } else {
        // Pattern 3: at file.ts:line (React Native sometimes omits column)
        match = line.match(/at\s+([^\s]+:\d+)/);
        if (match && match[1]) {
          filePath = match[1].trim();
        } else {
          // Pattern 4: More flexible - any path with line number in parentheses
          match = line.match(/\(([^)]+:\d+(?::\d+)?)\)/);
          if (match && match[1]) {
            filePath = match[1].trim();
          } else {
            // Pattern 5: Any file path with line number (most flexible for React Native)
            // This catches paths like: /path/to/file.ts:123 or file.ts:123
            match = line.match(/([^\s()]+\.(?:ts|tsx|js|jsx):\d+(?::\d+)?)/);
            if (match && match[1]) {
              filePath = match[1].trim();
            }
          }
        }
      }
    }

    if (!filePath) {
      continue;
    }

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

    // Extract file name from path (handle both / and \ separators)
    const fileName =
      fullPath.split("/").pop() || fullPath.split("\\").pop() || fullPath;
    if (!fileName) {
      continue;
    }

    // Check if it's a .ts, .tsx, or .js file
    // In React Native, TypeScript files are compiled to .js but we want to show the source file name
    // We'll accept .js files but prefer .ts/.tsx if available
    const isSourceFile =
      fileName.endsWith(".ts") ||
      fileName.endsWith(".tsx") ||
      fileName.endsWith(".js");

    if (isSourceFile) {
      // Check if this file should be excluded (logger internals)
      const shouldExclude = excludeFiles.some(
        (excludeFile) => fileName === excludeFile
      );

      if (!shouldExclude) {
        // For .js files, try to find corresponding .ts/.tsx file name
        // This handles React Native compiled TypeScript
        if (fileName.endsWith(".js")) {
          // Try to extract original TypeScript file name
          // In React Native, sometimes source maps preserve original names
          // But we'll return the .js name if that's what we have
          return fileName.replace(/\.js$/, "");
        }
        return fileName;
      }
    }
  }

  return "unknown";
}
