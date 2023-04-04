import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsRatePermissionService } from '@xc/core/services/products-rate-permission.service';
import { filter, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'xc-access-denied-page',
    templateUrl: './access-denied-page.component.html',
    styleUrls: ['./access-denied-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccessDeniedPageComponent implements OnInit, OnDestroy {

    private readonly subscriptions: Subscription[] = [];

    constructor(
        public readonly permissionService: ProductsRatePermissionService,
        private readonly router: Router,
        private readonly route: ActivatedRoute,
    ) {
    }

    ngOnInit(): void {
        this.initSubscriptions();
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }

    private redirect(): Promise<boolean> {
        const redirectUri = this.route.snapshot.queryParams['redirect_uri'];
        if (!redirectUri) {
            return this.router.navigate(['/products/manual'], { replaceUrl: true });
        }
        return this.router.navigate([redirectUri], { replaceUrl: true });
    }

    private initSubscriptions(): void {
        this.subscriptions.push(
            this.permissionService.allow$.pipe(filter(Boolean))
                .subscribe(() => this.redirect())
        );
    }
}
