import { A_SDK_CONSTANTS__ERROR_CODES } from '@adaas/a-sdk/constants/errors.constants';
import { A_SDK_ContextClass } from '@adaas/a-sdk/global/A_SDK_Context.class';
import { A_SDK_Error } from '@adaas/a-sdk/global/A_SDK_Error.class';
import { config } from 'dotenv';
config();
jest.retryTimes(0);

describe('Context Tests', () => {

    it('Should load default context ', async () => {
        const testContext = new A_SDK_ContextClass({
            namespace: 'test',
        });

        await testContext.ready;
    });


    it('Should log data ', async () => {
        const testContext = new A_SDK_ContextClass({
            namespace: 'test',
        });

        await testContext.ready;

        testContext.Logger.log('Test Log');
    });

    it('Should throw Error ', async () => {

        const namespace = 'test-namespace';
        const testContext = new A_SDK_ContextClass({
            namespace,
        });

        await testContext.ready;

        try {
            testContext.Errors.throw(A_SDK_CONSTANTS__ERROR_CODES.METHOD_NOT_IMPLEMENTED);
        } catch (error) {
            testContext.Logger.error(error);

            expect(error).toBeDefined();
            expect(error).toBeInstanceOf(A_SDK_Error);
            expect((error as A_SDK_Error).code).toBe(
                `${namespace}@error:${A_SDK_CONSTANTS__ERROR_CODES.METHOD_NOT_IMPLEMENTED}`
            );
        }
    });

    it('Should log original error ', async () => {

        const namespace = 'test-error-namespace';
        const testContext = new A_SDK_ContextClass({
            namespace,
        });

        await testContext.ready;
        try {
            try {
                throw new Error('Test Error');
            } catch (error) {
                throw testContext.Errors.wrap(error);
            }
        } catch (error) {
            testContext.Logger.error(error);


            expect(error).toBeDefined();
            expect(error).toBeInstanceOf(A_SDK_Error);
        }
    });

});