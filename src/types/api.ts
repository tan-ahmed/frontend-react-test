export type ErrorResponse = {
    data: {
        message: string;
    };
};

export type ApiResponse<T> = {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: T[];
};
