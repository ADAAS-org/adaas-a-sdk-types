import { A_SDK_TYPES__LoggerConstructor } from "../types/A_SDK_Logger.types";
import { A_SDK_Error } from "./A_SDK_Error.class";
export declare class A_SDK_DefaultLogger {
    protected verbose: boolean;
    protected ignoreErrors: boolean;
    protected namespace: string | undefined;
    constructor(params: Partial<A_SDK_TYPES__LoggerConstructor>);
    log(...args: any[]): void;
    warning(...args: any[]): void;
    error(...args: any[]): void;
    protected logADAASError(error: A_SDK_Error): void;
    protected getTime(): string;
}
