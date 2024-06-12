import { AxiosError } from 'axios';
import { A_SDK_TYPES__Error } from '../types/A_SDK_Error.type';
export declare class A_SDK_Error extends Error {
    code: string;
    description: string;
    originalError?: Error | any;
    constructor(params: A_SDK_TYPES__Error | Error | AxiosError | any);
    private identifyErrorType;
    get compilingData(): A_SDK_TYPES__Error;
    toJSON(): A_SDK_TYPES__Error;
}
