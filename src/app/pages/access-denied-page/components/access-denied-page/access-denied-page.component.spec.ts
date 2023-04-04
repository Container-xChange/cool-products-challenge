import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AccessDeniedPageComponent } from './access-denied-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ReplaySubject, Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsRatePermissionService } from '@xc/core/services/products-rate-permission.service';

describe('AccessDeniedPageComponent', () => {
    let component: AccessDeniedPageComponent;
    let fixture: ComponentFixture<AccessDeniedPageComponent>;
    let router: Router;

    let allow$: Subject<boolean> = new ReplaySubject();
    let queryParams: { redirect_uri: string | null };

    beforeEach(async () => {
        queryParams = { redirect_uri: '/test' };
        await TestBed.configureTestingModule({
            declarations: [AccessDeniedPageComponent],
            imports: [
                RouterTestingModule.withRoutes([
                    { path: 'test', component: AccessDeniedPageComponent },
                    { path: '', component: AccessDeniedPageComponent }
                ])
            ],
            providers: [
                {
                    provide: ProductsRatePermissionService,
                    useValue: {
                        allow$,
                        update: jest.fn((allow) => allow$.next(allow))
                    }
                },
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: {
                            queryParams
                        }
                    }
                },
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(AccessDeniedPageComponent);
        component = fixture.componentInstance;
        router = TestBed.inject(Router);
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('should redirect on init when the permission is enabled', waitForAsync(async () => {
        allow$.next(true);
        const spy = jest.spyOn(router, 'navigate').mockReturnThis();
        fixture.detectChanges();
        await fixture.whenStable();
        expect(spy).toHaveBeenCalledWith(['/test'], { replaceUrl: true });
    }));

    it('should redirect to the provided uri when the enable button is clicked', waitForAsync(async () => {
        allow$.next(false);
        const spy = jest.spyOn(router, 'navigate').mockReturnThis();
        fixture.detectChanges();
        await fixture.whenStable();
        fixture.nativeElement.querySelector('button').click();
        await fixture.whenStable();
        expect(spy).toHaveBeenCalledWith(['/test'], { replaceUrl: true });
    }));

    it('should redirect the products manual list when the enable button is clicked and no uri is provided', waitForAsync(async () => {
        allow$.next(false);
        queryParams.redirect_uri = null;
        const spy = jest.spyOn(router, 'navigate').mockReturnThis();
        fixture.detectChanges();
        await fixture.whenStable();
        fixture.nativeElement.querySelector('button').click();
        await fixture.whenStable();
        expect(spy).toHaveBeenCalledWith(['/products/manual'], { replaceUrl: true });
    }));
});
