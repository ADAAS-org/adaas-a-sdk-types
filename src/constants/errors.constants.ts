
export enum A_SDK_CONSTANTS__ERROR_CODES {
    UNEXPECTED_ERROR = 'ERR-0001',
    METHOD_NOT_IMPLEMENTED = 'ERR-0002',
    ROUTE_NOT_FOUND = 'ERR-0003',
    TOKEN_NOT_PROVIDED = 'ERR-0004',
    NOT_ALL_PARAMS_WAS_PROVIDED = 'ERR-0005',
};


export const A_SDK_CONSTANTS__DEFAULT_ERRORS = {
    UNEXPECTED_ERROR: {
        serverCode: 500,
        code: 'ERR-0001',
        description: 'If you see this error please let us know.',
        message: 'Oops... Something went wrong'
    },
    METHOD_NOT_IMPLEMENTED: {
        serverCode: 500,
        code: 'ERR-0002',
        description: 'If you see this error please let us know.',
        message: 'Oops... Something went wrong'
    },
    ROUTE_NOT_FOUND: {
        serverCode: 404,
        code: 'ERR-0003',
        description: 'We can not find the route you\'re looking for. Please make sure that you\'re using the correct path.',
        message: 'The target route is not found.'
    },
    TOKEN_NOT_PROVIDED: {
        serverCode: 401,
        code: 'ERR-0004',
        description: 'The token is missed in the Authorization header. Please make sure that it\'s presented.',
        message: 'Token has not found in the authorization header.'
    },
    NOT_ALL_PARAMS_WAS_PROVIDED: {
        serverCode: 409,
        code: 'ERR-0005',
        description: 'Not all required params provided in the request',
        message: 'Conflict in request'
    },
}