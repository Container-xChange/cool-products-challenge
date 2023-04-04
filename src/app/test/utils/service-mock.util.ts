import { ProviderToken } from '@angular/core';
import { TestBed } from '@angular/core/testing';

export type ServiceMock<T extends object> = {
    [key in keyof T]: T[key] extends (...args: any) => any ? jest.SpyInstance<ReturnType<T[key]>> : jest.SpyInstance<T[key]>
}

export const serviceMockInject = <T extends object>(token: ProviderToken<T>): ServiceMock<T> => {
    return TestBed.inject(token) as unknown as ServiceMock<T>;
}
