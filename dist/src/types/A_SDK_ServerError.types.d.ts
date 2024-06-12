export type A_SDK_TYPES__ServerError = {
    message: string;
    code: string;
    description: string;
    serverCode: number;
    originalError?: Error | unknown;
};
