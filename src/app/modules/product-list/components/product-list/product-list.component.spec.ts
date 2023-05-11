import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';

import { ProductListComponent } from './product-list.component';
import { ProductsService } from '@xc/core/services/products.service';
import { EMPTY, of, throwError } from 'rxjs';
import { productItemsMock } from '@xc/test/mocks/product-list.mock';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ServiceMock, serviceMockInject } from '@xc/test/utils/service-mock.util';
import { PortalModule } from '@xc/directives/portal/portal.module';

@Component({
    template: `<xc-product-list [count]="count"></xc-product-list>`
})
class ProductListTestComponent {
    count!: number;
}

describe('ProductListComponent', () => {
    let component: ProductListTestComponent;
    let fixture: ComponentFixture<ProductListTestComponent>;
    let productsService: ServiceMock<ProductsService>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ProductListTestComponent, ProductListComponent],
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

        fixture = TestBed.createComponent(ProductListTestComponent);
        component = fixture.componentInstance;
        productsService = serviceMockInject(ProductsService);

        productsService.fetchProducts$.mockReturnValue(EMPTY);
    });

    afterEach(() => {
        productsService.fetchProducts$.mockClear();
    })

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('should fetch product resources on init', () => {
        const curCount = 20;
        component.count = curCount;
        fixture.detectChanges();
        expect(productsService.fetchProducts$).toHaveBeenCalledWith(curCount);
    });

    it('should fetch product resources when count changes', () => {
        component.count = 10;
        fixture.detectChanges();
        productsService.fetchProducts$.mockReset();

        const curCount = 20;
        component.count = curCount;
        fixture.detectChanges();
        expect(productsService.fetchProducts$).toHaveBeenCalledWith(curCount);
    });

    it('should be in a loading state while fetching the product resources', fakeAsync( () => {
        fixture.detectChanges();
        flush();
        expect(document.querySelector('xc-page-loader')).toBeTruthy();
        expect(document.querySelector('xc-page-error')).toBeFalsy();
        expect(fixture.nativeElement.querySelectorAll('xc-product-list-item').length).toBe(0);
    }));

    it('should be in an error state when failed to fetch the product resources', fakeAsync(() => {
        productsService.fetchProducts$.mockReturnValue(throwError({ status: 0 }));
        fixture.detectChanges();
        flush();
        expect(document.querySelector('xc-page-error')).toBeTruthy();
        expect(document.querySelector('xc-page-loader')).toBeFalsy();
        expect(fixture.nativeElement.querySelectorAll('xc-product-list-item').length).toBe(0);
    }));

    it('should display product items when product resources are loaded with success', fakeAsync(() => {
        productsService.fetchProducts$.mockReturnValue(of(productItemsMock()));
        fixture.detectChanges();
        flush();
        expect(document.querySelector('xc-page-loader')).toBeFalsy();
        expect(document.querySelector('xc-page-error')).toBeFalsy();
        expect(fixture.nativeElement.querySelectorAll('xc-product-list-item').length).toBe(productItemsMock().length);
    }));
});
