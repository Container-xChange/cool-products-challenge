import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { ProductsManualService } from '@xc/core/services/products-manual.service';

export const canActivateIfProductExist: CanActivateFn = (route: ActivatedRouteSnapshot) => {
    const productsManualService = inject(ProductsManualService);
    const router = inject(Router);
    const id = route.params['id'];

    if (!id || Number.isNaN(+id)) {
        return router.createUrlTree(['/not-found']);
    }

    return productsManualService.get(+id)
        .catch(() => null)
        .then((product) => product ? true : router.createUrlTree(['/not-found']));
};

