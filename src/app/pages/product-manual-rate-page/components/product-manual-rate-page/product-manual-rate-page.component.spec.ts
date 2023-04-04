import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProductManualRatePageComponent } from './product-manual-rate-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductsManualService } from '@xc/core/services/products-manual.service';
import { productItemsMock } from '@xc/test/mocks/product-list.mock';
import { ServiceMock, serviceMockInject } from '@xc/test/utils/service-mock.util';

class RouteMock {
    params: BehaviorSubject<Params> = new BehaviorSubject({});

    get snapshot() {
        return { params: this.params.value };
    }
}

describe('ProductManualRatePageComponent', () => {
    let component: ProductManualRatePageComponent;
    let fixture: ComponentFixture<ProductManualRatePageComponent>;
    let productsManualService: ServiceMock<ProductsManualService>;
    let route: RouteMock;

    beforeEach(async () => {
        route = new RouteMock();
        await TestBed.configureTestingModule({
            declarations: [ProductManualRatePageComponent],
            imports: [RouterTestingModule],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: route
                },
                {
                    provide: ProductsManualService,
                    useValue: {
                        get: jest.fn(() => Promise.resolve(productItemsMock()[0])),
                        update: jest.fn(() => Promise.resolve())
                    }
                }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ProductManualRatePageComponent);
        component = fixture.componentInstance;
        productsManualService = serviceMockInject(ProductsManualService);
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('should get the product details with the id received on route params', () => {
        route.params.next({ id: '1' });
        fixture.detectChanges();
        expect(productsManualService.get).toHaveBeenCalledWith(1);
    });

    it('should refresh the table after submitting the rate', waitForAsync(async () => {
        route.params.next({ id: '1' });

        fixture.detectChanges();
        await fixture.whenStable();

        expect(productsManualService.get).toHaveBeenCalledWith(1);
        expect(productsManualService.get).toHaveBeenCalledTimes(1);
        productsManualService.get.mockClear();

        component.update(productItemsMock()[0]);

        await fixture.whenStable();
        expect(productsManualService.get).toHaveBeenCalledWith(1);
        expect(productsManualService.get).toHaveBeenCalledTimes(1);
    }));

    it('should not submit the table after failing to submit the rate', waitForAsync(async () => {
        jest.spyOn(console, 'error').mockImplementation(() => {
            // Empty by design.
        });
        productsManualService.update.mockRejectedValue({ status: 0 });

        route.params.next({ id: '1' });

        fixture.detectChanges();
        await fixture.whenStable();

        expect(productsManualService.get).toHaveBeenCalledTimes(1);
        productsManualService.get.mockClear();

        component.update(productItemsMock()[0]);

        await fixture.whenStable();
        expect(productsManualService.get).toHaveBeenCalledTimes(0);
    }));
});
