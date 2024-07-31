"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LibPolyfill = void 0;
class LibPolyfillClass {
    constructor() {
        this.moduleName = 'fs';
    }
    fs() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._fs) {
                yield this.init();
            }
            return this._fs;
        });
    }
    get env() {
        let testEnvironment = 'server';
        try {
            console.log('window', window.location);
            testEnvironment = window.location ? 'browser' : 'server';
        }
        catch (error) {
            console.log('All Environment Checks Failed error', error);
            testEnvironment = 'server';
        }
        console.log('env', testEnvironment);
        return testEnvironment;
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.env === 'server') {
                    this._fs = (yield Promise.resolve(`${this.moduleName}`).then(s => __importStar(require(s))));
                }
                else {
                    this._fs = {
                        readFileSync: (path, encoding) => '',
                        existsSync: (path) => false
                    };
                }
            }
            catch (error) {
                console.log('All FS Polyfill Checks Failed error', error);
                this._fs = {
                    readFileSync: (path, encoding) => '',
                    existsSync: (path) => false
                };
            }
        });
    }
}
exports.LibPolyfill = new LibPolyfillClass();
//# sourceMappingURL=Lib.polyfill.js.map