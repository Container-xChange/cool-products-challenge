export interface Resource<TData> {
    isLoading: boolean;
    isLoaded: boolean;
    hasError: boolean;
    data: TData | null;
}

export const loadResource = <TData>(): Resource<TData> => ({
    isLoading: true,
    isLoaded: false,
    hasError: false,
    data: null
});

export const loadedResourceSuccess = <TData>(data: TData): Resource<TData> => ({
    isLoading: false,
    isLoaded: true,
    hasError: false,
    data
});

export const loadedResourceError = <TData>(): Resource<TData> => ({
    isLoading: false,
    isLoaded: true,
    hasError: true,
    data: null
});
