/**
 * Check if the app is running in development mode
 */
export function isDevelopmentMode(): boolean {
  return typeof __DEV__ !== "undefined" ? __DEV__ : true;
}
