export type A_SDK_TYPES__Error = {
    message: string;
    code: string;
    description: string;
    link?: string;
    serverCode?: number;
    originalError?: Error | unknown;
};
