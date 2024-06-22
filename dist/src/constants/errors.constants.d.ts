export declare enum A_SDK_CONSTANTS__ERROR_CODES {
    UNEXPECTED_ERROR = "ERR-0001",
    METHOD_NOT_IMPLEMENTED = "ERR-0002",
    ROUTE_NOT_FOUND = "ERR-0003",
    TOKEN_NOT_PROVIDED = "ERR-0004",
    NOT_ALL_PARAMS_WAS_PROVIDED = "ERR-0005",
    CREDENTIALS_NOT_PROVIDED = "ERR-0006"
}
export declare const A_SDK_CONSTANTS__DEFAULT_ERRORS: {
    UNEXPECTED_ERROR: {
        serverCode: number;
        code: A_SDK_CONSTANTS__ERROR_CODES;
        description: string;
        message: string;
    };
    METHOD_NOT_IMPLEMENTED: {
        serverCode: number;
        code: A_SDK_CONSTANTS__ERROR_CODES;
        description: string;
        message: string;
    };
    ROUTE_NOT_FOUND: {
        serverCode: number;
        code: A_SDK_CONSTANTS__ERROR_CODES;
        description: string;
        message: string;
    };
    TOKEN_NOT_PROVIDED: {
        serverCode: number;
        code: A_SDK_CONSTANTS__ERROR_CODES;
        description: string;
        message: string;
    };
    NOT_ALL_PARAMS_WAS_PROVIDED: {
        serverCode: number;
        code: A_SDK_CONSTANTS__ERROR_CODES;
        description: string;
        message: string;
    };
    CREDENTIALS_NOT_PROVIDED: {
        code: A_SDK_CONSTANTS__ERROR_CODES;
        description: string;
        message: string;
    };
};
