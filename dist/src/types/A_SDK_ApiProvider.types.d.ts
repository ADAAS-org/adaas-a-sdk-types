export interface A_SDK_TYPES__IDefaultPagination<T> {
    items: T[];
    pagination: {
        page: number;
        pageSize: number;
        total: number;
        pages: number;
    };
}
