import { Logger } from "../logger/useLogger";
declare type Unpromisify<T> = T extends Promise<infer U> ? U : T;
export default function useExecutionRPC({ logger, }?: {
    logger?: Logger;
}): {
    serve: <F extends (...args: any) => Promise<any>>(functionName: string, fn: F) => Promise<void>;
    stub: <F_1 extends (...args: any) => Promise<any>>(functionName: string) => (...args: Parameters<F_1>) => Promise<Unpromisify<ReturnType<F_1>>>;
};
export {};
//# sourceMappingURL=useExecutionRPC.d.ts.map