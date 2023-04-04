import { TestBed } from '@angular/core/testing';

import { ProductsRatePermissionService } from './products-rate-permission.service';
import { first } from 'rxjs';

const STORAGE_KEY = 'xc-allow-rating';

describe('ProductsRatePermissionService', () => {
    let service: ProductsRatePermissionService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ProductsRatePermissionService);
    });

    afterEach(() => {
        sessionStorage.removeItem(STORAGE_KEY);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should load session value on init', (done) => {
        service.allow$.pipe(first())
            .subscribe({
                next: done,
                error: done.fail
            });
    });

    it('should set session item when updated to allow', () => {
        expect(sessionStorage.getItem(STORAGE_KEY)).toBeNull();
        service.update(true);
        expect(sessionStorage.getItem(STORAGE_KEY)).toBe('true');
    });

    it('should remove session item when updated to disallow', () => {
        sessionStorage.setItem(STORAGE_KEY, 'true');
        expect(sessionStorage.getItem(STORAGE_KEY)).toBe('true');
        service.update(false);
        expect(sessionStorage.getItem(STORAGE_KEY)).toBeNull();
    });

    it('should emit updated value', () => {
        service.update(true);
        service.allow$.pipe(first()).subscribe((value) => expect(value).toBe(true));
        service.update(false);
        service.allow$.pipe(first()).subscribe((value) => expect(value).toBe(false));
    });
});
