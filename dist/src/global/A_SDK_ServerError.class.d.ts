import { A_SDK_TYPES__ServerError } from '../types/A_SDK_ServerError.types';
import { AxiosError } from 'axios';
import { A_SDK_Error } from './A_SDK_Error.class';
export declare class A_SDK_ServerError extends A_SDK_Error {
    code: string;
    description: string;
    serverCode: number;
    originalError: Error | any;
    constructor(params: A_SDK_TYPES__ServerError | Error | AxiosError | any);
    protected identifyErrorType(error: Error | AxiosError | A_SDK_TYPES__ServerError): void;
    get compilingData(): A_SDK_TYPES__ServerError;
    toJSON(): A_SDK_TYPES__ServerError;
}
