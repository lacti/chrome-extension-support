import { Logger } from "../logger/useLogger";
import Unpromisify from "./unpromisify";
export default function useMessageRPC({ logger, }?: {
    logger?: Logger;
}): {
    serve: <F extends (...args: any) => Promise<any>>(functionName: string, fn: F) => void;
    stub: <F_1 extends (...args: any) => Promise<any>>(functionName: string) => (...args: Parameters<F_1>) => Promise<Unpromisify<ReturnType<F_1>>>;
};
//# sourceMappingURL=useMessageRPC.d.ts.map