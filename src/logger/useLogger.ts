type LogLevel = "trace" | "debug" | "info" | "warn" | "error";

export type Logger = ReturnType<typeof useLogger>;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function useLogger({
  level: filteredLevel = "debug",
}: {
  level?: LogLevel;
} = {}) {
  function logger(level: LogLevel) {
    return (...args: unknown[]) => {
      if (logLevelToSeverity(level) >= logLevelToSeverity(filteredLevel)) {
        console[level](new Date().toISOString(), level.toUpperCase(), ...args);
      }
    };
  }
  return {
    trace: logger("trace"),
    debug: logger("debug"),
    info: logger("info"),
    warn: logger("warn"),
    error: logger("error"),
  };
}

function logLevelToSeverity(level: LogLevel): number {
  switch (level) {
    case "trace":
      return 0;
    case "debug":
      return 10;
    case "info":
      return 20;
    case "warn":
      return 30;
    case "error":
      return 40;
  }
  return 99;
}
