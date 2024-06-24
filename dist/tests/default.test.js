"use strict";
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
const Common_helper_1 = require("../src/helpers/Common.helper");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
jest.retryTimes(0);
describe('CommonHelper Tests', () => {
    it('Schedule Should execute promise and await it ', () => __awaiter(void 0, void 0, void 0, function* () {
        const start = Date.now();
        let res = '';
        try {
            const scheduler = Common_helper_1.A_SDK_CommonHelper.schedule(3000, () => __awaiter(void 0, void 0, void 0, function* () {
                console.log('RESOLVED');
                return 'RESOLVED';
            }));
            res = yield scheduler.promise;
        }
        catch (error) {
            // Handle error if any
        }
        finally {
            const end = Date.now();
            const duration = end - start;
            expect(res).toBe('RESOLVED');
            // Check if the duration exceeds 3 seconds
            expect(duration).toBeGreaterThan(3000);
        }
    }));
    it('Schedule Should be canceled and rejected', () => __awaiter(void 0, void 0, void 0, function* () {
        const start = Date.now();
        let res = '';
        try {
            const scheduler = Common_helper_1.A_SDK_CommonHelper.schedule(3000, () => __awaiter(void 0, void 0, void 0, function* () {
                console.log('RESOLVED');
                return 'RESOLVED';
            }));
            scheduler.clear();
            res = yield scheduler.promise;
        }
        catch (error) {
            console.log('ERR: ', error);
            // Handle error if any
        }
        finally {
            const end = Date.now();
            const duration = end - start;
            expect(res).toBe('');
            // Check if the duration exceeds 3 seconds
            expect(duration).toBeLessThan(3000);
        }
    }));
});
//# sourceMappingURL=default.test.js.map