import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductsRatePermissionService } from '@xc/core/services/products-rate-permission.service';
import { ReplaySubject, Subject } from 'rxjs';
import { canActivateIfHasPermission } from '@xc/pages/product-manual-list-page/guards/product-rate-permission.guard';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
    template: ''
})
class TestComponent {
}
@Component({
    template: ''
})
class AccessDeniedTestComponent {
}

describe('canActivateIfHasPermission', () => {
    let router: Router;
    let allow$: Subject<boolean>;

    beforeEach(() => {
        allow$ = new ReplaySubject();
        TestBed.configureTestingModule({
            declarations: [TestComponent, AccessDeniedTestComponent],
            imports: [
                RouterTestingModule.withRoutes([
                    { path: '', pathMatch: 'full', component: TestComponent, canActivate: [canActivateIfHasPermission] },
                    { path: 'access-denied', component: AccessDeniedTestComponent }
                ])
            ],
            providers: [
                {
                    provide: ProductsRatePermissionService,
                    useValue: { allow$ }
                }
            ]
        });
        router = TestBed.inject(Router);
    });

    it('should be allow activation when permission is enabled', async () => {
        allow$.next(true);
        await router.navigate(['/']);
        expect(router.url).toBe('/');
    });

    it('should redirect to access-denied page when permission is disabled', async () => {
        allow$.next(false);
        await router.navigate(['/']);
        expect(router.url).toBe('/access-denied?redirect_uri=%2F');
    });
});
