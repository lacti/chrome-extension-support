/// <reference types="chrome" />
export default function useStorage({ storage, }?: {
    storage?: chrome.storage.StorageArea;
}): {
    getString: (key: string) => Promise<string | null>;
    putString: (key: string, value: string) => Promise<void>;
    remove: (key: string) => Promise<void>;
    get: <T>(key: string) => Promise<T | null>;
    put: <T_1>(key: string, value: T_1 | null) => Promise<void>;
};
//# sourceMappingURL=useStorage.d.ts.map