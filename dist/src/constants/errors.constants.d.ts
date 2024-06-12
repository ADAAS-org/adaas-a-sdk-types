export declare enum A_SDK_CONSTANTS__ERROR_CODES {
    UNEXPECTED_ERROR = "DEFAULT-ERR-0001",
    METHOD_NOT_IMPLEMENTED = "DEFAULT-ERR-0002",
    ROUTE_NOT_FOUND = "DEFAULT-ERR-0003",
    TOKEN_NOT_PROVIDED = "DEFAULT-ERR-0004",
    NOT_ALL_PARAMS_WAS_PROVIDED = "DEFAULT-ERR-0005"
}
export declare const A_SDK_CONSTANTS__DEFAULT_ERRORS: {
    UNEXPECTED_ERROR: {
        serverCode: number;
        code: string;
        description: string;
        message: string;
    };
    METHOD_NOT_IMPLEMENTED: {
        serverCode: number;
        code: string;
        description: string;
        message: string;
    };
    ROUTE_NOT_FOUND: {
        serverCode: number;
        code: string;
        description: string;
        message: string;
    };
    TOKEN_NOT_PROVIDED: {
        serverCode: number;
        code: string;
        description: string;
        message: string;
    };
    NOT_ALL_PARAMS_WAS_PROVIDED: {
        serverCode: number;
        name: string;
        code: string;
        description: string;
        message: string;
    };
};
