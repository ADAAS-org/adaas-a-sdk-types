import { A_SDK_TYPES__ServerError } from '../types/A_SDK_ServerError.types';
import { AxiosError } from 'axios';
import { A_SDK_TYPES__Error } from '../types/A_SDK_Error.type';


export class A_SDK_Error extends Error {

    code!: string;
    description!: string;
    originalError?: Error | any



    constructor(
        params: A_SDK_TYPES__Error | Error | AxiosError  | any

    ) {
        super(params?.message || 'Oops... Something went wrong');
        this.identifyErrorType(params);
    }


    private identifyErrorType(error: Error | AxiosError | A_SDK_TYPES__Error ) {

        if ((error as A_SDK_TYPES__ServerError).code &&
            (error as A_SDK_TYPES__ServerError).description &&
            (error as A_SDK_TYPES__ServerError).serverCode) {

            const target = error as A_SDK_TYPES__ServerError;

            this.message = target.message;
            this.code = target.code;
            this.description = target.description;
            this.originalError = target.originalError;
        }
        else if (error instanceof Error) {
            this.message = error.message;
            this.code = 'ADAAS-DEFAULT-ERR-0000';
            this.description = 'If you see this error please let us know.';
            this.originalError = error;

        } else if (error instanceof AxiosError) {
            this.message = error.response?.data.message || error.message;
            this.code = error.response?.data.code || 'ADAAS-DEFAULT-ERR-0000';
            this.description = error.response?.data.description || 'If you see this error please let us know.';
            this.originalError = error.response;
        }
    }


    get compilingData(): A_SDK_TYPES__Error {
        return {
            message: this.message,
            code: this.code,
            description: this.description,
            originalError: this.originalError
        }
    }

    toJSON(): A_SDK_TYPES__Error {
        return this.compilingData;
    }
}


