import { A_SDK_TYPES__LoggerConstructor } from "../types/A_SDK_Logger.types";
import { A_SDK_Error } from "./A_SDK_Error.class";

export class A_SDK_DefaultLogger {

    protected verbose: boolean = true;
    protected ignoreErrors: boolean = false;
    protected namespace: string | undefined = 'a-sdk';

    constructor(
        params: Partial<A_SDK_TYPES__LoggerConstructor>
    ) {
        this.verbose = params.verbose || this.verbose;
        this.ignoreErrors = params.ignoreErrors || this.ignoreErrors;
        this.namespace = params.namespace || this.namespace;
    }


    log(...args) {
        if (!this.verbose)
            return;

        console.log('\x1b[36m%s\x1b[0m', `[${this.namespace}] |${this.getTime()}| `, ...args)
    }

    warning(...args) {
        if (!this.verbose)
            return;

        console.log(`[${this.namespace}] |${this.getTime()}| `, ...args)
    }

    error(...args) {
        if (this.ignoreErrors)
            return;

        const firstArg = args[0];

        if (firstArg instanceof A_SDK_Error)
            this.logADAASError(firstArg)
        else
            console.log('\x1b[31m%s\x1b[0m', `[${this.namespace} ERROR] |${this.getTime()}| `, ...args)
    }


    protected logADAASError(error: A_SDK_Error) {
        const time = this.getTime();

        console.log('\x1b[31m%s\x1b[0m', `==================== ADAAS ERROR ==================`);
        console.log('\x1b[31m%s\x1b[0m', `[${this.namespace}] |${time}| ERROR:message     -> `, error.message);
        console.log('\x1b[31m%s\x1b[0m', `[${this.namespace}] |${time}| ERROR:code        -> `, error.code);
        console.log('\x1b[31m%s\x1b[0m', `[${this.namespace}] |${time}| ERROR:description -> `, error.description);
        if (error.link)
            console.log('\x1b[31m%s\x1b[0m', `[${this.namespace}] |${time}| Read in docs:        `, error.link);
        console.log('\x1b[31m%s\x1b[0m', `===================================================`);
    }



    protected getTime() {
        const now = new Date();
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const milliseconds = String(now.getMilliseconds()).padStart(4, '0');
        return `${minutes}:${seconds}:${milliseconds}`;
    }
}