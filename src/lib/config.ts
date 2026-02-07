/**
 * Configuration loader.
 *
 * BUG 3 (parseConfig): The function catches the file-read error but
 * then still tries to JSON.parse the `data` variable, which is
 * `undefined` after the catch block. This causes:
 *   SyntaxError: Unexpected token u in JSON at position 0
 * (because JSON.parse(undefined) coerces to JSON.parse("undefined"))
 *
 * FIX: Return a default config object inside the catch block, or
 * re-throw, or move the JSON.parse inside the try block.
 */

import * as fs from "fs";
import * as path from "path";

interface AppConfig {
  appName: string;
  debug: boolean;
  maxRetries: number;
  apiBaseUrl: string;
}

const DEFAULT_CONFIG: AppConfig = {
  appName: "sample-app",
  debug: false,
  maxRetries: 3,
  apiBaseUrl: "http://localhost:3001",
};

export function parseConfig(): AppConfig {
  let data: string | undefined;

  try {
    const configPath = path.resolve(process.cwd(), "config.json");
    data = fs.readFileSync(configPath, "utf-8");
  } catch {
    // BUG: Swallows error but doesn't return or assign a default —
    // falls through to JSON.parse(undefined) below
    console.warn("Config file not found, using defaults");
  }

  // BUG: `data` is undefined here when file doesn't exist
  const parsed = JSON.parse(data as string);

  return {
    ...DEFAULT_CONFIG,
    ...parsed,
  };
}
