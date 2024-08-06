import { A_SDK_TYPES__LoggerConstructor } from "../types/A_SDK_Logger.types";
import { A_SDK_Error } from "./A_SDK_Error.class";

export class A_SDK_DefaultLogger {

    protected verbose: boolean = true;
    protected ignoreErrors: boolean = false;
    protected namespace: string = 'a-sdk';

    constructor(
        params: Partial<A_SDK_TYPES__LoggerConstructor>
    ) {
        this.verbose = params.verbose === true  || params.verbose === false ? params.verbose : this.verbose;
        this.ignoreErrors = params.ignoreErrors === true || params.ignoreErrors === false ? params.ignoreErrors : this.ignoreErrors; 
        this.namespace = params.namespace || this.namespace;
    }

    private colors = {
        green: '32',
        blue: '34',
        red: '31',
        yellow: '33',
        gray: '90',
        magenta: '35',
        cyan: '36',
        white: '37',
        pink: '95',
    } as const


    // protected getTerminalWidth ()  {
    //     if (process.stdout.isTTY) {
    //         return process.stdout.columns;
    //     }
    //     return null;
    // };


    compile(
        color: keyof typeof this.colors,
        ...args: any[]
    ): Array<string> {

        return [
            `\x1b[${this.colors[color]}m[${this.namespace}] |${this.getTime()}|`,
            (
                args.length > 1
                    ? '\n' + `${' '.repeat(this.namespace.length + 3)}|-------------------------------`
                    : ''

            ),
            ...(args
                .map((arg, i) => {


                    switch (true) {
                        case arg instanceof A_SDK_Error:
                            return this.compile_A_SDK_Error(arg);

                        case arg instanceof Error:
                            return this.compile_Error(arg);

                        case typeof arg === 'object':
                            return JSON.stringify(arg, null, 2)
                                .replace(/\n/g, '\n' + `${' '.repeat(this.namespace.length + 3)}| `);

                        default:
                            return String(
                                ((i > 0 || args.length > 1) ? '\n' : '')
                                + arg)
                                .replace(/\n/g, '\n' + `${' '.repeat(this.namespace.length + 3)}| `)
                    }
                })),
            (
                args.length > 1
                    ? '\n' + `${' '.repeat(this.namespace.length + 3)}|-------------------------------\x1b[0m`
                    : '\x1b[0m'
            )
        ]
    }


    log(...args) {
        if (!this.verbose)
            return;

        console.log(...this.compile('blue', ...args));
    }

    warning(...args) {
        if (!this.verbose)
            return;

        console.log(...this.compile('yellow', ...args));
    }

    error(...args) {
        if (this.ignoreErrors)
            return;

        return console.log(...this.compile('red', ...args));
    }


    protected log_A_SDK_Error(error: A_SDK_Error) {
        const time = this.getTime();

        console.log(`\x1b[31m[${this.namespace}] |${time}| ERROR ${error.code}
${' '.repeat(this.namespace.length + 3)}| ${error.message}
${' '.repeat(this.namespace.length + 3)}| ${error.description} 
${' '.repeat(this.namespace.length + 3)}|-------------------------------
${' '.repeat(this.namespace.length + 3)}| ${error.stack?.split('\n').map((line, index) => index === 0 ? line : `${' '.repeat(this.namespace.length + 3)}| ${line}`).join('\n') || 'No stack trace'}
${' '.repeat(this.namespace.length + 3)}|-------------------------------
\x1b[0m`
            + (error.originalError ? `\x1b[31m${' '.repeat(this.namespace.length + 3)}| Wrapped From  ${error.originalError.message}
${' '.repeat(this.namespace.length + 3)}|-------------------------------
${' '.repeat(this.namespace.length + 3)}| ${error.originalError.stack?.split('\n').map((line, index) => index === 0 ? line : `${' '.repeat(this.namespace.length + 3)}| ${line}`).join('\n') || 'No stack trace'}
${' '.repeat(this.namespace.length + 3)}|-------------------------------
\x1b[0m`: '')
            + (error.link ? `\x1b[31m${' '.repeat(this.namespace.length + 3)}| Read in docs: ${error.link}
${' '.repeat(this.namespace.length + 3)}|-------------------------------
\x1b[0m`: ''));

    }

    protected compile_A_SDK_Error(error: A_SDK_Error): string {
        const time = this.getTime();

        return '\n' +

            `${' '.repeat(this.namespace.length + 3)}|-------------------------------` +
            '\n' +
            `${' '.repeat(this.namespace.length + 3)}|  Error:  | ${error.code}
${' '.repeat(this.namespace.length + 3)}|-------------------------------
${' '.repeat(this.namespace.length + 3)}|${' '.repeat(10)}| ${error.message}
${' '.repeat(this.namespace.length + 3)}|${' '.repeat(10)}| ${error.description} 
${' '.repeat(this.namespace.length + 3)}|-------------------------------
${' '.repeat(this.namespace.length + 3)}| ${error.stack?.split('\n').map((line, index) => index === 0 ? line : `${' '.repeat(this.namespace.length + 3)}| ${line}`).join('\n') || 'No stack trace'}
${' '.repeat(this.namespace.length + 3)}|-------------------------------`
            +
            (error.originalError ? `${' '.repeat(this.namespace.length + 3)}| Wrapped From  ${error.originalError.message}
${' '.repeat(this.namespace.length + 3)}|-------------------------------
${' '.repeat(this.namespace.length + 3)}| ${error.originalError.stack?.split('\n').map((line, index) => index === 0 ? line : `${' '.repeat(this.namespace.length + 3)}| ${line}`).join('\n') || 'No stack trace'}
${' '.repeat(this.namespace.length + 3)}|-------------------------------` : '')
            +
            (error.link ? `${' '.repeat(this.namespace.length + 3)}| Read in docs: ${error.link}
${' '.repeat(this.namespace.length + 3)}|-------------------------------` : '');

    }


    protected compile_Error(error: Error): string {
        return JSON.stringify({
            name: error.name,
            message: error.message,
            stack: error.stack?.split('\n')
                .map((line, index) => index === 0 ? line : `${' '.repeat(this.namespace.length + 3)}| ${line}`)
                .join('\n')

        }, null, 2)
            .replace(/\n/g, '\n' + `${' '.repeat(this.namespace.length + 3)}| `)
            .replace(/\\n/g, '\n')
    }




    protected getTime() {
        const now = new Date();
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const milliseconds = String(now.getMilliseconds()).padStart(4, '0');
        return `${minutes}:${seconds}:${milliseconds}`;
    }
}