import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListComponent } from './product-list.component';
import { ProductsService } from '@xc/core/services/products.service';
import { EMPTY, first, of, throwError } from 'rxjs';
import { productItemsMock } from '@xc/test/mocks/product-list.mock';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ServiceMock, serviceMockInject } from '@xc/test/utils/service-mock.util';
import { PortalModule } from '@xc/directives/portal/portal.module';

describe('ProductListComponent', () => {
    let component: ProductListComponent;
    let fixture: ComponentFixture<ProductListComponent>;
    let productsService: ServiceMock<ProductsService>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ProductListComponent],
            imports: [PortalModule],
            providers: [
                {
                    provide: ProductsService,
                    useValue: {
                        fetchProducts$: jest.fn(() => of(productItemsMock()))
                    }
                }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ProductListComponent);
        component = fixture.componentInstance;
        productsService = serviceMockInject(ProductsService);
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('should fetch product resources on init', () => {
        const prevCount = 10;
        const curCount = 20;
        component.count = curCount;
        fixture.detectChanges();
        component.ngOnChanges({
            count: {
                currentValue: curCount,
                previousValue: prevCount,
                firstChange: false,
                isFirstChange: () => false
            }
        });
        expect(productsService.fetchProducts$).toHaveBeenCalledWith(curCount);
    });

    it('should fetch product resources when count changes', () => {
        const prevCount = 10;
        component.count = prevCount;
        fixture.detectChanges();
        productsService.fetchProducts$.mockReset();

        const curCount = 20;
        component.count = curCount;
        component.ngOnChanges({
            count: {
                currentValue: curCount,
                previousValue: prevCount,
                firstChange: false,
                isFirstChange: () => false
            }
        });
        expect(productsService.fetchProducts$).toHaveBeenCalledWith(curCount);
    });

    it('should be in a loading state while fetching the product resources', (done) => {
        productsService.fetchProducts$.mockReturnValue(EMPTY);
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

    it('should be in an error state when failed to fetch the product resources', (done) => {
        productsService.fetchProducts$.mockReturnValue(throwError({ status: 0 }));
        fixture.detectChanges();
        component.productsResource$.pipe(first())
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

    it('should display product items when product resources are loaded with success', (done) => {
        productsService.fetchProducts$.mockReturnValue(of(productItemsMock()));
        fixture.detectChanges();
        component.productsResource$.pipe(first())
            .subscribe((productResources) => {
                expect(fixture.nativeElement.querySelectorAll('xc-product-list-item').length).toBe(productItemsMock().length);
                done();
            });
    });

    it('should display a loader when product resources are loading', (done) => {
        productsService.fetchProducts$.mockReturnValue(EMPTY);
        fixture.detectChanges();
        component.productsResource$.pipe(first())
            .subscribe((productResources) => {
                expect(document.querySelector('body > xc-page-loader')).toBeTruthy();
                expect(fixture.nativeElement.querySelectorAll('xc-product-list-item').length).toBe(0);
                done();
            });
    });

    it('should display an error when product resources failed to load', (done) => {
        productsService.fetchProducts$.mockReturnValue(throwError({ status: 0 }));
        fixture.detectChanges();
        component.productsResource$.pipe(first())
            .subscribe((productResources) => {
                expect(document.querySelector('body > xc-page-error')).toBeTruthy();
                expect(fixture.nativeElement.querySelectorAll('xc-product-list-item').length).toBe(0);
                done();
            });
    });
});
