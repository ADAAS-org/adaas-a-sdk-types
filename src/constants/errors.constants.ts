
export enum A_SDK_CONSTANTS__ERROR_CODES {
    UNEXPECTED_ERROR = 'ERR-0001',
    METHOD_NOT_IMPLEMENTED = 'ERR-0002',
    ROUTE_NOT_FOUND = 'ERR-0003',
    TOKEN_NOT_PROVIDED = 'ERR-0004',
    NOT_ALL_PARAMS_WAS_PROVIDED = 'ERR-0005',
    CREDENTIALS_NOT_PROVIDED = 'ERR-0006',
};


export const A_SDK_CONSTANTS__DEFAULT_ERRORS = {
    UNEXPECTED_ERROR: {
        serverCode: 500,
        code: A_SDK_CONSTANTS__ERROR_CODES.UNEXPECTED_ERROR,
        description: 'If you see this error please let us know.',
        message: 'Oops... Something went wrong'
    },
    METHOD_NOT_IMPLEMENTED: {
        serverCode: 500,
        code: A_SDK_CONSTANTS__ERROR_CODES.METHOD_NOT_IMPLEMENTED,
        description: 'If you see this error please let us know.',
        message: 'Oops... Something went wrong'
    },
    ROUTE_NOT_FOUND: {
        serverCode: 404,
        code: A_SDK_CONSTANTS__ERROR_CODES.ROUTE_NOT_FOUND,
        description: 'We can not find the route you\'re looking for. Please make sure that you\'re using the correct path.',
        message: 'The target route is not found.'
    },
    TOKEN_NOT_PROVIDED: {
        serverCode: 401,
        code: A_SDK_CONSTANTS__ERROR_CODES.TOKEN_NOT_PROVIDED,
        description: 'The token is missed in the Authorization header. Please make sure that it\'s presented.',
        message: 'Token has not found in the authorization header.'
    },
    NOT_ALL_PARAMS_WAS_PROVIDED: {
        serverCode: 409,
        code: A_SDK_CONSTANTS__ERROR_CODES.NOT_ALL_PARAMS_WAS_PROVIDED,
        description: 'Not all required params provided in the request',
        message: 'Conflict in request'
    },
    CREDENTIALS_NOT_PROVIDED: {
        code: A_SDK_CONSTANTS__ERROR_CODES.CREDENTIALS_NOT_PROVIDED,
        description: 'The credentials are missed. Please make sure that they are presented.',
        message: 'Credentials has not found in the request.'
    },

}