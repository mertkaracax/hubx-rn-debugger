# hubx-rn-debugger

A configurable logging system for React Native applications built with clean architecture principles.

## Features

- 🌍 **Global Access**: Use logger functions without importing in every file
- 🎨 **Colored Output**: Beautiful colored console output with customizable color schemes
- 📁 **File Name Detection**: Automatically shows the calling file name in logs
- 🔧 **Configurable**: Extensive configuration options for colors, prefixes, and log levels
- 🏗️ **Simple Architecture**: Clean and simple architecture without unnecessary complexity
- 📦 **TypeScript Support**: Full TypeScript support with type definitions
- 🚀 **React Native Optimized**: Designed specifically for React Native applications
- 🎯 **Zero Dependencies**: No external dependencies, lightweight package
- ⚡ **Production Optimized**: Automatically disabled in production builds (**DEV** = false) with zero performance impact

## Installation

```bash
npm install hubx-rn-debugger
```

## Quick Start

### Method 1: Global Usage (No Import Required!) ⭐

After installing the package, you can use the logger functions globally without any imports:

```typescript
// No import needed! Just use directly
log("Hello World!");
log("This is an error", "error");

// Convenience methods - all available globally
logInfo("Information message");
logSuccess("Operation completed successfully");
logWarning("This is a warning");
logError("Something went wrong");
logDebug("Debug information");

// Configure logger globally
configureLogger({
  enableColors: true,
  showFileName: true,
  minLogLevel: LogLevel.DEBUG,
});
```

### Method 2: Traditional Import Usage

```typescript
import {
  log,
  logInfo,
  logSuccess,
  logWarning,
  logError,
  logDebug,
} from "hubx-rn-debugger";

// Simple logging
log("Hello World!");
log("This is an error", "error");

// Convenience methods
logInfo("Information message");
logSuccess("Operation completed successfully");
logWarning("This is a warning");
logError("Something went wrong");
logDebug("Debug information");
```

## Global Usage (Recommended) 🌍

The package automatically registers all logger functions globally, so you can use them anywhere in your React Native app without importing:

### Setup (One-time) - Method 1: Auto Setup

In your main App.tsx or index.js file, just import the package once:

```typescript
// App.tsx or index.js - Import once to register global functions
import "hubx-rn-debugger";

// That's it! Now you can use logger functions anywhere without imports
```

### Setup (One-time) - Method 2: Manual Setup

If auto setup doesn't work, use the manual setup:

```typescript
// App.tsx or index.js - Manual setup
import "hubx-rn-debugger/global-setup";

// Or import and call setup manually
import { setupGlobalLogger } from "hubx-rn-debugger";
setupGlobalLogger();
```

### Usage in Any Component

```typescript
// MyComponent.tsx - No import needed!
import React from "react";

export const MyComponent = () => {
  const handlePress = () => {
    // Use logger functions directly - no import required!
    logInfo("Button pressed");
    logSuccess("Operation completed");
    logError("Something went wrong");
  };

  return <button onPress={handlePress}>Press me</button>;
};
```

### Usage in Services

```typescript
// ApiService.ts - No import needed!
export class ApiService {
  async fetchData() {
    logInfo("Starting API call"); // No import needed!

    try {
      const response = await fetch("/api/data");
      logSuccess("API call successful"); // No import needed!
      return response;
    } catch (error) {
      logError("API call failed"); // No import needed!
      throw error;
    }
  }
}
```

### Global Configuration

```typescript
// App.tsx - Configure once globally
import "hubx-rn-debugger";

// Configure the global logger
configureLogger({
  enableColors: true,
  showFileName: true,
  minLogLevel: LogLevel.DEBUG,
});
```

### Advanced Usage with Configuration

```typescript
import { configureLogger, LoggerService, LogLevel } from "hubx-rn-debugger";

// Configure the default logger
configureLogger({
  enableColors: true,
  showFileName: true,
  minLogLevel: LogLevel.INFO,
  colors: {
    info: "\x1b[36m", // Custom cyan
    success: "\x1b[32m", // Custom green
    warning: "\x1b[33m", // Custom yellow
    error: "\x1b[31m", // Custom red
    debug: "\x1b[35m", // Custom magenta
  },
  prefixes: {
    info: "📘 INFO",
    success: "✅ SUCCESS",
    warning: "⚠️ WARNING",
    error: "❌ ERROR",
    debug: "🐛 DEBUG",
  },
  fileNameColor: "\x1b[38;5;208m", // Orange
});

// Create a custom logger instance
const customLogger = new LoggerService({
  enableColors: false,
  showFileName: false,
  minLogLevel: LogLevel.WARNING,
});

customLogger.logInfo("This won't show (below min level)");
customLogger.logWarning("This will show");
customLogger.logError("This will also show");
```

## API Reference

### Main Functions

#### `log(message: string, logType?: LogType): void`

Log a message with the specified type.

#### `logInfo(message: string): void`

Log an info message.

#### `logSuccess(message: string): void`

Log a success message.

#### `logWarning(message: string): void`

Log a warning message.

#### `logError(message: string): void`

Log an error message.

#### `logDebug(message: string): void`

Log a debug message.

#### `configureLogger(config: LogConfig): void`

Configure the default logger instance.

### Classes

#### `LoggerService`

Main logger service class.

```typescript
const logger = new LoggerService(config?: LogConfig);

// Methods
logger.log(message: string, logType?: LogType): void;
logger.logInfo(message: string): void;
logger.logSuccess(message: string): void;
logger.logWarning(message: string): void;
logger.logError(message: string): void;
logger.logDebug(message: string): void;
logger.configure(config: LogConfig): void;
logger.getConfig(): LogConfig;
logger.setColorsEnabled(enabled: boolean): void;
logger.setMinLogLevel(level: LogType | undefined): void;
logger.setFileNameDisplay(enabled: boolean): void;

// Static method
LoggerService.create(config?: LogConfig): LoggerService;
```

