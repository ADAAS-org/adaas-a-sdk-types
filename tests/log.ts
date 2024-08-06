import { A_SDK_CONSTANTS__DEFAULT_ERRORS } from "@adaas/a-sdk/constants/errors.constants";
import { A_SDK_Context } from "@adaas/a-sdk/global/A_SDK_Context.class"
import { A_SDK_Error } from "@adaas/a-sdk/global/A_SDK_Error.class";
import rl from 'readline';


(async () => {

    await A_SDK_Context.ready;

    A_SDK_Context.configure({
        verbose: true
    })

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

    A_SDK_Context.Logger.error(new Error('Test Error'), new A_SDK_Error(A_SDK_CONSTANTS__DEFAULT_ERRORS.CONFIGURATION_PROPERTY_NOT_EXISTS_OR_NOT_ALLOWED_TO_READ));
    A_SDK_Context.Logger.error(new A_SDK_Error(A_SDK_CONSTANTS__DEFAULT_ERRORS.CONFIGURATION_PROPERTY_NOT_EXISTS_OR_NOT_ALLOWED_TO_READ));
    A_SDK_Context.Logger.log(new A_SDK_Error(A_SDK_CONSTANTS__DEFAULT_ERRORS.CONFIGURATION_PROPERTY_NOT_EXISTS_OR_NOT_ALLOWED_TO_READ));

    const rlInterface = rl.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const answer = await new Promise<string>(resolve => rlInterface
        .question(
            A_SDK_Context.Logger.compile('pink', 'What is your name?', '(1,2,3,4)').join(' ') + '\n' +
            A_SDK_Context.Logger.compile('pink', 'Answer (1,2,3,4)').join(' '),
            resolve));

    rl.moveCursor(process.stdout, 0, -1); // Move cursor to the beginning of the previous line
    rl.clearLine(process.stdout, 0); // Clear the current line

    const answer2 = await new Promise<string>(resolve => rlInterface
        .question(
            A_SDK_Context.Logger.compile('pink', 'Answer (1,2,3,4)').join(' '),
            resolve));

    rl.moveCursor(process.stdout, 0, -1); // Move cursor to the beginning of the previous line
    rl.clearLine(process.stdout, 0); // Clear the current line
    // console.log('Asnwer: ', answer);


})()