import { A_SDK_TYPES__ServerError } from '../types/A_SDK_ServerError.types';
import { AxiosError } from 'axios';
export declare class A_SDK_ServerError extends Error {
    code: string;
    description: string;
    serverCode: number;
    originalError: Error | any;
    constructor(params: A_SDK_TYPES__ServerError | Error | AxiosError | any);
    private identifyErrorType;
    get compilingData(): A_SDK_TYPES__ServerError;
    toJSON(): A_SDK_TYPES__ServerError;
}
