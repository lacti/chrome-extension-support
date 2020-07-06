declare type Unpromisify<T> = T extends Promise<infer U> ? U : T;
export default Unpromisify;
//# sourceMappingURL=unpromisify.d.ts.map