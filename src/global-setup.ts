/**
 * Global setup for hubx-rn-debugger
 * Import this file once in your App.tsx or index.js to enable global logger access
 */

import {
  log,
  logInfo,
  logSuccess,
  logWarning,
  logError,
  logDebug,
  logger,
  configureLogger,
  Log,
} from "./index";

// Setup global functions for React Native
if (typeof global !== "undefined") {
  (global as any).log = log;
  (global as any).logInfo = logInfo;
  (global as any).logSuccess = logSuccess;
  (global as any).logWarning = logWarning;
  (global as any).logError = logError;
  (global as any).logDebug = logDebug;
  (global as any).logger = logger;
  (global as any).configureLogger = configureLogger;
  (global as any).Log = Log;
}

// Setup global functions for browser
if (typeof window !== "undefined") {
  (window as any).log = log;
  (window as any).logInfo = logInfo;
  (window as any).logSuccess = logSuccess;
  (window as any).logWarning = logWarning;
  (window as any).logError = logError;
  (window as any).logDebug = logDebug;
  (window as any).logger = logger;
  (window as any).configureLogger = configureLogger;
  (window as any).Log = Log;
}

// Export for manual setup if needed
export {
  log,
  logInfo,
  logSuccess,
  logWarning,
  logError,
  logDebug,
  logger,
  configureLogger,
  Log,
};
