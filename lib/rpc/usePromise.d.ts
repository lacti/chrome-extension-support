export default function usePromise<T = unknown>(): {
    promise: Promise<T>;
    resolve: (value: T) => void;
    reject: (error?: Error | undefined) => void;
};
//# sourceMappingURL=usePromise.d.ts.map