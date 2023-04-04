import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { canActivateIfProductExist } from '@xc/pages/product-manual-list-page/guards/product-exist.guard';
import { ProductsManualService } from '@xc/core/services/products-manual.service';
import { productItemsMock } from '@xc/test/mocks/product-list.mock';

@Component({
    template: ''
})
class TestComponent {
}

@Component({
    template: ''
})
class NotFoundTestComponent {
}

describe('canActivateIfProductExist', () => {
    let router: Router;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent, NotFoundTestComponent],
            imports: [
                RouterTestingModule.withRoutes([
                    { path: 'not-found', component: NotFoundTestComponent },
                    { path: ':id', component: TestComponent, canActivate: [canActivateIfProductExist] },
                    { path: '', pathMatch: 'full', redirectTo: '/not-found' }
                ])
            ],
            providers: [
                {
                    provide: ProductsManualService,
                    useValue: {
                        get: jest.fn((id) => id === 7
                            ? Promise.reject({ status: 0 })
                            : Promise.resolve(productItemsMock()[id - 1]))
                    }
                }
            ]
        });
        router = TestBed.inject(Router);
    });

    it('should redirect to not-found page when id parameter is not present', async () => {
        await router.navigate(['/']);
        expect(router.url).toBe('/not-found');
    });

    it('should redirect to not-found page when id parameter is not a number', async () => {
        await router.navigate(['/one']);
        expect(router.url).toBe('/not-found');
    });

    it('should redirect to not-found page when product does not exist for the id parameter', async () => {
        await router.navigate(['/3']);
        expect(router.url).toBe('/not-found');
    });

    it('should redirect to not-found page when failed to get the product for the id parameter', async () => {
        await router.navigate(['/7']);
        expect(router.url).toBe('/not-found');
    });

    it('should redirect to access-denied page when permission is disabled', async () => {
        await router.navigate(['/1']);
        expect(router.url).toBe('/1');
    });
});
