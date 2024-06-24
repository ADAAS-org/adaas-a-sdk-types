export declare class A_SDK_Deferred<T> {
    promise: Promise<T>;
    private resolveFn;
    private rejectFn;
    constructor();
    resolve(value: T | PromiseLike<T>): void;
    reject(reason?: any): void;
}
