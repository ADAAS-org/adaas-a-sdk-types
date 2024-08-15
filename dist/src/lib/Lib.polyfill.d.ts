interface Ifspolyfill {
    readFileSync: (path: string, encoding: string) => string;
    existsSync: (path: string) => boolean;
}
declare class A_SDK_PolyfillsClass {
    private _fs;
    private moduleName;
    fs(): Promise<Ifspolyfill>;
    get env(): 'server' | 'browser';
    private init;
}
export declare const A_SDK_Polyfills: A_SDK_PolyfillsClass;
export {};
