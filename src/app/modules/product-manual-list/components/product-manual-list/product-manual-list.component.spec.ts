import { ComponentFixture, fakeAsync, flush, TestBed, waitForAsync } from '@angular/core/testing';

import { ProductManualListComponent } from './product-manual-list.component';
import { ProductsManualService } from '@xc/core/services/products-manual.service';
import { productItemsMock } from '@xc/test/mocks/product-list.mock';
import { ServiceMock, serviceMockInject } from '@xc/test/utils/service-mock.util';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ProductManualModalUiService } from '@xc/modules/product-manual-modal/services/product-manual-modal-ui.service';
import { debounceTime, EMPTY, first, of, Subject } from 'rxjs';
import { PortalModule } from '@xc/directives/portal/portal.module';
import { ProductItem } from '@xc/core/interfaces/product-item.interface';
import { ProductManualFormModel } from '@xc/core/interfaces/product-manual-form.interface';
import { productManualFormValueMock } from '@xc/test/mocks/product-manual-form.mock';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductsRatePermissionService } from '@xc/core/services/products-rate-permission.service';

describe('ProductManualListComponent', () => {
    let component: ProductManualListComponent;
    let fixture: ComponentFixture<ProductManualListComponent>;
    let productsManualService: ServiceMock<ProductsManualService>;
    let addModalSend$: Subject<ProductManualFormModel>;

    beforeEach(async () => {
        addModalSend$ = new Subject();
        await TestBed.configureTestingModule({
            declarations: [ProductManualListComponent],
            imports: [RouterTestingModule, PortalModule],
            providers: [
                {
                    provide: ProductManualModalUiService,
                    useValue: {
                        load: jest.fn(() => of({ send$: addModalSend$ }))
                    }
                },
                {
                    provide: ProductsManualService,
                    useValue: {
                        add: jest.fn(() => Promise.resolve()),
                        delete: jest.fn(() => Promise.resolve()),
                        getAll: jest.fn(() => Promise.resolve(productItemsMock())),
                    }
                },
                {
                    provide: ProductsRatePermissionService,
                    useValue: {
                        allow$: EMPTY,
                        update: jest.fn()
                    }
                }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ProductManualListComponent);
        component = fixture.componentInstance;
        productsManualService = serviceMockInject(ProductsManualService);
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('should fetch product manual resources on init', () => {
        fixture.detectChanges();
        expect(productsManualService.getAll).toHaveBeenCalled();
    });

    it('should be in a loading state while fetching the product manual resources', (done) => {
        productsManualService.getAll.mockReturnValue(new Promise(() => {
            // EMPTY
        }));
        fixture.detectChanges();
        component.productsResource$.pipe(first())
            .subscribe((productResources) => {
                expect(productResources).toEqual({
                    isLoading: true,
                    isLoaded: false,
                    hasError: false,
                    data: null
                });
                done();
            });
    });

    it('should be in an error state when failed to fetch the product manual resources', (done) => {
        productsManualService.getAll.mockReturnValue(Promise.reject({ status: 0 }));
        fixture.detectChanges();
        component.productsResource$.pipe(debounceTime(0), first())
            .subscribe((productResources) => {
                expect(productResources).toEqual({
                    isLoading: false,
                    isLoaded: true,
                    hasError: true,
                    data: null
                });
                done();
            });
    });

    it('should display product items when product manual resources are loaded with success', (done) => {
        productsManualService.getAll.mockReturnValue(Promise.resolve(productItemsMock()));
        fixture.detectChanges();
        component.productsResource$.pipe(debounceTime(200), first())
            .subscribe(() => {
                fixture.detectChanges();
                expect(fixture.nativeElement.querySelectorAll('xc-product-list-item').length).toBe(productItemsMock().length);
                done();
            });
    });

    it('should display a loader when product manual resources are loading', (done) => {
        productsManualService.getAll.mockReturnValue(new Promise(() => {
            // EMPTY
        }));
        fixture.detectChanges();
        component.productsResource$.pipe(debounceTime(100), first())
            .subscribe(() => {
                fixture.detectChanges();
                expect(document.querySelector('body > xc-page-loader')).toBeTruthy();
                expect(fixture.nativeElement.querySelectorAll('xc-product-list-item').length).toBe(0);
                done();
            });
    });

    it('should display an error when product manual resources failed to load', (done) => {
        productsManualService.getAll.mockReturnValue(Promise.reject({ status: 0 }));
        fixture.detectChanges();
        component.productsResource$.pipe(debounceTime(0), first())
            .subscribe(() => {
                fixture.detectChanges();
                expect(document.querySelector('body > xc-page-error')).toBeTruthy();
                expect(fixture.nativeElement.querySelectorAll('xc-product-list-item').length).toBe(0);
                done();
            });
    });

    it('should add manual product with valid id and product for the first time', fakeAsync(() => {
        let getAllPromiseResolve!: (products: ProductItem[]) => void;
        productsManualService.getAll.mockReturnValue(new Promise((resolve) => getAllPromiseResolve = resolve));
        fixture.detectChanges();
        component.addProduct();

        addModalSend$.next(productManualFormValueMock());
        getAllPromiseResolve([]);
        flush();
        expect(productsManualService.add).toHaveBeenCalledWith(productItemsMock()[0]);
    }));

    it('should add manual product with the next valid id', fakeAsync(() => {
        productsManualService.getAll.mockReturnValue(Promise.resolve(null as any));
        fixture.detectChanges();
        component.addProduct();

        addModalSend$.next(productManualFormValueMock());
        flush();
        expect(productsManualService.add).toHaveBeenCalledWith(productItemsMock()[0]);
    }));

    it('should add manual product with the next valid id', fakeAsync(() => {
        productsManualService.getAll.mockReturnValue(Promise.resolve(productItemsMock().slice(1)));
        fixture.detectChanges();
        component.addProduct();

        addModalSend$.next(productManualFormValueMock());
        flush();
        expect(productsManualService.add).toHaveBeenCalledWith({ ...productItemsMock()[0], id: 3 });
    }));

    it('should refresh the list after adding manual product with success', fakeAsync(() => {
        productsManualService.getAll.mockReturnValue(Promise.resolve([]));
        fixture.detectChanges();
        component.addProduct();

        expect(productsManualService.getAll).toHaveBeenCalledTimes(1);
        productsManualService.getAll.mockClear();

        addModalSend$.next(productManualFormValueMock());
        flush();
        expect(productsManualService.getAll).toHaveBeenCalledTimes(1);
    }));

    it('should not refresh the list after failing to add manual product', fakeAsync(() => {
        jest.spyOn(console, 'error').mockImplementation(() => {
            // Empty by design.
        });
        productsManualService.getAll.mockReturnValue(Promise.resolve([]));
        productsManualService.add.mockReturnValue(Promise.reject({ status: 0 }));
        fixture.detectChanges();
        component.addProduct();

        expect(productsManualService.getAll).toHaveBeenCalledTimes(1);
        productsManualService.getAll.mockClear();

        addModalSend$.next(productManualFormValueMock());
        flush();
        expect(productsManualService.getAll).toHaveBeenCalledTimes(0);
    }));

    it('should delete manual product by id', waitForAsync(async () => {
        productsManualService.getAll.mockReturnValue(Promise.resolve(productItemsMock()));
        fixture.detectChanges();
        component.deleteProduct(1);
        await fixture.whenStable();
        expect(productsManualService.delete).toHaveBeenCalledWith(1);
    }));

    it('should refresh the list after deleting manual product with success', waitForAsync(async () => {
        productsManualService.getAll.mockReturnValue(Promise.resolve([]));
        fixture.detectChanges();

        expect(productsManualService.getAll).toHaveBeenCalledTimes(1);
        productsManualService.getAll.mockClear();

        component.deleteProduct(0);
        await fixture.whenStable();
        expect(productsManualService.getAll).toHaveBeenCalledTimes(1);
    }));

    it('should not refresh the list after failing to delete manual product', waitForAsync(async () => {
        jest.spyOn(console, 'error').mockImplementation(() => {
            // Empty by design.
        });
        productsManualService.getAll.mockReturnValue(Promise.resolve([]));
        productsManualService.delete.mockReturnValue(Promise.reject({ status: 0 }));
        fixture.detectChanges();

        expect(productsManualService.getAll).toHaveBeenCalledTimes(1);
        productsManualService.getAll.mockClear();

        component.deleteProduct(0);
        await fixture.whenStable();
        expect(productsManualService.getAll).toHaveBeenCalledTimes(0);
    }));

});