### Types

#### `LogType`

```typescript
type LogType = "info" | "success" | "warning" | "error" | "debug";
```

#### `LogLevel`

```typescript
enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  SUCCESS = 1,
  WARNING = 2,
  ERROR = 3,
}
```

#### `LogConfig`

```typescript
interface LogConfig {
  enableColors?: boolean;
  colors?: Partial<LogColors>;
  minLogLevel?: LogLevel;
  prefixes?: Partial<Record<LogType, string>>;
  showFileName?: boolean;
  fileNameColor?: string;
}
```

#### `LogColors`

```typescript
interface LogColors {
  info: string;
  success: string;
  warning: string;
  error: string;
  debug: string;
}
```

## Configuration Options

### `enableColors: boolean`

Enable or disable colored output. Default: `true`

### `colors: Partial<LogColors>`

Custom color scheme for different log types. Uses ANSI color codes.

### `minLogLevel: LogLevel`

Minimum log level to output. Logs below this level will be filtered out.

- `LogLevel.DEBUG` (0) - Shows all logs
- `LogLevel.INFO` (1) - Shows info, success, warning, error
- `LogLevel.SUCCESS` (1) - Shows info, success, warning, error
- `LogLevel.WARNING` (2) - Shows warning, error
- `LogLevel.ERROR` (3) - Shows only errors

### `prefixes: Partial<Record<LogType, string>>`

Custom prefixes for each log type.

### `showFileName: boolean`

Show the calling file name in logs. Default: `true`

### `fileNameColor: string`

Color for the file name display. Uses ANSI color codes.

## Examples

### Environment-based Configuration

```typescript
import { configureLogger, LogLevel } from "hubx-rn-debugger";

// Development configuration
if (__DEV__) {
  configureLogger({
    enableColors: true,
    showFileName: true,
    minLogLevel: LogLevel.DEBUG,
  });
} else {
  // Production configuration - logger is automatically disabled
  // No need to configure anything, all log calls return immediately
  configureLogger({
    enableColors: false,
    showFileName: false,
    minLogLevel: LogLevel.ERROR,
  });
}
```

### Production Performance

In production builds (`__DEV__ = false`), the logger is completely disabled:

```typescript
import { logInfo, logError } from "hubx-rn-debugger";

// In production, these calls return immediately with zero performance impact
logInfo("This won't execute in production");
logError("This won't execute in production");

// No stack trace parsing, no string formatting, no console.log calls
// Perfect for production apps where performance matters
```

### Custom Logger for Specific Modules

```typescript
import { LoggerService } from "hubx-rn-debugger";

// Create a logger specifically for API calls
const apiLogger = new LoggerService({
  enableColors: true,
  showFileName: false,
  prefixes: {
    info: "🌐 API",
    success: "✅ API",
    warning: "⚠️ API",
    error: "❌ API",
    debug: "🐛 API",
  },
});

// Use in your API service
class ApiService {
  async fetchData() {
    apiLogger.logInfo("Fetching data from server...");
    try {
      const response = await fetch("/api/data");
      apiLogger.logSuccess("Data fetched successfully");
      return response;
    } catch (error) {
      apiLogger.logError("Failed to fetch data");
      throw error;
    }
  }
}
```

### Disable Logging in Tests

```typescript
import { configureLogger, LogLevel } from "hubx-rn-debugger";

// In your test setup
beforeEach(() => {
  configureLogger({
    enableColors: false,
    showFileName: false,
    minLogLevel: LogLevel.ERROR, // Only show errors in tests
  });
});
```

## Output Examples

With default configuration, the logger produces output like this:

```
[MyComponent.tsx] ℹ️  INFO User logged in successfully
[ApiService.ts] ✅ SUCCESS Data fetched from server
[ValidationUtils.ts] ⚠️  WARNING Invalid input provided
[ErrorHandler.ts] ❌ ERROR Network request failed
[DebugHelper.ts] 🐛 DEBUG Current state: { user: 'john', role: 'admin' }
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Troubleshooting Global Usage

### Global Functions Not Working?

If global functions are not available, try these solutions:

1. **Check Import Order**: Make sure you import the package before using global functions:

```typescript
// App.tsx - Import first
import "hubx-rn-debugger";

// Then use in other files
logInfo("This should work now");
```

2. **Use Manual Setup**: If auto setup doesn't work:

```typescript
// App.tsx
import { setupGlobalLogger } from "hubx-rn-debugger";
setupGlobalLogger();
```

3. **Check Development Mode**: Global functions only work in development mode:

```typescript
// Check if you're in development mode
console.log("DEV mode:", __DEV__);
```

4. **Fallback to Traditional Import**: If global doesn't work, use traditional imports:

```typescript
import { logInfo, logSuccess } from "hubx-rn-debugger";
```

### Debug Global Setup

```typescript
// Check if global functions are available
console.log("Global log function:", typeof global.log);
console.log("Global logInfo function:", typeof global.logInfo);

// If undefined, call setup manually
if (typeof global.log === "undefined") {
  import("hubx-rn-debugger").then(({ setupGlobalLogger }) => {
    setupGlobalLogger();
    console.log("Global logger setup completed");
  });
}
```

## Example Usage

See the [example-usage.ts](example-usage.ts) file for comprehensive usage examples showing both global and traditional import methods.

## Support

If you have any questions or need help, please open an issue on GitHub or contact the HubX team.
