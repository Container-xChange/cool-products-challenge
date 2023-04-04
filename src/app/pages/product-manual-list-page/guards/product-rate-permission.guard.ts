import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsRatePermissionService } from '@xc/core/services/products-rate-permission.service';
import { map } from 'rxjs';

export const canActivateIfHasPermission = () => {
    const permissionService = inject(ProductsRatePermissionService);
    const router = inject(Router);
    return permissionService.allow$.pipe(
        map((allow) => allow || router.createUrlTree(['/access-denied'],
            { queryParams: { 'redirect_uri': location.pathname } }))
    );
};

