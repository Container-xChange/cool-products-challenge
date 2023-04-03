export type ServiceMock<T extends object> = {
    [key in keyof T]: T[key] extends (...args: any) => any ? jest.SpyInstance<ReturnType<T[key]>> : jest.SpyInstance<T[key]>
}
