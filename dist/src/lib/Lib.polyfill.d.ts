interface Ifspolyfill {
    readFileSync: (path: string, encoding: string) => string;
    existsSync: (path: string) => boolean;
}
declare class LibPolyfillClass {
    private _fs;
    fs(): Promise<Ifspolyfill>;
    private init;
}
export declare const LibPolyfill: LibPolyfillClass;
export {};
