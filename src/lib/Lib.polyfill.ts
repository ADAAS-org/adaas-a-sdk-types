interface Ifspolyfill {
    readFileSync: (path: string, encoding: string) => string;
    existsSync: (path: string) => boolean;
}


class LibPolyfillClass {

    private _fs!: Ifspolyfill;

    private moduleName = 'fs'


    async fs() {
        if (!this._fs) {
            await this.init();
        }
        return this._fs;
    }


    get env(): 'server' | 'browser' {
        let testEnvironment: 'server' | 'browser' = 'server';

        try {
            console.log('window', window.location);

            testEnvironment = window.location ? 'browser' : 'server';

        } catch (error) {

            console.log('All Environment Checks Failed error', error);

            testEnvironment = 'server';
        }


        console.log('env', testEnvironment);

        return testEnvironment;
    }


    private async init() {
        try {
            if (this.env === 'server') {
                this._fs = await import(this.moduleName) as Ifspolyfill;
            }
            else {
                this._fs = {
                    readFileSync: (path: string, encoding: string) => '',
                    existsSync: (path: string) => false
                };
            }
        } catch (error) {

            console.log('All FS Polyfill Checks Failed error', error);

            this._fs = {
                readFileSync: (path: string, encoding: string) => '',
                existsSync: (path: string) => false
            };
        }

    }
}


export const LibPolyfill = new LibPolyfillClass();