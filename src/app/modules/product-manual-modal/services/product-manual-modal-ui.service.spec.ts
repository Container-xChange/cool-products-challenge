import { TestBed } from '@angular/core/testing';

import { ProductManualModalUiService } from './product-manual-modal-ui.service';
import { Compiler, Injector } from '@angular/core';
import { first, of } from 'rxjs';

describe('ProductManualModalUiService', () => {
    let service: ProductManualModalUiService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ProductManualModalUiService,
                {
                    provide: Injector,
                    useValue: {}
                },
                {
                    provide: Compiler,
                    useValue: {
                        compileModuleAsync: jest.fn(() => Promise.resolve({
                            create: jest.fn(() => Promise.resolve({
                                injector: {
                                    get: jest.fn(() => ({
                                        open: jest.fn(() => of(true))
                                    }))
                                }
                            }))
                        }))
                    }
                }
            ]
        });
        service = TestBed.inject(ProductManualModalUiService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should implement all the steps to open a modal', () => {
        service.load().pipe(first())
            .subscribe((finished) => expect(finished).toBe(true));
    });
});
