/**
 * Global setup for hubx-rn-debugger
 * Import this file once in your App.tsx or index.js to enable global logger access
 */

import { configureLogger, Log } from "./index";

// Setup global functions for React Native
if (typeof global !== "undefined") {
  (global as any).configureLogger = configureLogger;
  (global as any).Log = Log;
}

// Setup global functions for browser
if (typeof window !== "undefined") {
  (window as any).configureLogger = configureLogger;
  (window as any).Log = Log;
}

// Export for manual setup if needed
export { configureLogger, Log };
