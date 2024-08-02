import { A_SDK_Context } from "@adaas/a-sdk/global/A_SDK_Context.class"

(async () => {

    await A_SDK_Context.ready;

    A_SDK_Context.Logger.log('Test Log', {
        test: 'test',
        test2: 'test2',
        foo: {
            bar: 'bar',
            baz: {
                qux: 'qux'
            }
        }
    }, 'Maybe its a hige update');

    A_SDK_Context.Logger.error(new Error('Test Error'));

})()