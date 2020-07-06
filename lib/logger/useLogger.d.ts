declare type LogLevel = "trace" | "debug" | "info" | "warn" | "error";
export declare type Logger = ReturnType<typeof useLogger>;
export default function useLogger({ level: filteredLevel, }?: {
    level?: LogLevel;
}): {
    trace: (...args: unknown[]) => void;
    debug: (...args: unknown[]) => void;
    info: (...args: unknown[]) => void;
    warn: (...args: unknown[]) => void;
    error: (...args: unknown[]) => void;
};
export {};
//# sourceMappingURL=useLogger.d.ts.map