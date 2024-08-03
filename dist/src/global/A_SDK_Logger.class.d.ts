import { A_SDK_TYPES__LoggerConstructor } from "../types/A_SDK_Logger.types";
import { A_SDK_Error } from "./A_SDK_Error.class";
export declare class A_SDK_DefaultLogger {
    protected verbose: boolean;
    protected ignoreErrors: boolean;
    protected namespace: string;
    constructor(params: Partial<A_SDK_TYPES__LoggerConstructor>);
    private colors;
    compile(color: keyof typeof this.colors, ...args: any[]): Array<string>;
    log(...args: any[]): void;
    warning(...args: any[]): void;
    error(...args: any[]): void;
    protected log_A_SDK_Error(error: A_SDK_Error): void;
    protected compile_A_SDK_Error(error: A_SDK_Error): string;
    protected compile_Error(error: Error): string;
    protected getTime(): string;
}
