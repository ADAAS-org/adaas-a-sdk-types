import { A_SDK_CommonHelper } from '@adaas/a-sdk/helpers/Common.helper';
import { config } from 'dotenv';
config();
jest.retryTimes(0);

describe('CommonHelper Tests', () => {

    it('Schedule Should execute promise and await it ', async () => {

        const start = Date.now();
        let res = '';

        try {
            const scheduler = A_SDK_CommonHelper.schedule(3000, async () => {
                return 'RESOLVED';
            });


            res = await scheduler.promise;

        } catch (error) {
            // Handle error if any
        } finally {
            const end = Date.now();
            const duration = end - start;

            expect(res).toBe('RESOLVED');
            // Check if the duration exceeds 3 seconds
            expect(duration).toBeGreaterThan(3000);
        }

    });

    it('Schedule Should be canceled and rejected', async () => {

        const start = Date.now();
        let res = '';

        try {
            const scheduler = A_SDK_CommonHelper.schedule(3000, async () => {
                return 'RESOLVED';
            });


            scheduler.clear();
            res = await scheduler.promise;
        } catch (error) {
            // Handle error if any
        } finally {
            const end = Date.now();
            const duration = end - start;

            expect(res).toBe('');
            // Check if the duration exceeds 3 seconds
            expect(duration).toBeLessThan(3000);
        }

    });
});