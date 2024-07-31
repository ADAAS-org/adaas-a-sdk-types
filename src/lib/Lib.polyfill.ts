interface Ifspolyfill {
    readFileSync: (path: string, encoding: string) => string;
    existsSync: (path: string) => boolean;
}


class LibPolyfillClass {

    private _fs!: Ifspolyfill;

    // eslint-disable-next-line no-use-before-define
    private moduleName = 'fs'


    async fs() {
        if (!this._fs) {
            await this.init();
        }
        return this._fs;
    }


    get env(): 'server' | 'browser' {
        let testEnvironment: 'server' | 'browser' = 'browser';

        try {
            testEnvironment = window.location ? 'browser' : 'server';

        } catch (error) {

            testEnvironment = 'server';
        }

        return testEnvironment;
    }


    private async init() {
        try {
            if (this.env === 'server') {
                // eslint-disable-next-line no-use-before-define
                this._fs = await import('' + this.moduleName) as Ifspolyfill;
            }
            else {
                this._fs = {
                    readFileSync: (path: string, encoding: string) => '',
                    existsSync: (path: string) => false
                };
            }
        } catch (error) {

            this._fs = {
                readFileSync: (path: string, encoding: string) => '',
                existsSync: (path: string) => false
            };
        }

    }
}


export const LibPolyfill = new LibPolyfillClass();