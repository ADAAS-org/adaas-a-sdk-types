"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.A_SDK_DefaultLogger = void 0;
const A_SDK_Error_class_1 = require("./A_SDK_Error.class");
class A_SDK_DefaultLogger {
    constructor(params) {
        this.verbose = true;
        this.ignoreErrors = false;
        this.namespace = 'a-sdk';
        this.verbose = params.verbose || this.verbose;
        this.ignoreErrors = params.ignoreErrors || this.ignoreErrors;
        this.namespace = params.namespace || this.namespace;
    }
    // protected getTerminalWidth ()  {
    //     if (process.stdout.isTTY) {
    //         return process.stdout.columns;
    //     }
    //     return null;
    // };
    log(...args) {
        if (!this.verbose)
            return;
        console.log(`\x1b[36m[${this.namespace}] |${this.getTime()}|`, args.length > 1
            ? `
${' '.repeat(this.namespace.length + 3)}|-------------------------------`
            : '', ...args
            .map((arg, i) => typeof arg === 'object'
            ? JSON.stringify(arg, null, 2)
                .replace(/\n/g, '\n' + `${' '.repeat(this.namespace.length + 3)}|`)
            : String(((i > 0 || args.length > 1) ? '\n' : '')
                + arg)
                .replace(/\n/g, '\n' + `${' '.repeat(this.namespace.length + 3)}|`)), args.length > 1 ?
            `
${' '.repeat(this.namespace.length + 3)}|-------------------------------\x1b[0m` :
            '\x1b[0m');
    }
    warning(...args) {
        if (!this.verbose)
            return;
        console.log(`[${this.namespace}] |${this.getTime()}| `, ...args);
    }
    error(...args) {
        if (this.ignoreErrors)
            return;
        const firstArg = args[0];
        if (firstArg instanceof A_SDK_Error_class_1.A_SDK_Error)
            this.log_A_SDK_Error(firstArg);
        else if (firstArg instanceof Error) {
            console.log(`\x1b[31m[${this.namespace}] |${this.getTime()}| ERROR 
${' '.repeat(this.namespace.length + 3)}|-------------------------------`, ...args
                .map(arg => {
                var _a;
                return typeof arg === 'object'
                    ? JSON.stringify({
                        name: arg.name,
                        message: arg.message,
                        stack: (_a = arg.stack) === null || _a === void 0 ? void 0 : _a.split('\n').map((line, index) => index === 0 ? line : `${' '.repeat(this.namespace.length + 3)}| ${line}`).join('\n')
                    }, null, 2)
                        .replace(/\n/g, '\n' + `${' '.repeat(this.namespace.length + 3)}|`)
                        .replace(/\\n/g, '\n')
                    : String(arg).replace(/\n/g, '\n' + `${' '.repeat(this.namespace.length + 3)}|`);
            }), `
${' '.repeat(this.namespace.length + 3)}|-------------------------------\x1b[0m`);
        }
        else
            console.log(`\x1b[31m[${this.namespace}] |${this.getTime()}|`, args.length > 1
                ? `
${' '.repeat(this.namespace.length + 3)}|-------------------------------`
                : '', ...args
                .map((arg, i) => typeof arg === 'object'
                ? JSON.stringify(arg, null, 2)
                    .replace(/\n/g, '\n' + `${' '.repeat(this.namespace.length + 3)}|`)
                : String(((i > 0 || args.length > 1) ? '\n' : '')
                    + arg)
                    .replace(/\n/g, '\n' + `${' '.repeat(this.namespace.length + 3)}|`)), args.length > 1 ?
                `
${' '.repeat(this.namespace.length + 3)}|-------------------------------\x1b[0m` :
                '\x1b[0m');
    }
    log_A_SDK_Error(error) {
        var _a, _b;
        const time = this.getTime();
        console.log(`\x1b[31m[${this.namespace}] |${time}| ERROR ${error.code}
${' '.repeat(this.namespace.length + 3)}| ${error.message}
${' '.repeat(this.namespace.length + 3)}| ${error.description} 
${' '.repeat(this.namespace.length + 3)}|-------------------------------
${' '.repeat(this.namespace.length + 3)}| ${((_a = error.stack) === null || _a === void 0 ? void 0 : _a.split('\n').map((line, index) => index === 0 ? line : `${' '.repeat(this.namespace.length + 3)}| ${line}`).join('\n')) || 'No stack trace'}
${' '.repeat(this.namespace.length + 3)}|-------------------------------
\x1b[0m`
            + (error.originalError ? `\x1b[31m${' '.repeat(this.namespace.length + 3)}| Wrapped From  ${error.originalError.message}
${' '.repeat(this.namespace.length + 3)}|-------------------------------
${' '.repeat(this.namespace.length + 3)}| ${((_b = error.originalError.stack) === null || _b === void 0 ? void 0 : _b.split('\n').map((line, index) => index === 0 ? line : `${' '.repeat(this.namespace.length + 3)}| ${line}`).join('\n')) || 'No stack trace'}
${' '.repeat(this.namespace.length + 3)}|-------------------------------
\x1b[0m` : '')
            + (error.link ? `\x1b[31m${' '.repeat(this.namespace.length + 3)}| Read in docs: ${error.link}
${' '.repeat(this.namespace.length + 3)}|-------------------------------
\x1b[0m` : ''));
    }
    getTime() {
        const now = new Date();
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const milliseconds = String(now.getMilliseconds()).padStart(4, '0');
        return `${minutes}:${seconds}:${milliseconds}`;
    }
}
exports.A_SDK_DefaultLogger = A_SDK_DefaultLogger;
//# sourceMappingURL=A_SDK_Logger.class.js.map