interface Ifspolyfill {
    readFileSync: (path: string, encoding: string) => string;
    existsSync: (path: string) => boolean;
}


class LibPolyfillClass {

    private _fs!: Ifspolyfill;


    async fs() {
        if (!this._fs) {
            await this.init();
        }
        return this._fs;
    }


    private async init() {
        let testEnvironment = 'node';

        try {
            testEnvironment = !!window.location ? 'browser' : 'node';
        } catch (error) {
            console.log('Environment is NodeJS')
        }

        try {
            if (testEnvironment === 'node') {
                this._fs = await import('fs') as Ifspolyfill;
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